const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getPosts(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })

  // get total number of categories
  const totalCount = await getTotalCategories(gatsbyUtilities)
  
  // Query our pages from the GraphQL server
  const pages = await getPages(gatsbyUtilities)

  // If there are no pages in WordPress, don't do anything
  if (!pages.length) {
    return
  }

  // If there are pages, create pages for them
  await createIndividualPages({ pages, totalCount, gatsbyUtilities })

  // Query our categories from the GraphQL server
  const categories = await getCategory(gatsbyUtilities)

  // If there are no category in WordPress, don't do anything
  if (!categories.length) {
    return
  }

  // If there are category, create category for them
  await createIndividualCategory({ categories, totalCount, gatsbyUtilities })

  // // And a paginated archive
  // await createBlogPostArchive({ posts, gatsbyUtilities })
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`src/templates/blog-post.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )


/**
 * This function creates all the individual pages in this site
 */
 const createIndividualPages = async ({ pages, totalCount, gatsbyUtilities }) =>
 Promise.all(
   pages.map(({ page }) =>
     // createPage is an action passed to createPages
     // See https://www.gatsbyjs.com/docs/actions#createPage for more info
     gatsbyUtilities.actions.createPage({
       // Use the WordPress uri as the Gatsby page path
       // This is a good idea so that internal links and menus work 👍
       path: page.uri,

       // use the page template as the page component
       component: page.pageTemplate === 'home' ? path.resolve(`src/templates/home.js`) : path.resolve(`src/templates/page.js`),

       // `context` is available in the template as a prop and
       // as a variable in GraphQL.
       context: {
         // we need to add the page id here
         // so our page template knows which page
         // the current page is (when you open it in a browser)
         id: page.id,
         catTotalCount: Math.floor(Math.random() * (totalCount - 1) + 1)
       },
     })
   )
 )


 /**
 * This function creates all the individual categories in this site
 */
const createIndividualCategory = async ({ categories, totalCount, gatsbyUtilities }) =>
Promise.all(
  categories.map(({ category }) =>
    // createPage is an action passed to create categories
    // See https://www.gatsbyjs.com/docs/actions#createPage for more info
    gatsbyUtilities.actions.createPage({
      // Use the WordPress uri as the Gatsby page path
      // This is a good idea so that internal links and menus work 👍
      path: category.uri,

      // use the category template as the category component
      component: path.resolve(`src/templates/category.js`),

      // `context` is available in the template as a prop and
      // as a variable in GraphQL.
      context: {
        // we need to add the category id here
        // so our category template knows which category
        // the current category is (when you open it in a browser)
        id: category.id,
        catTotalCount: Math.floor(Math.random() * (totalCount - 1) + 1)
      },
    })
  )
)



// get total categories

async function getTotalCategories({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpCatCount {
      allWpCategory(filter: {name: {ne: "Uncategorized"}}) {
        totalCount
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpCategory.totalCount
}

  /**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

// get pages
async function getPages({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPages {
      # Query all WordPress blog posts sorted by date
      allWpPage(sort: { fields: [date], order: DESC }) {
        edges {
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          page: node {
            id
            uri
            pageTemplate
          }

        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPage.edges
}

// get categories
async function getCategory({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpCategory {
      # Query all WordPress blog posts sorted by date
      allWpCategory(filter: {name: {ne: "Uncategorized"}}) {
        edges {
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          category: node {
            id
            uri
          }

        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpCategory.edges
}

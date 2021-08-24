const path = require(`path`)
const chunk = require(`lodash/chunk`)

// dot env file to load custom config
if (process.env.STAGING) {
  require("dotenv").config({
    path: `.env.staging`,
  })
} else {
  require("dotenv").config({
    path: `.env`,
  })
}

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

}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ post }) => {
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info

      const categoryArr = []
      const ArrObject =  post.categories.nodes
      ArrObject.map((categoryData) => {
        categoryArr.push(categoryData.id)
      })

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

          baseUrl: process.env.BASE_URL,

          categoryArr: categoryArr

        },
      })
    })
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
       component: page.pageTemplate === 'home' ? path.resolve(`src/templates/home.js`) : page.pageTemplate === 'search' ? path.resolve(`src/templates/search.js`) : path.resolve(`src/templates/page.js`),

       // `context` is available in the template as a prop and
       // as a variable in GraphQL.
       context: {
         // we need to add the page id here
         // so our page template knows which page
         // the current page is (when you open it in a browser)
         id: page.id,

         baseUrl: process.env.BASE_URL,

         apolloUri: process.env.WPGRAPHQL_URL,
         
         catTotalCount: Math.floor(Math.random() * (totalCount - 1) + 1)
       },
     })
   )
 )

// create individual category pagination pages
async function createIndividualCategory({ categories, totalCount, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  categories.map(({ category }) => {
    
    const posts = category.posts.post
    // If there are no posts in WordPress, don't do anything
    if (!posts.length) {
      return
    }

    const postsChunkedCategoryPages = chunk(posts, postsPerPage)
    const totalPages = postsChunkedCategoryPages.length 

    return Promise.all(
      postsChunkedCategoryPages.map(async (_posts, index) => {
        const pageNumber = index + 1
  
        function getPagePath(page , url){
          const pageUrl = url + page
          if (page > 0 && page <= totalPages) {
            // Since our homepage is our blog page
            // we want the first page to be "/" and any additional pages
            // to be numbered.
            // "/category/2" for example
            return page === 1 ? `${url}` : `${pageUrl}`
          }
  
          return null
        }
  
        // createPage is an action passed to createPages
        // See https://www.gatsbyjs.com/docs/actions#createPage for more info
        await gatsbyUtilities.actions.createPage({
          path: getPagePath(pageNumber, category.uri),
  
          // use the category template as the category component
          component: path.resolve(`src/templates/category.js`),
  
          // `context` is available in the template as a prop and
          // as a variable in GraphQL.
          context: {
            // the index of our loop is the offset of which posts we want to display
            // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
            // etc
            offset: index * postsPerPage,
  
            // We need to tell the template how many posts to display too
            postsPerPage,
  
            id: category.id,
            name: category.name,
            catTotalCount: Math.floor(Math.random() * (totalCount - 1) + 1),
            
            baseUrl: process.env.BASE_URL,

            pageNumber,
            totalPages,
            
            // page path url 
            nextPagePath: getPagePath(pageNumber + 1, category.uri),
            previousPagePath: getPagePath(pageNumber - 1, category.uri),
          },
        })
      })
    )
  })
}


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

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
            categories {
              nodes {
                id
              }
            }
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
          category: node {
            id
            name
            uri
            count
            posts {
              post: nodes {
                id
                uri
              }
            }
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

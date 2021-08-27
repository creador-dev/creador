import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/global/seo"

// import breadcrumbs
import BreadCrumbs from "@components/global/breadcrumbs"

// import single post card
import SingleCard from "@components/page-components/single-card"

// import disciover topics
import DiscoverTopics from "@components/page-components/discover-topics"

// import mailchimp form
import SubscribeForm from "@components/global/subscribe-form"

// import arrow 
import Arrow from "@components/icons/arrow"

// scss file
import "@sass/pages/listing-page.scss"

const CategoryTemplate = ({ 
  data: { post, wpCategory, fetchCategory }, 
  pageContext: { nextPagePath, previousPagePath,  pageNumber, totalPages, baseUrl, name }
}) => {
  
  // Array of all articles
  const allPosts = post.nodes

  // Array of all categories
  const categories = wpCategory.nodes

  // category name
  const categoryname = name

  const seoImage = null

  return( 
    <Layout >
      <Seo 
        image={seoImage}
        seo={fetchCategory.seo}
        url={fetchCategory.uri}
        baseUrl={baseUrl}
      />
      <BreadCrumbs
        list={fetchCategory.seo.breadcrumbs}
      />
      <section className="category-page">
        <div className="container">
          <h2>{categoryname}</h2>
        </div>
        <div className="container grid-container home-grid">
          <div className="grid-post-items">
            <div>
              {allPosts.map((article) => (
                <SingleCard 
                  key={article.id}
                  title={article.title} 
                  publishDate={article.date} 
                  excerpt={article.excerpt} 
                  featureImage={article.featuredImage}
                  readingTime={article.readingTime}
                  linkUrl={article.link}
                  shareUrl={baseUrl+article.link} 
                  categories={article.categories.nodes}
                  baseUrl={baseUrl}
                ></SingleCard>
              ))}

              {/* pagination */}
              {totalPages > 1 ? 
                <div className="pagination-wrapper">
                  <Link className={previousPagePath ? "hoverable previous-arrow arrow":"previous-arrow arrow disabled" } to={previousPagePath} alt="previous"><Arrow></Arrow></Link>
                  <span className="pagination-number">Page {pageNumber +' of '+ totalPages} </span>
                  <Link className={nextPagePath ? "hoverable next-arrow arrow":"next-arrow arrow disabled" } to={nextPagePath} alt="next"><Arrow></Arrow></Link>
                </div> 
                : ''
              }    

            </div>
          </div>
          <div className="grid-sidebar">
            {/* discover topics component */}
            {categories.length ? 
              <DiscoverTopics categories={categories}></DiscoverTopics> : ''
            }
            {/* mailchimp subscribe form */}
            <SubscribeForm></SubscribeForm>
          </div>
        </div>
      </section>
    </Layout>
  )
}
export default CategoryTemplate

export const pageQuery = graphql`query WordPressCategoryListing($catTotalCount: Int! = 0, $id: String!, $offset: Int!, $postsPerPage: Int!) {
  wpCategory: allWpCategory(
    limit: 10
    filter: {name: {ne: "Uncategorized"}, count: {gt: 0}}
    skip: $catTotalCount
  ) {
    nodes {
      id
      name
      link
    }
  }
  fetchCategory: wpCategory(id: {eq: $id}) {
    uri
    seo {
      title
      metaDesc
      opengraphAuthor
      opengraphSiteName
      opengraphType
      breadcrumbs {
        text
        url
      }
    }
  }
  post: allWpPost(
    sort: {fields: [date], order: DESC}
    filter: {categories: {nodes: {elemMatch: {id: {eq: $id}}}}}
    limit: $postsPerPage
    skip: $offset
  ) {
    totalCount
    nodes {
      id
      link
      date(formatString: "MMMM DD YYYY")
      title
      excerpt
      readingTime
      categories {
        nodes {
          name
          link
        }
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 400,
                quality: 90,
                placeholder: BLURRED,
                layout: CONSTRAINED,
              )
            }
          }
        }
      }
    }
  }
}
`
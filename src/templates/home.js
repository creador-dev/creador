import React from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/global/seo"

// import single post card
import SingleCard from "@components/page-components/single-card"

// import disciover topics
import DiscoverTopics from "@components/page-components/discover-topics"

// import mailchimp form
import SubscribeForm from "@components/global/subscribe-form"

// scss file
import "@sass/pages/listing-page.scss"

const HomeTemplate = ({ 
  data: { post, wpCategory, page }, 
  pageContext: { baseUrl }  
}) => {
  
  // Array of all articles
  const allPosts = post.nodes

  // Array of all categories
  const categories = wpCategory.nodes

  const featuredImage = {
    fluid: page.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: page.featuredImage?.node?.alt || ``,
  }

  const seoImage = featuredImage.fluid ?  featuredImage.fluid?.images?.fallback?.src : null
  return( 
    <Layout >
      <Seo 
        image={seoImage}
        seo={page.seo}
        url={page.uri}
        baseUrl={baseUrl}
      />
      <section>
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
                  category={article.categories.nodes[0]}
                  categories={article.categories.nodes}
                  baseUrl={baseUrl}
                ></SingleCard>
              ))}
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
export default HomeTemplate

export const pageQuery = graphql`query WordPressPosts($catTotalCount: Int! = 0, $id: String!) {
  wpCategory: allWpCategory(
    limit: 10
    filter: {name: {ne: "Uncategorized"}, count: {gt: 0}}
    skip: $catTotalCount
  ) {
    nodes {
      name
      link
    }
  }
  page: wpPage(id: {eq: $id}) {
    id
    uri
    featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(
              quality: 90, 
              placeholder: BLURRED, 
              layout: FULL_WIDTH
            )
          }
        }
      }
    }
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
  post: allWpPost(sort: {fields: [date], order: DESC}, limit: 20) {
    totalCount
    nodes {
      id
      excerpt
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
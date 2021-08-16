import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "@components/layout"

// import single post card
import SingleCard from "@components/page-components/single-card"

// scss file
import "@sass/pages/home.scss"

const CategoryTemplate = ({ data: { post, wpCategory }  }) => {
  
  // Array of all articles
  const allPosts = post.nodes

  // Array of all categories
  const categories = wpCategory.nodes

  return( 
    <Layout >
      <section>
        <div className="grid-container container">
          
            {allPosts.map((article) => (
              <div>
                <SingleCard 
                  title={article.title} 
                  publishDate={article.date} 
                  excerpt={article.excerpt} 
                  featureImage={article.featuredImage}
                  readingTime={article.readingTime}
                  linkUrl={article.link}
                  shareUrl={process.env.BASE_URL+article.link} 
                  category={article.categories.nodes[0]}
                ></SingleCard>
              </div>
              
            ))}
          
        </div>
      </section>
    </Layout>
  )
}
export default CategoryTemplate

export const pageQuery = graphql`
  query WordPressCategoryPosts($catTotalCount: Int! = 0 ) {
    wpCategory: allWpCategory(
      limit: 10,
      filter: {name: {ne: "Uncategorized"}},
      skip: $catTotalCount
    ) {
        nodes {
            name
            link
        }
    }

    post: allWpPost(
      sort: { fields: [date], order: DESC }
      limit: 30
    ) {
      totalCount
      nodes {
        excerpt
        link
        date(formatString: "MMMM YYYY")
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
                fluid(maxWidth: 200, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
      	}
      }
    }
  }
`
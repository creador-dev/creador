import React from "react"
import { graphql } from "gatsby"

import parse from "html-react-parser"
import Layout from "@components/layout"
import Seo from "@components/global/seo"

const PageTemplate = ({ 
  data: { page }, 
  pageContext: { baseUrl }  
}) => {

  const featuredImage = {
    fluid: page.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: page.featuredImage?.node?.alt || ``,
  }

  const seoImage = featuredImage ?  featuredImage.fluid?.src : null

  return(
    <Layout>
      <Seo 
        image={seoImage}
        seo={page.seo}
        url={page.uri}
        baseUrl={baseUrl}
      />
      <section>
        <div className="container">
          <h1 itemProp="headline">{parse(page.title)}</h1>
          {!!page.content && (
            <section itemProp="pageBody">
              <div className="page-container">
                {parse(page.content)}
              </div>
            </section>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current post by id
    page: wpPage(id: { eq: $id }) {
      id
      content
      title
      uri
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
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
  }
`
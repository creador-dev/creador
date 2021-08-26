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
    fluid: page.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: page.featuredImage?.node?.alt || ``,
  }

  const seoImage = featuredImage ?  featuredImage.fluid?.images?.fallback?.src : null

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

export const pageQuery = graphql`query PageById($id: String!) {
  page: wpPage(id: {eq: $id}) {
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
            gatsbyImageData(quality: 100, placeholder: BLURRED, layout: FULL_WIDTH)
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
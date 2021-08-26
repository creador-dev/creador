import React from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import { Helmet } from "react-helmet"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const metaDescription = "404 page not found"
  
  return (
    <Layout location={location} title={siteTitle}>
      <Helmet
        title={siteTitle}
        titleTemplate={siteTitle ? `%s` : null}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
        ]}
      />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

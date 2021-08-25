/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({  
  lang, 
  meta, 
  image,
  seo,
  baseUrl
}) => {
  const { wp } = useStaticQuery(
    graphql`
      query {
        wp {
          generalSettings {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription = seo?.metaDesc || wp.generalSettings?.description
  const title = seo?.title || wp.generalSettings?.title
  const defaultTitle = wp.generalSettings?.title
  const metaUrl = baseUrl+url
  const metaType = seo?.opengraphType
  const metaImage = baseUrl+(image ? image : "/seo-image.svg")

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:type`,
          content: metaType,
        },
        {
          property: `og:url`,
          content: metaUrl,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: `@pwnkumar221`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo

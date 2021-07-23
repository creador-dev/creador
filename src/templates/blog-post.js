import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

import AniLink from "gatsby-plugin-transition-link/AniLink"

import helper from "@utils/helper"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
// import "../css/@wordpress/block-library/build-style/style.css"
// import "../css/@wordpress/block-library/build-style/theme.css"

import Bio from "@components/global/bio"
import Layout from "@components/layout"
import Seo from "@components/global/seo"

// import page css
import "@sass/pages/single-post.scss"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  useEffect(() => {
    helper.highlightCode()
  })

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />
      
      <article
        className="blog-post"
      >
        <div className="article-container">
          <h1 itemProp="headline">{parse(post.title)}</h1>
          <p>{post.date}</p>
        </div>
        <div className="lead-image">
          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.fluid && (
            <Image
              fluid={featuredImage.fluid}
              alt={featuredImage.alt}
            />
          )}
        </div>

        {!!post.content && (
          <section itemProp="articleBody">
            <div className="article-container">
              {parse(post.content)}
            </div>
          </section>
        )}

        <hr />

        <footer>
          <Bio />
        </footer>
      </article>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <AniLink direction="right" duration={1.5} cover bg="#F9A826" to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </AniLink>
            )}
          </li>

          <li>
            {next && (
              <AniLink direction="right" duration={1.5} cover bg="#F9A826" to={next.uri} rel="next">
                {parse(next.title)} →
              </AniLink>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
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
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`

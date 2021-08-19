import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

import helper from "@utils/helper"

import Bio from "@components/global/bio"
import Layout from "@components/layout"
import Seo from "@components/global/seo"

// share icon
import ShareIcons from "@components/global/shareIcons"

// import more posts
import MorePostsCard from "@components/page-components/more-posts-card"

// import comments
import Comments from "@components/page-components/comments"

// import page css
import "@sass/pages/single-post.scss"

const BlogPostTemplate = ({ 
  data: { post, morePosts }, 
  pageContext: { baseUrl } 
}) => {
  
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const shareUrl = baseUrl+post.link

  useEffect(() => {
    helper.highlightCode()
  })

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />
      
      <article className="blog-post">
        <div className="article-container">
          <h1 itemProp="headline">{parse(post.title)}</h1>
          <div className="author-post-info">
            <div className="author-wrapper">
              <Bio />
              <div className="post-date-readtime">{post.date} · {post.readingTime} min read</div>
            </div>
            <ShareIcons shareUrl={shareUrl} pageTypePost={true}></ShareIcons>
          </div>
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
        
        {morePosts ?
          <section className="more-posts-section">
            <div className="article-container more-posts-wrapper">
              <h3 className="section-heading">More posts</h3>
              <div className="grid-container more-posts-grid">
                {morePosts.nodes.map((item) =>
                  <div>
                    <MorePostsCard post={item}></MorePostsCard>
                  </div>
                )}
              </div>
            </div>
          </section>
          : ""
        }
        

        <section className="comments-wrapper">
          <div className="article-container">
            <Comments slug={ post.slug } title={ post.title }></Comments>
          </div>
        </section>        

      </article>
      
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $categoryArr: [String!]
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      link
      date(formatString: "MMMM DD, YYYY")
      slug
      readingTime
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

    # fetch more posts
    morePosts: allWpPost(
      sort: {fields: [date], order: DESC}
      limit: 9
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              id: {
                in: $categoryArr
              }
            }
          }
        },
        id: {
          ne: $id
        }
      }
    ) {
      nodes {
        id
        link
        title
        categories {
          nodes {
            id
            name
            link
          }
        }
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 400, quality: 100) {
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

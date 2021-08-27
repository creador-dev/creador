import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"

import highlightCode from "@utils/helper"

import Bio from "@components/global/bio"
import Layout from "@components/layout"
import Seo from "@components/global/seo"

// import breadcrumbs
import BreadCrumbs from "@components/global/breadcrumbs"

// share icon
import ShareIcons from "@components/global/shareIcons"

// import more posts
import MorePostsCard from "@components/page-components/more-posts-card"

// import comments
import Comments from "@components/page-components/comments"

// import clap button
import PostClapButton from "@components/page-components/clap-button"

// import page css
import "@sass/pages/single-post.scss"

const BlogPostTemplate = ({ 
  data: { post, morePosts }, 
  pageContext: { baseUrl } 
}) => {
  
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const shareUrl = baseUrl+post.link

  const postCategories = post.categories.nodes

  const seoImage = featuredImage.fluid ?  featuredImage.fluid?.images?.fallback?.src : null

  useEffect(() => {
    highlightCode()
  })


  return (
    <Layout>
      <Seo 
        image={seoImage}
        seo={post.seo}
        url={post.uri}
        baseUrl={baseUrl}
      />
      <BreadCrumbs
        list={post.seo.breadcrumbs}
      />
      <article className="blog-post">
        <div className="container article-container">
          <h1 itemProp="headline">{parse(post.title)}</h1>
          <div className="author-post-info">
            <div className="author-wrapper">
              <Bio />
              <div className="post-date-readtime">{post.date} · {post.readingTime} min read</div>
            </div>
            <ShareIcons 
              shareUrl={shareUrl} 
              title={post.title} 
              categories={postCategories}
              featuredImage={featuredImage} 
              showCategory={true}
              baseUrl={baseUrl}
            ></ShareIcons>
          </div>
        </div>
        <div className="lead-image">
          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.fluid && (
            <GatsbyImage image={featuredImage.fluid} alt={featuredImage.alt} />
          )}
        </div>

        {!!post.content && (
          <section itemProp="articleBody">
            <div className="container article-container">
              <div className="article-content-wrapper">{parse(post.content)}</div>
              <div className="post-footer">
                <div className="post-categories">
                  {postCategories.length ? 
                    postCategories.map(( item ) => {
                      return <Link to={item.link} key={item.id} className="hoverable tags">{item.name}</Link>
                    })
                    : ""
                  }
                </div>
                <div className="post-cta">
                  <PostClapButton postId={post.id}></PostClapButton>
                  <ShareIcons 
                    shareUrl={shareUrl} 
                    title={post.title} 
                    categories={postCategories}
                    featuredImage={featuredImage} 
                    showCategory={true}
                  ></ShareIcons>
                </div>
              </div>            
            </div>
          </section>
        )}

        <section className="comments-wrapper">
          <div className="container article-container">
            <Comments slug={ post.slug } title={ post.title }></Comments>
          </div>
        </section>  
        
        {morePosts ?
          <section className="more-posts-section">
            <div className="container article-container more-posts-wrapper">
              <h3 className="section-heading">More posts</h3>
              <div className="grid-container more-posts-grid">
                {morePosts.nodes.map((item) =>
                  <div key={item.id}>
                    <MorePostsCard post={item}></MorePostsCard>
                  </div>
                )}
              </div>
            </div>
          </section>
          : ""
        }      

      </article>
      
    </Layout>
  );
}

export default BlogPostTemplate

export const pageQuery = graphql`query BlogPostById($id: String!, $categoryArr: [String!]) {
  post: wpPost(id: {eq: $id}) {
    id
    excerpt
    content
    title
    link
    date(formatString: "MMMM DD, YYYY")
    slug
    uri
    categories {
      nodes {
        id
        name
        link
      }
    }
    readingTime
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
  morePosts: allWpPost(
    sort: {fields: [date], order: DESC}
    limit: 9
    filter: {categories: {nodes: {elemMatch: {id: {in: $categoryArr}}}}, id: {ne: $id}}
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
              gatsbyImageData(
                width: 400
                quality: 100
                placeholder: BLURRED
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  }
}
`

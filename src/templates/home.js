import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "@components/layout"

// import single post card
import SingleCard from "@components/page-components/single-card"

// scss file
import "@sass/pages/home.scss"

const HomeTemplate = ({ data: { post }  }) => {
  
  // shuffle items
  // const shuffle = arr => arr.slice().sort(() => Math.random() - 0.5)
  // shuffle(post.nodes)

  // Array of all articles
  const allPosts = post.nodes

  // State for the list
  const [list, setList] = useState([...allPosts.slice(0, 20)])

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(allPosts.length > 10)

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allPosts.length
      const nextResults = isMore
        ? allPosts.slice(currentLength, currentLength + 10)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allPosts.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line


  return(
    <Layout>
      <section>
        <div className="container grid-container home-grid">
          <div className="grid-post-items">
            <div>
              {list.map((article) => (
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
              ))}
            </div>
            {hasMore ? (
              <div className="load-more-wrap">
                <button className="hoverable load-more-btn" onClick={handleLoadMore}>Load More</button>
              </div>
            ) : ''}
          </div>
          <div>

          </div>
        </div>
      </section>
    </Layout>
  )
}
export default HomeTemplate

export const pageQuery = graphql`
  query WordPressPosts {
    post: allWpPost(
      sort: { fields: [date], order: DESC }
    ) {
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
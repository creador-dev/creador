import React from "react"
import Layout from "@components/layout"

// import single post card
import SinglePostCard from "@components/posts/single-post-card"

// scss file
import "@sass/pages/home.scss"

const HomeTemplate = () => (
  <Layout>
    <section>
      <div className="container grid-container home-grid">
        <div className="grid-post-items">
          <SinglePostCard></SinglePostCard>
        </div>
        <div>

        </div>
      </div>
    </section>
  </Layout>
)
export default HomeTemplate
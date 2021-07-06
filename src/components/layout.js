import React, { useEffect } from "react"
// import { Link, useStaticQuery, graphql } from "gatsby"
// import parse from "html-react-parser"

// import smooth-scrollbar
import Scrollbar from 'smooth-scrollbar';

// import header
import Header from "@components/global/header"

// import header
import Footer from "@components/global/footer"

const Layout = ({ isHomePage, children }) => {
  // const {
  //   wp: {
  //     generalSettings: { title },
  //   },
  // } = useStaticQuery(graphql`
  //   query LayoutQuery {
  //     wp {
  //       generalSettings {
  //         title
  //         description
  //       }
  //     }
  //   }
  // `)
  // change state on scroll
  useEffect(() => {
    Scrollbar.init(document.querySelector('#smoothScrollbar'));
  })
  
  return (
    <div id="smoothScrollbar" className="global-wrapper page-wrapper" data-is-root-path={isHomePage}>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>    
  )
}

export default Layout

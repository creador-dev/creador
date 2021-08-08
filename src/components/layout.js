import React, { useEffect } from "react"
// import { Link, useStaticQuery, graphql } from "gatsby"
// import parse from "html-react-parser"

// import smooth-scrollbar
import Scrollbar from "smooth-scrollbar"

// import cursor
import Cursor from "@components/global/cursor"

// import header
import Header from "@components/global/header"

// import header
import Footer from "@components/global/footer"

const Layout = ({ isHomePage, children }) => {
  
  // function for animating header
  function headerAnimate(scrollbar){
    let lastScrollTop = 0
    let headerElem = document.querySelector(".global-header")
    scrollbar.addListener((status) => {
      let st = status.offset.y

      if(st < 80){
        // if scroll is less then remove css
        headerElem.classList.remove("show")
        headerElem.classList.remove("hide")
      } else if (st > lastScrollTop){
        // downscroll code
        headerElem.classList.remove("show")
        headerElem.classList.add("hide")
      } else {
        // upscroll code
        headerElem.classList.remove("hide")
        headerElem.classList.add("show")
      }
      lastScrollTop = st <= 0 ? 0 : st  // For Mobile or negative scrolling
    })
  }
 
  useEffect(() => {
    // smooth scrollbar init
    let scrollbar = Scrollbar.init(document.querySelector("#smoothScrollbar"))

    // animate header in scroll
    headerAnimate(scrollbar)
  })
  
  return (
    <div className="global-wrapper page-wrapper" data-is-root-path={isHomePage}>
        <main>
          <Cursor></Cursor>
          <Header></Header>
          <div id="smoothScrollbar">
            {children}
            <Footer></Footer>
          </div>
        </main>
    </div>    
  )
}

export default Layout

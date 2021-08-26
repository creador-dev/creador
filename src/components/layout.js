import React, { useEffect } from "react"
// import { Link, useStaticQuery, graphql } from "gatsby"
// import parse from "html-react-parser"

// import cursor
import Cursor from "@components/global/cursor"

// import header
import Header from "@components/global/header"

// import header
import Footer from "@components/global/footer"

const Layout = ({ isHomePage, children }) => {
  
  // function for animating header
  function headerAnimate(){
    let lastScrollTop = 0
    let headerElem = document.querySelector(".global-header")
    window.addEventListener("scroll" , function() {
      let st = window.pageYOffset

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
    // animate header on scroll
    headerAnimate()
  })
  
  return (
    <div className="global-wrapper page-wrapper" data-is-root-path={isHomePage}>
        <main>
          <Cursor></Cursor>
          <Header></Header>
          <div className="content-wrapper">
            {children}
          </div>
          <Footer></Footer>
        </main>
    </div>    
  )
}

export default Layout

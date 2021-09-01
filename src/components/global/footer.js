import React, { useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

// import logo svg
import SvgLogo from "@components/icons/svgLogo"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterMenuQuery {
      wpMenu(locations: {eq: GATSBY_FOOTER_MENU}) {
        id
        menuItems {
          nodes {
            id
            parentId
            label
            url
            childItems {
              nodes {
                id
                url
                label
              }
            }
          }
        }
      }

      footerLinks: wpMenu(locations: {eq: GATSBY_FOOTER_LINKS}) {
        id
        menuItems {
          nodes {
            id
            parentId
            label
            url
          }
        }
      }
    }
  `)

  const menuItems = data.wpMenu.menuItems.nodes ? data.wpMenu.menuItems.nodes.filter(menuItem => menuItem.parentId === null) : null
  const footerLinks = data.footerLinks.menuItems.nodes ? data.footerLinks.menuItems.nodes.filter(menuItem => menuItem.parentId === null) : null

  function backToTopAnimate(){
    let lastScrollTop = 0
    let backToTopElem = document.querySelector(".back-to-top")
    window.addEventListener("scroll" , function() {
      let st = window.pageYOffset
      if(st > 200){
        // if scroll is more then add css
        backToTopElem.classList.add("show")
      } else {
        // if scroll is less then remove css
        backToTopElem.classList.remove("show")
      }
      lastScrollTop = st <= 0 ? 0 : st  // For Mobile or negative scrolling
    })
  }

  useEffect(() => {
    // show or hide back to top according to scroll position
    backToTopAnimate()
  })
  
  return (
    <footer className="global-footer menu-items">
      <div className="container grid-container footer-grid">
        <div>
          <Link to="/" alt="Creador" aria-label="logo" className="site-logo hoverable">
            <SvgLogo></SvgLogo>
          </Link>
        </div>
        {menuItems.map(item => (
          <div key={item.id} className="grid-footer-menu">
            <div className="footer-menu-wrap">
              <Link className="menu-item hoverable" to={item.url}>{item.label}</Link>
              <ul>
                {item.childItems.nodes.map(subItem => (
                  <li key={subItem.id}><Link className="sub-item hoverable" to={subItem.url}>{subItem.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="footer-main-menu">
          <span className="copyright-text">Copyright © {new Date().getFullYear()} Creador, All rights reserved.</span>
          <div className="menu-links">
            {footerLinks.map(item => (
              <Link className="sub-item hoverable" to={item.url} key={item.id}>{item.label}</Link>
            ))}
          </div>
        </div>       
      </div>
      <button aria-label="Back to top" className="back-to-top" onClick={() => window.scrollTo({ top: 0 })}/>
    </footer>
  )
}

export default Footer


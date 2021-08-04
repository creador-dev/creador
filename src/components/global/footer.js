import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import AniLink from "gatsby-plugin-transition-link/AniLink"

// import logo svg
import SvgLogo from "@components/icons/svgLogo"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterMenuQuery {
      wpMenu(slug: {eq: "footer-menu"}) {
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
    }
  `)

  const menuItems = data.wpMenu.menuItems.nodes ? data.wpMenu.menuItems.nodes.filter(menuItem => menuItem.parentId === null) : null

  return (
    <footer className="global-footer menu-items">
      <div className="container grid-container footer-grid">
        <div>
          <AniLink direction="right" duration={1.5} cover bg="#F9A826" to="/" alt="Creador" className="site-logo">
            <SvgLogo></SvgLogo>
          </AniLink>
        </div>
        {menuItems.map(item => (
          <div key={item.id}>
            <div className="footer-menu-wrap">
              <Link className="menu-item" to={item.url}>{item.label}</Link>
              <ul>
                {item.childItems.nodes.map(subItem => (
                  <li key={subItem.id}><Link className="sub-item" to={subItem.url}>{subItem.label}</Link></li>
                ))}
              </ul>
            </div>
            
          </div>
        ))}
                
        
      </div>
    </footer>
  )
}

export default Footer


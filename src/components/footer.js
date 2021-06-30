import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterMenuQuery {
      wpMenu(slug: {eq: "footer-menu"}) {
        menuItems {
          nodes {
            id
            url
            label
          }
        }
      }
    }
  `)

  const menuItems = data.wpMenu.menuItems.nodes
      
  return (
    <footer className="global-footer">
        <div className="container grid-container">
          <a href="/" alt="Creador" class="site-logo">
            <img src="/logo.svg" alt="site-logo"/>
          </a>
          {menuItems.map(item => (
            <Link to={item.url} key={item.id}>{item.label}</Link>
          ))}
        </div>        
    </footer>
  )
}

export default Footer


import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Header = () => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      wpMenu(slug: {eq: "primary-menu"}) {
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
    <header className="global-header">
        <div className="container grid-container">
          <a href="/" alt="Creador" className="site-logo">
            <img src="/logo.svg" alt="site-logo"/>
          </a>
          {menuItems.map(item => (
            <Link to={item.url} key={item.id}>{item.label}</Link>
          ))}
        </div>        
    </header>
  )
}

export default Header


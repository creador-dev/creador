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
        <div className="container grid-container header-grid">
          <div>
            <a href="/" alt="Creador" className="site-logo">
              <img src="/logo.svg" alt="site-logo"/>
            </a>
          </div>
          <div>
            
          </div>          
        </div>        
    </header>
  )
}

export default Header


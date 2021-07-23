import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import AniLink from "gatsby-plugin-transition-link/AniLink";

// import dark/light switch button
import SwitchMode from "@components/global/switchMode"

const Header = () => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      wpMenu(slug: {eq: "primary-menu"}) {
        id
        menuItems {
          nodes {
            id
            parentId
            label
            url
            childItems {
              nodes {
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
    <header className="global-header" id="fixedHeader">
        <div className="container grid-container header-grid">
          <div>
            <AniLink direction="right" duration={1.5} cover bg="#F9A826" to="/" alt="Creador" className="site-logo">
              <img src="/logo.svg" alt="site-logo"/>
            </AniLink>
          </div>
          <div>
            <div className="primary-menu">
              {menuItems.map((data) => {
                return <li key={data.id}><AniLink direction="right" duration={1.5} cover bg="#F9A826" to={data.url}>{data.label}</AniLink></li>
              })}
            </div>
            <SwitchMode></SwitchMode>  
          </div>          
        </div>        
    </header>
  )
}

export default Header


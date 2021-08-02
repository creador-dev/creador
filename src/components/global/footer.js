import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import AniLink from "gatsby-plugin-transition-link/AniLink"

// import logo svg
import SvgLogo from "@components/icons/svgLogo"

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
        <AniLink direction="right" duration={1.5} cover bg="#F9A826" to="/" alt="Creador" className="site-logo">
          <SvgLogo></SvgLogo>
        </AniLink>
        {menuItems.map(item => (
          <Link to={item.url} key={item.id}>{item.label}</Link>
        ))}
      </div>
    </footer>
  )
}

export default Footer


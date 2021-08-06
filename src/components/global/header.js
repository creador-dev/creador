import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

// import dark/light switch button
import SwitchMode from "@components/global/switchMode"

// import logo svg
import SvgLogo from "@components/icons/svgLogo"

// import search icon
import SearchIcon from "@components/icons/searchIcon"

const Header = () => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      wpMenu(locations: {eq: GATSBY_HEADER_MENU}) {
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
          <Link to="/" alt="Creador" className="site-logo" data-cursor="-exclusion -lg">
            <SvgLogo></SvgLogo>
          </Link>
        </div>
        <div>
          <div className="primary-menu menu-items">
            <ul>
              {menuItems.map((data) => {
                return <li key={data.id} data-cursor="-exclusion -lg"><Link to={data.url} alt={data.label}>{data.label}</Link></li>
              })}
            </ul>
          </div>
        </div>
        <div>
          <div className="top-right-menu">
            <span className="menu-icon" data-cursor="-exclusion -lg">
              <SearchIcon></SearchIcon>
            </span>
            <span className="menu-icon" data-cursor="-exclusion -lg">
              <SwitchMode></SwitchMode>
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


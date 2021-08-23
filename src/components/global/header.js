import React from "react"
import { Link, useStaticQuery, useEffect, graphql } from "gatsby"

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

      megaMenu: wpMenu(locations: {eq: GATSBY_MEGA_MENU}) {
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

  // mega menu items
  const megaMenuItems = data.megaMenu.menuItems.nodes ? data.megaMenu.menuItems.nodes.filter(menuItem => menuItem.parentId === null) : null

  function hamburgerClick(){
    const headerElem = document.getElementById("fixedHeader")
    if(headerElem.classList.contains("show-megamenu")){
      headerElem.classList.remove("show-megamenu")
      return
    }
    headerElem.classList.add("show-megamenu")
  }

  return (
    <header className="global-header" id="fixedHeader">
      <div className="container grid-container header-grid">
        <div>
          <Link to="/" alt="Creador" className="site-logo hoverable">
            <SvgLogo></SvgLogo>
          </Link>
        </div>
        <div className="grid-primary-menu">
          <div className="primary-menu menu-items">
            <ul>
              {menuItems.map((data) => {
                return <li key={data.id}><Link className="hoverable" to={data.url} alt={data.label}>{data.label}</Link></li>
              })}
            </ul>
          </div>
        </div>
        <div>
          <div className="top-right-menu">
            <span className="menu-icon hoverable">
              <SearchIcon></SearchIcon>
            </span>
            <span className="menu-icon hoverable">
              <SwitchMode></SwitchMode>
            </span>
            <span className="hamburger-icon">
              <span className="hamburger" onClick={hamburgerClick}>
                <span></span>
              </span>
            </span>
            <div className="mega-menu-wrapper">
              <div className="mega-menu-container">
                {megaMenuItems.map(item => (
                  <div key={item.id} className="mega-menu">
                    <div className="menu-wrap">
                      <Link className="menu-item hoverable" to={item.url}>{item.label}</Link>
                      {item.childItems.nodes.length ? 
                        <ul>
                          {item.childItems.nodes.map(subItem => (
                            <li key={subItem.id}><Link className="sub-item hoverable" to={subItem.url}>{subItem.label}</Link></li>
                          ))}
                        </ul>
                      : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


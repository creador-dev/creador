/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const { author } = useStaticQuery(graphql`
    query BioQuery {
      # if there was more than one user, this would need to be filtered
      author: wpUser {
        name
        twitter: name
        description
        avatar {
          url
        }
      }
    }
  `)

  const avatarUrl = author?.avatar?.url;

  return (
    <div className="bio">
      {avatarUrl && (
        <img
          alt={author?.name || ``}
          className="bio-avatar"
          src={avatarUrl}
        />
      )}
      {author?.name && (
        <span>{author.name}</span>
      )}
    </div>
  )
}

export default Bio

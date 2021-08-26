import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";

export default function MorePostsCard({ post }) {
    
    const featuredImage = {
        fluid: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
        alt: post.featuredImage?.node?.alt || ``,
    }
    
    return (
        <div className="more-post-card">
            <Link to={post.link} className="hoverable">
                <div className="card-image">
                    {featuredImage?.fluid && (
                        <GatsbyImage image={featuredImage.fluid} alt={featuredImage.alt} />
                    )}
                </div>
                <h3>{post.title}</h3>
            </Link>
        </div>
    );
}

import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share"

export default function SingleCard({ title, publishDate, excerpt, category, linkUrl, featureImage, readingTime, shareUrl }) {
    const featuredImage = {
        fluid: featureImage?.node?.localFile?.childImageSharp?.fluid,
        alt: featureImage?.node?.alt || ``,
    }
    return (
        <Link to={linkUrl} className="card-wrapper hoverable">
            <div className="grid-container single-card">
                <div className="card-info">
                    <h3>{ title }</h3>
                    <div className="excerpt">{ parse(excerpt) }</div>
                    <div className="card-detail">
                        <div className="card-detail-wrap">
                            <span className="card-publish-date">{ publishDate } ·</span>
                            <span className="card-read-time">{ readingTime } min read ·</span> 
                            <Link to={ category.link } className="card-category tags">{ category.name }</Link>
                        </div>
                        <div className="share-wrapper">
                            <FacebookShareButton  url={shareUrl}><FacebookIcon size={30} round={true} /></FacebookShareButton>
                            <LinkedinShareButton url={shareUrl}><LinkedinIcon size={30} round={true}></LinkedinIcon></LinkedinShareButton>
                            <TwitterShareButton  url={shareUrl}><TwitterIcon size={30} round={true}></TwitterIcon></TwitterShareButton>
                            <WhatsappShareButton url={shareUrl}><WhatsappIcon size={30} round={true}></WhatsappIcon></WhatsappShareButton>
                        </div>                        
                    </div>
                </div>
                <div>
                    <div className="feature-image">
                        {/* if we have a featured image for this post let's display it */}
                        {featuredImage?.fluid && (
                            <Image
                                fluid={featuredImage.fluid}
                                alt={featuredImage.alt}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

// share icon
import ShareIcons from "@components/global/shareIcons"

export default function SingleCard({ 
    title, 
    publishDate, 
    excerpt, 
    category, 
    categories, 
    linkUrl, 
    featureImage, 
    readingTime, 
    shareUrl 
}) {
    const featuredImage = {
        fluid: featureImage?.node?.localFile?.childImageSharp?.fluid,
        alt: featureImage?.node?.alt || title,
    }

    const cardExcerpt = excerpt ? excerpt : ''

    return (
        <Link to={linkUrl} className="card-wrapper hoverable">
            <div className="grid-container single-card">
                <div className="card-info">
                    <h3>{ title }</h3>
                    { cardExcerpt ? 
                        <div className="excerpt">{ parse(cardExcerpt) }</div>
                    : '' } 
                </div>

                {featuredImage.fluid || featureImage?.node ? 
                    <div className="grid-card-image">
                        <div className="feature-image">
                            {/* if we have a featured image for this post let's display it */}
                            {featuredImage?.fluid && (
                                <Image
                                    fluid={featuredImage.fluid}
                                    alt={featuredImage.alt}
                                />
                            )}
                            {featureImage?.node?.srcSet && (
                                <div className="gatsby-image-wrapper">
                                    <picture>
                                        <img 
                                            src={featureImage?.node?.sourceUrl} 
                                            alt={title} 
                                            srcset={featureImage.node.srcSet} 
                                        />
                                    </picture>
                                </div>
                            )}
                        </div>
                    </div>
                : ''}
                
                <div className="grid-card-share">
                    <div className="card-detail">
                        <div className="card-detail-wrap">
                            {publishDate ? 
                                <span className="card-publish-date">{ publishDate } ·</span>                            
                            : ''}
                            {readingTime ? 
                                <span className="card-read-time">{ readingTime } min read </span>                             
                            : ''}
                            {category ?
                                <span>· <Link to={ category.link } className="card-category tags">{ category.name }</Link></span>
                                : ''
                            }
                        </div>
                        <ShareIcons 
                            shareUrl={shareUrl} 
                            title={title} 
                            categories={categories}
                            featuredImage={featuredImage} 
                            showCategory={false}
                        ></ShareIcons>                
                    </div>
                </div>
            </div>
        </Link>
    )
}

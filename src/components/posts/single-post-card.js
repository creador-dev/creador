import React from "react"
import { Link } from "gatsby"
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

export default function singlePostCard({ title, publishDate, excerpt, featureImage, readingTime, shareUri }) {
    return (
        <Link to="/tab" className="card-wrapper hoverable">
            <div className="grid-container single-post-card">
                <div className="post-info">
                    <h3>This Long-Awaited Technology May Finally Change the World</h3>
                    <span className="excerpt">Solid-state batteries are poised to emerge in the coming years</span>
                    <div className="post-detail">
                        <div className="post-detail-wrap">
                            <div className="post-publish-date">May 30 ·</div>
                            <div className="post-read-time">6 min read ·</div> 
                            <div className="post-category">Science</div>
                        </div>
                        <div className="share-wrapper">
                            <FacebookShareButton  url="/"><FacebookIcon size={30} round={true} /></FacebookShareButton>
                            <LinkedinShareButton url="/"><LinkedinIcon size={30} round={true}></LinkedinIcon></LinkedinShareButton>
                            <TwitterShareButton  url="/"><TwitterIcon size={30} round={true}></TwitterIcon></TwitterShareButton>
                            <WhatsappShareButton url="/"><WhatsappIcon size={30} round={true}></WhatsappIcon></WhatsappShareButton>
                        </div>                        
                    </div>
                </div>
                <div>
                    <div className="feature-image">
                        <img alt="This Long-Awaited Technology May Finally Change the World" className="" src="https://miro.medium.com/fit/c/200/134/1*GlIDBz93SkiY0H9Ib7rObQ.jpeg" width="200" height="134"/>
                    </div>
                </div>
            </div>
        </Link>
    )
}

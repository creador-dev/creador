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

export default function SingleCard({ title, publishDate, excerpt, featureImage, readingTime, shareUri }) {
    return (
        <Link to="/tab" className="card-wrapper hoverable">
            <div className="grid-container single-card">
                <div className="card-info">
                    <h3>This Long-Awaited Technology May Finally Change the World</h3>
                    <div className="excerpt">Solid-state batteries are poised to emerge in the coming years Solid-state batteries are poised to emerge in the coming years Solid-state batteries are poised to emerge in the coming years Solid-state batteries are poised to emerge in the coming years</div>
                    <div className="card-detail">
                        <div className="card-detail-wrap">
                            <span className="card-publish-date">May 30 ·</span>
                            <span className="card-read-time">6 min read ·</span> 
                            <Link to="#" className="card-category">Science</Link>
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

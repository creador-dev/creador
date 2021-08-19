import React from 'react'

import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TelegramIcon,
} from "react-share"

export default function ShareIcons({ shareUrl, pageTypePost }) {
    return (
        <div className="share-wrapper hoverable">
            <FacebookShareButton  url={shareUrl}>
                <FacebookIcon 
                    size={30} 
                    round={true}
                />
            </FacebookShareButton>
            <TwitterShareButton  url={shareUrl}>
                <TwitterIcon 
                    size={30} 
                    round={true}
                >
                </TwitterIcon>
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon 
                    size={30} 
                    round={true}
                >
                </WhatsappIcon>
            </WhatsappShareButton>
            <RedditShareButton url={shareUrl}>
                <RedditIcon 
                    size={30} 
                    round={true}
                >
                </RedditIcon>
            </RedditShareButton>
            {pageTypePost ?
                <PinterestShareButton url={shareUrl}>
                    <PinterestIcon 
                        size={30} 
                        round={true}
                    >
                    </PinterestIcon>
                </PinterestShareButton>
                : ""
            }
            {pageTypePost ?
                <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon 
                        size={30} 
                        round={true}
                    >
                    </LinkedinIcon>
                </LinkedinShareButton>
                : ""
            }
            {pageTypePost ?
                <TelegramShareButton url={shareUrl}>
                    <TelegramIcon 
                        size={30} 
                        round={true}
                    >
                    </TelegramIcon>
                </TelegramShareButton>
                : ""
            }
            
        </div>
    )
}

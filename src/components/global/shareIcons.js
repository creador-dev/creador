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

export default function ShareIcons({ 
    shareUrl, 
    title, 
    showCategory, 
    categories, 
    featuredImage,
    baseUrl 
}) {

    const tagsArr = []
    let fbTag = ''

    if(categories.length){
        categories.map(( item ) => {
            return tagsArr.push(item.name)
        })

        const max = tagsArr.length
        const min = 0
        fbTag = '#'+tagsArr[Math.floor(Math.random() * (max - min) + min)]
    }

    return (
        <div className="share-wrapper hoverable">
            <FacebookShareButton  
                url={shareUrl}
                quote={title}
                hashtag={fbTag}
            >   
                <FacebookIcon 
                    size={30} 
                    round={true}
                />
            </FacebookShareButton>
            <TwitterShareButton  
                url={shareUrl}
                title={title}
                hashtags={tagsArr}
            >
                <TwitterIcon 
                    size={30} 
                    round={true}
                >
                </TwitterIcon>
            </TwitterShareButton>
            <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
            >
                <WhatsappIcon 
                    size={30} 
                    round={true}
                >
                </WhatsappIcon>
            </WhatsappShareButton>
            <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}    
            >
                <RedditIcon 
                    size={30} 
                    round={true}
                >
                </RedditIcon>
            </RedditShareButton>
            {showCategory ?
                <PinterestShareButton 
                    url={shareUrl}
                    media={baseUrl+featuredImage.fluid?.images?.fallback?.src}
                >
                    <PinterestIcon 
                        size={30} 
                        round={true}
                    >
                    </PinterestIcon>
                </PinterestShareButton>
                : ""
            }
            {showCategory ?
                <LinkedinShareButton 
                    url={shareUrl}
                >
                    <LinkedinIcon 
                        size={30} 
                        round={true}
                    >
                    </LinkedinIcon>
                </LinkedinShareButton>
                : ""
            }
            {showCategory ?
                <TelegramShareButton
                    url={shareUrl}
                    title={title}
                >
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

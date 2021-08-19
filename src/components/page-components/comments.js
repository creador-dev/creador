import React from 'react'
import { DiscussionEmbed } from "disqus-react"

export default function Comments({ slug, title }) {

    // discuss config
    const disqusConfig = {
        shortname: process.env.GATSBY_DISQUS_NAME,
        config: { 
            identifier: slug, 
            title: title
        },
    }

    return (
        <DiscussionEmbed {...disqusConfig} />
    )
}

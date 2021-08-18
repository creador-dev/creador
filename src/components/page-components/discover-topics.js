import React from 'react'
import { Link } from 'gatsby'

export default function DiscoverTopics(data) { 
    const categories = data.categories
    return(
        <div className="discover-card">
            <h4>Discover More</h4>
            {categories.map((data) => (
                <Link key={data.id} to={data.link} className="hoverable tags">{data.name}</Link>
            ))}
        </div>
    )
}

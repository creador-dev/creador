import React from "react"
import { Link } from "gatsby"

export default function Breadrumbs({ list }) {
    return (
        <section className="breadcrumbs-wrapper">
            <div className="container">
                <div className="breadcrumb-items">
                    {list.map((item) => (
                        <Link to={item.url} className="hoverable">{item.text}</Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

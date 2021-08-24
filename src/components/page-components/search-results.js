import React from "react"
import {
    useQuery,
    gql
} from "@apollo/client"

// import single post card
import SingleCard from "@components/page-components/single-card"

export default function SearchResults({ search, baseUrl }) { 

    const GET_RESULTS = gql`
        query SearchResults($searchInput: String!) {
            searchWP(first: 50, where: { input: $searchInput }) {
                nodes {
                    ... on Post {
                        id
                        title
                        excerpt
                        uri
                        featuredImage {
                            node {
                                srcSet
                                sourceUrl
                            }
                        }
                        categories {
                            nodes {
                                name
                                uri
                            }
                        }
                        date
                        readingTime
                    }
                    ... on Page {
                        id
                        title
                        uri
                    }
                }
            }
        }
    `

    const { loading, error, data } = useQuery(GET_RESULTS, {
        variables: { searchInput: search },
    })

    if (loading) return <div className="search-loading-icon"></div>;

    if (error) return `Error! ${error}`;

    const searchData = data.searchWP.nodes

    console.log(searchData)

    return(
        <div>
            <div className="hoverable search-results">
                {searchData?.map((data) => (
                    <SingleCard 
                        key={data.id}
                        title={data.title} 
                        publishDate={data.date} 
                        excerpt={data.excerpt} 
                        featureImage={data.featuredImage}
                        readingTime={data.readingTime}
                        linkUrl={data.uri}
                        shareUrl={baseUrl+data.uri} 
                        category={data.categories?.nodes?.[0] || ''}
                        categories={data.categories?.nodes || ''}
                    ></SingleCard>
                ))}
            </div>
        </div>        
    )
}

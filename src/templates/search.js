import React, { useState } from "react"
import { graphql } from "gatsby"
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client"
import Layout from "@components/layout"
import Seo from "@components/global/seo"

// import search icon
import SearchIcon from "@components/icons/searchIcon"

// import search results 
import SearchResults from "@components/page-components/search-results"

// impost scss
import "@sass/pages/search.scss"

export default function Search({ 
    data: { page },
    pageContext: { baseUrl, apolloUri }
 }) {

    const client = new ApolloClient({
        uri: apolloUri,
        cache: new InMemoryCache()
    });
   
    const [searchInput, setsearchInput] = useState('')

    const seoImage = null

    function submitForm(event){
        event.preventDefault();
        const query = document.getElementById("psearch").value
        setsearchInput(query)
    }

    return (
        <Layout >
            <Seo 
                image={seoImage}
                seo={page.seo}
                url={page.uri}
                baseUrl={baseUrl}
            />
            <section className="search-section">
                <div className="container">
                    <div>
                        <form onSubmit={submitForm} className="hoverable">
                            <div className="form-fields">
                                <input type="search" id="psearch" name="psearch" placeholder="type and press enter to search" required/>
                                <div className="submit-btn-wrapper">
                                    <input type="submit" id="submitBtn" value=" "/>
                                    <SearchIcon></SearchIcon>
                                </div>
                            </div>
                        </form>
                    </div>
                    <ApolloProvider client={client}>
                        <SearchResults baseUrl={baseUrl} search={searchInput}></SearchResults>
                    </ApolloProvider>
                </div>
            </section>            
        </Layout>
    )
}

export const pageQuery = graphql`
  query WordPressSearch( $id: String! ) {

    # selecting the current post by id
    page: wpPage(id: { eq: $id }) {
      id
      uri
      seo {
        title
        metaDesc
        opengraphAuthor
        opengraphSiteName
        opengraphType
        breadcrumbs {
          text
          url
        }
      }
    }
  }
`

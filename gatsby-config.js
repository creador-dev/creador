/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

// dot env file to load custom config
require("dotenv").config({
  path: `.env`,
})

module.exports = {
  /**
   * Adding plugins to this array adds them to your Gatsby site.
   *
   * Gatsby has a rich ecosystem of plugins.
   * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
   */

  // for sitemap generation
  siteMetadata: {
    // If you didn't use the resolveSiteUrl option this needs to be set
    siteUrl: process.env.BASE_URL,
  },

  plugins: [
    {
      /**
       * First up is the WordPress source plugin that connects Gatsby
       * to your WordPress site.
       *
       * visit the plugin docs to learn more
       * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
       *
       */
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url: process.env.WPGRAPHQL_URL,
        // schema: {
        //   perPage: 20,
        //   requestConcurrency: 5,
        //   previewRequestConcurrency: 2,
        // },
        searchAndReplace: [
          {
            search: process.env.BASE_URL,
            replace: process.env.WORDPRESS_URL,
          },
        ],
      },
    },

    /**
     * We need this plugin so that it adds the "File.publicURL" to our site
     * It will allow us to access static url's for assets like PDF's
     *
     * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },

    /**
     * The following two plugins are required if you want to use Gatsby image
     * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
     * if you're curious about it.
     */
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    
    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Creador Developer`,
        short_name: `Creadeor Dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#F9A826`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
        icons:[
          {
            src: `/favicons/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-128x128.png`,
            sizes: `128x128`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-152x152.png`,
            sizes: `152x152`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: `any maskable`
          },

          // ios icons
          {
            src: `/favicons/icon-120x120.png`,
            sizes: `120x120`,
            type: `image/png`,
            purpose: `any maskable`
          },
          {
            src: `/favicons/icon-180x180.png`,
            sizes: `180x180`,
            type: `image/png`,
            purpose: `any maskable`
          }
        ]
      },
    },

    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
    `gatsby-plugin-react-helmet`,

    /**
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     */
    `gatsby-plugin-offline`,

    // gatsby plugin gatsby cloud
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        headers: {
          "/**/*.html": [
            "Cache-Control: public, max-age=0, must-revalidate",
          ],
          "/page-data/*": [
            "Cache-Control: public, max-age=0, must-revalidate",
          ],
          "/static/*": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
          "/*.js": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
          "/*.css": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
          "/fonts/*": [
            "Cache-Control: public, max-age=31536000, immutable",
          ],
          "/sw.js": [
            "Cache-Control: public, max-age=0, must-revalidate",
          ],
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },

    // gatsby sass plugin
    {
      resolve: `gatsby-plugin-sass`,
    },

    // onesignal settings
    {
      resolve: `@vtex/gatsby-plugin-onesignal`,
      options: {
        oneSignalAppId: "488662b8-5a9a-4753-ab17-1a9aab8dbe1e"
      },
    },

    // nprogess bar plugin
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#F9A826`,
        // Disable the loading spinner.
        showSpinner: true,
      },
    },

    // gatsby root alias import
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@layouts": "src/layouts",
          "@pages": "src/pages",
          "@sass": "src/sass",
          "@templates": "src/templates",
          "@static": "static",
          "@utils": "src/utils"
        },
        extensions: [
          "js",
        ],
      }
    },

    // gatsby mailchimp integration
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: process.env.MAILCHIMP_ENDPOINT, // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    }, 
    
    // google analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // // Enables Google Optimize using your container Id
        // optimizeId: "GOOGLE_OPTIMIZE_TRACKING_ID",
        // // Enables Google Optimize Experiment ID
        // experimentId: "GOOGLE_EXPERIMENT_ID",
        // // Set Variation ID. 0 for original 1,2,3....
        // variationId: "GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        defer: false,
        // defaults to false
        enableWebVitalsTracking: true,
      },
    },

    // for generating sitemap
    `gatsby-plugin-advanced-sitemap`
    
  ],
}

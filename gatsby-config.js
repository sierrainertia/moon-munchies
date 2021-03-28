/* global module */

module.exports = {
  siteMetadata: {
    title: "moon-munchies",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: [
          "Balance",
          "BalanceTransaction",
          "Product",
          "ApplicationFee",
          "Sku",
          "Subscription",
        ],
        secretKey:
          "sk_test_51Ia4mxDV5lZ6A1jl6qIc5XAQpWfLd3BEiek8sjJ5EAkYUal7YJ9jw4yDUnga2GqDvee1pFonOQPbK4dkZzXHOE9b00fq3xaKfT",
        downloadFiles: true,
      },
    },
  ],
};

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
          "sk_test_51Ia4qDGncOwLsgTJKcaTgIKClUQBNsOXPc5TiaUPOV0RqW9BwfDanU1GjyYXewQST5E8fluHpZfD8HLItNfIqMsk00kxaECvUw",
        downloadFiles: true,
      },
    },
  ],
};

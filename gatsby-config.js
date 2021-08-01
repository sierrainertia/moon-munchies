/* global module, require, process */

console.warn(`Using the .env.${process.env.NODE_ENV} configuration file`);

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "moon-munchies",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: "src/images/gatsby-icon.png",
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Product", "Price"],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,
      },
    },
  ],
};

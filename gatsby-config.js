/* global module, require, process */

const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

if (process.env.CONTEXT !== "production") {
  console.warn(`Using the .env.${process.env.NODE_ENV} configuration file`);
  const envConfig = dotenv.parse(fs.readFileSync(".env.development"));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} else {
  console.warn(`Falling back to production environment variables`);
}

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

/* global module, require, process */

const fs = require("fs");
const dotenv = require("dotenv");

const obfuscate = (str) =>
  Array.from(str)
    .map((c, i) => (i < 5 || i > str.length - 5 ? c : "."))
    .join("");

if (process.env.CONTEXT !== "production") {
  console.warn(`Using the .env.development configuration file`);
  const envConfig = dotenv.parse(fs.readFileSync(".env.development"));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} else {
  console.warn(`Falling back to production environment variables`);
}

console.log("STRIPE_SECRET_KEY", obfuscate(process.env["STRIPE_SECRET_KEY"]));
console.log(
  "GATSBY_STRIPE_PUBLISHABLE_KEY",
  obfuscate(process.env["GATSBY_STRIPE_PUBLISHABLE_KEY"])
);
console.log(
  "CONTENTFUL_ACCESS_TOKEN",
  obfuscate(process.env["CONTENTFUL_ACCESS_TOKEN"])
);

module.exports = {
  siteMetadata: {
    title: "moon-munchies",
    siteURL: "https://moonmunchies.ca",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
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
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["URL"],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `vx6q3nv9asj2`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
};

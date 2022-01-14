import { graphql, useStaticQuery } from "gatsby";

export const useSiteUrl = () => {
  const {
    site: {
      siteMetadata: { siteURL: url },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteURL
          }
        }
      }
    `
  );

  return { url };
};

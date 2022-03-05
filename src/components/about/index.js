import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import "./index.scss";

export const About = () => {
  const { data } = useStaticQuery(graphql`
    query {
      data: allContentfulLandingPage {
        nodes {
          retailStore {
            city
            link
            name
          }
        }
      }
    }
  `);

  return (
    <div className="aboutUs" id="about">
      <div className="wrapper">
        <div className="info">
          <h2>About us</h2>
          <p>
            At Moon Munchies we freeze-dry your favourite candy, fruits, and
            much more! By doing this we intensify the flavours and provide a
            whole new way to enjoy your snacks.
          </p>
          <p>Does your favourite confectionary send you to the dentist? </p>
          <p>
            Do grandma and grandpa&apos;s dentures pop out every time they take
            a bite of their delectable desserts?
          </p>
          <p>
            Worry no more! Moon Munchies freeze-dried snacks melt in your mouth,
            so you can now enjoy all your sticky snacks with no fear!
          </p>
          <p>
            Ready to try flavours that are out of this world? Moon Munchies are
            available for pick up and delivery.
          </p>
          <p>Place an order today or find us at any of the below locations:</p>
          <ul>
            {data.nodes[0].retailStore.map((store) => (
              <li key={`${store.name}${store.city}`}>
                <a href={store.link} target="_blank" rel="noreferrer">
                  {store.name} | {store.city}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

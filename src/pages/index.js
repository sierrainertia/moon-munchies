import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { ProductTabs } from "../components/product-tabs";
import { ProductItem } from "../components/product-item";
import { ContactSection } from "../components/contact";
import { Footer } from "../components/footer";
import "../styles/index.scss";
import { graphql } from "gatsby";

import "../styles/products.scss";

const productThemes = ["blue", "purple", "pink"];

const IndexPage = ({ data }) => {
  console.log(data);
  const products = {};

  data.allStripeProduct.nodes.forEach((product) => {
    const category = product.metadata.category;

    if (!(category in products)) {
      products[category] = [];
    }
    products[category].push(product);
  });

  console.log(products);
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(products)[0]
  );

  return (
    <>
      <Helmet>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/js/all.min.js"
          integrity="sha512-UwcC/iaz5ziHX7V6LjSKaXgCuRRqbTp1QHpbOJ4l1nw2/boCfZ2KlFIqBUA/uRVF0onbREnY9do8rM/uT/ilqw=="
          crossOrigin="anonymous"
        ></script>
      </Helmet>

      <title>Moon Munchies</title>
      <Header />

      <Hero />

      <main>
        <div className="wrapper">
          <div className="aboutUs" id="about">
            <div className="info">
              <h2>About us</h2>
              <p>
                We’re a family run business with a mission to create powerful
                and unique food experiences. By freeze-drying candy classics,
                fruits, and much more, you not only intensify the flavours but
                provide a whole new way to enjoy your snacks.
              </p>
              <p>Does your favourite confectionary send you to the dentist? </p>

              <p>
                Do grandma and grandpa&apos;s dentures pop out every time they
                take a bite of their delectable desserts?
              </p>
              <p>
                Worry no more! Moon Munchies freeze-dried treats melt in your
                mouth, so you can now enjoy all your sticky snacks with no fear!
              </p>
              <p>
                Ready to try flavours that are out of this world? Place an order
                today!
              </p>
            </div>
          </div>
        </div>

        <div className={`products ${productThemes[1]}`} id="products">
          <div className="wrapper">
            <h2>Products</h2>
            <ProductTabs
              onCategorySelected={setSelectedCategory}
              categories={Object.keys(products)}
              selectedCategory={selectedCategory}
            />
            <div className="gallery">
              {products[selectedCategory].map((product) => {
                return <ProductItem product={product} key={product.id} />;
              })}
            </div>
            <p>Order now, using the form below.</p>
          </div>
        </div>
      </main>
      <ContactSection />
      <Footer />
    </>
  );
};

export default IndexPage;
export const query = graphql`
  query IndexPageQuery {
    allStripeProduct {
      nodes {
        active
        description
        id
        images
        name
        type
        metadata {
          category
        }
      }
    }
  }
`;

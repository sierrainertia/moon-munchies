import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { About } from "../components/about";
// import { ProductTabs } from "../components/product-tabs";
// import { ProductItem } from "../components/product-item";
import { ContactSection } from "../components/contact";
import { Footer } from "../components/footer";
import "../styles/index.scss";
import { graphql } from "gatsby";

import "../styles/products.scss";

// const productThemes = ["purple", "blue", "pink"];

const IndexPage = ({ data }) => {
  const products = {};

  data.allStripeProduct.nodes.forEach((product) => {
    const category = product.metadata.category;

    if (!(category in products)) {
      products[category] = [];
    }
    products[category].push(product);
  });

  // const [selectedCategory, setSelectedCategory] = useState(
  //   Object.keys(products)[0]
  // );
  // const selectedCategoryIndex =
  //   Object.keys(products).findIndex((c) => {
  //     return c === selectedCategory;
  //   }) % productThemes.length;

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
      <About />
      <main>
        {/* <div
          className={`products ${productThemes[selectedCategoryIndex]}`}
          id="products"
        >
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
        </div> */}
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

/* global process */
import React, { useState } from "react";
import { CartProvider } from "use-shopping-cart";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { About } from "../components/about";
import { ProductTabs } from "../components/product-tabs";
import { ProductItem } from "../components/product-item";
import { ContactSection } from "../components/contact";
import { Footer } from "../components/footer";
import { Cart } from "../components/cart";
import "../styles/index.scss";
import "../styles/products.scss";
import { useDeliveryContext } from "../components/delivery-provider";

const stripeKey = process.env.GATSBY_STRIPE_PUBLISHABLE_KEY;

const productThemes = ["purple", "blue", "pink"];

const IndexPage = ({ data }) => {
  const productsByCategory = {};

  data.allStripePrice.nodes.forEach((price) => {
    const category = price.product.metadata.category;

    if (!(category in productsByCategory)) {
      productsByCategory[category] = [];
    }
    productsByCategory[category].push(price);
  });

  const [selectedCategory, setSelectedCategory] = useState("taffy");
  const selectedCategoryIndex =
    Object.keys(productsByCategory).findIndex((c) => {
      return c === selectedCategory;
    }) % productThemes.length;

  const { value } = useDeliveryContext();

  let baseUrl;

  if (typeof window !== undefined) {
    baseUrl = window.location.origin;
  } else {
    baseUrl = process.env.URL;
  }

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl={`${baseUrl}/success/`}
      cancelUrl={baseUrl}
      currency="CAD"
      allowedCountries={value === "DELIVERY" ? ["CA"] : []} // CA somehow just enables shipping address collection
    >
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
        <div
          className={`products ${productThemes[selectedCategoryIndex]}`}
          id="products"
        >
          <div className="wrapper">
            <h2>Products</h2>
            <ProductTabs
              onCategorySelected={setSelectedCategory}
              categories={Object.keys(productsByCategory)}
              selectedCategory={selectedCategory}
            />
            <div className="gallery">
              {productsByCategory[selectedCategory].map((product) => {
                return <ProductItem product={product} key={product.id} />;
              })}
            </div>
          </div>
        </div>
      </main>
      <ContactSection />
      <Footer />
      <Cart prices={data.allStripePrice.nodes} />
    </CartProvider>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    allStripePrice {
      nodes {
        id
        currency
        unit_amount
        product {
          active
          description
          id
          localFiles {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          type
          metadata {
            category
          }
        }
      }
    }
  }
`;

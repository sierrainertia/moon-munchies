import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { ProductTabs } from "../components/product-tabs";
import { ContactSection } from "../components/contact";
import { Footer } from "../components/footer";
import "../styles/index.scss";

// markup
const IndexPage = () => {
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
          <div className="aboutUs">
            <div className="info">
              <h2>About us</h2>
              <p>
                We’re a family run business with a mission to create powerful
                and unique candy experiences. By freeze-drying candy classics,
                you not only intensify the flavour but provide a whole new way
                to eat your treats.
              </p>
              <p>Does your favourite confectionary send you to the dentist? </p>
              <p>
                Do grandma and grandpa&apos;s dentures get pulled out every time
                they take a bite of their delectable desserts?
              </p>
              <p>
                Worry no more! Freeze-dried treats melt in your mouth, so you
                can now enjoy all your sticky snacks with no fear!
              </p>
              <p>
                Ready to enjoy flavour that is out of this world? Place an order
                today!
              </p>
            </div>
          </div>
        </div>

        <div className="products">
          <div className="wrapper">
            <h2>Products</h2>
            <ProductTabs />
            <div className="gallery">
              <img src="https://placekitten.com/300/300" alt="" />
              <img src="https://placekitten.com/300/300" alt="" />
              <img src="https://placekitten.com/300/300" alt="" />
              <img src="https://placekitten.com/300/300" alt="" />
              <img src="https://placekitten.com/300/300" alt="" />
              <img src="https://placekitten.com/300/300" alt="" />
              <img src="https://placekitten.com/300/300" alt="" />
              <img src="https://placekitten.com/300/300" alt="" />
              <img src="https://placekitten.com/300/300" alt="" />
            </div>
          </div>
        </div>
      </main>
      <ContactSection />
      <Footer />
    </>
  );
};

export default IndexPage;

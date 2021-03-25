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

          <div className="placeOrder">
            <div className="wrapper">
              <h2>Place an order</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
                eveniet incidunt expedita sapiente aperiam delectus eligendi
                ullam provident quis harum nostrum nesciunt inventore, ducimus
                odio minima iste, dolorem, alias id.
              </p>
              <form action="submit">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="email"></input>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" className="name"></input>
                <p>Choose your treats:</p>

                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    id="productName"
                    name="productName"
                    checked
                  ></input>
                  <label htmlFor="productName">ProductName</label>
                </div>

                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    id="productName2"
                    name="productName"
                    checked
                  ></input>
                  <label htmlFor="productName2">ProductName</label>
                </div>
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    id="productName3"
                    name="productName"
                    checked
                  ></input>
                  <label htmlFor="productName3">ProductName</label>
                </div>
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    id="productName4"
                    name="productName"
                    checked
                  ></input>
                  <label htmlFor="productName4">ProductName</label>
                </div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" className="message" rows="4" cols="50">
                  Type your message here. Be sure to include your address and
                  any notes.
                </textarea>
                <input type="submit" value="Place order"></input>
              </form>
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

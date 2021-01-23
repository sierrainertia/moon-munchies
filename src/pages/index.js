import * as React from "react";
import mrMunchie from "../images/logo.png";
import "../styles/index.scss";
import { Helmet } from "react-helmet";

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
      <header>
        <div className="wrapper">
          <div className="navBar">
            <nav>
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">About us</a>
                </li>
                <li>
                  <a href="">Products</a>
                </li>
                <li>
                  <a href="">Order now</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="hero">
            <h1>Moon Munchies</h1>
            <h2>Freeze-dried Treats</h2>
            <button>Order now</button>
            <div className="socialLinks">
              <ul>
                <li>
                  <a href="">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                {/* <li>
                  <a href="">
                    <i className="fab fa-instagram-square"></i>
                  </a>
                </li> */}
                <li>
                  <a href="">
                    <i className="far fa-envelope"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="wrapper">
          <div className="aboutUs">
            <img src={mrMunchie} alt="Moon munchies logo" />
            <div className="info">
              <h2>About us</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt odit recusandae assumenda? Suscipit ipsam et saepe
                facilis neque iure numquam ab ducimus impedit reiciendis? Eius
                asperiores culpa temporibus nesciunt blanditiis!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt odit recusandae assumenda? Suscipit ipsam et saepe
                facilis neque iure numquam ab ducimus impedit reiciendis? Eius
                asperiores culpa temporibus nesciunt blanditiis!
              </p>
            </div>
          </div>

          <div className="products">
            <h2>Products</h2>
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
            <h2>Place an order</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
              eveniet incidunt expedita sapiente aperiam delectus eligendi ullam
              provident quis harum nostrum nesciunt inventore, ducimus odio
              minima iste, dolorem, alias id.
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
                Type your message here. Be sure to include your address and any
                notes.
              </textarea>
              <input type="submit" value="Place order"></input>
            </form>
          </div>
        </div>
      </main>
      <footer>
        <p>Moon Munchies &copy; 2019</p>
        <p>
          Website created by
          <a href="https://sierracodes.online"> Sierra MacDonald</a>
        </p>
      </footer>
    </>
  );
};

export default IndexPage;

import React from "react";
import "./index.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section-left">
        <div className="footer__logo">
          <span className="moon-munchies">Moon Munchies</span>
          <span>Freeze-dried Snacks</span>
        </div>
        <section className="footer__links">
          <div>
            <header>Links</header>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About us</a>
              </li>
              <li>
                <a href="#products">Products</a>
              </li>
            </ul>
          </div>
          <div>
            <header>Follow us</header>
            <ul className="footer__social-links">
              <li>
                <a
                  href="https://www.facebook.com/MoonMunchies"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/moon_munchies_and_beyond?igshid=17yssd3t95xun"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="mailto:info@moonmunchies.ca" aria-label="Email">
                  <i className="far fa-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <section className="footer__copyright">
        <p className="copyright">
          Copyright &copy; Moon Munchies {new Date().getFullYear()}
        </p>
        <p>Located in Airdrie, Alberta</p>
        <p>
          Call or text us at: <a href="tel:+15875787328">(587) 578-7328</a>
        </p>
        <p>
          Website made with ❤️ by
          <a href="https://sierracodes.online"> Sierra MacDonald</a>
        </p>
      </section>
    </footer>
  );
};

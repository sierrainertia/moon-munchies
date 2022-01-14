import React, { useCallback, useEffect, useState } from "react";
import { useSiteUrl } from "../../hooks/use-site-url";
import mrMunchie from "../../images/logo.png";
import "./index.scss";

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen(!isMenuOpen), [isMenuOpen]);

  // As soon as the component loads, but never again, add some listeners
  useEffect(() => {
    const linksInMenu = document.querySelectorAll(".nav-bar a");

    linksInMenu.forEach((menuLink) => {
      menuLink.addEventListener("click", (e) => {
        const anchor = menuLink.getAttribute("href");
        if (anchor.startsWith("#")) {
          e.preventDefault();
          e.stopPropagation();

          // Smoothly scroll to the link
          try {
            const anchorLocation = document.querySelector(anchor);
            window.scroll({
              top: anchorLocation.offsetTop,
              behavior: "smooth",
            });
          } catch (_) {
            // noop
          }
        }
        setMenuOpen(false);
      });
    });
  }, []);

  // Do something whenever the menu's openness changes
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const { url } = useSiteUrl();

  return (
    <header className={`nav-bar ${isMenuOpen ? "nav-bar--open" : ""}`}>
      <div className="wrapper">
        <a href={url} className="nav-bar__logo">
          <img src={mrMunchie} alt="Moon munchies logo" />
        </a>
        <div className="nav-bar__items-wrapper">
          <nav>
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
          </nav>
          <ul className="nav-bar__social-links">
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
        <button
          className={`hamburger hamburger--collapse ${
            isMenuOpen ? "is-active" : ""
          }`}
          type="button"
          onClick={toggleMenu}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </header>
  );
};

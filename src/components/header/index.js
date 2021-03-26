import React from "react";
import mrMunchie from "../../images/logo.png";
import "./index.scss";

export const Header = () => {
  return (
    <header className="nav-bar">
      <div className="wrapper">
        <img
          src={mrMunchie}
          alt="Moon munchies logo"
          className="nav-bar__logo"
        />
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
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/moon_munchies_and_beyond?igshid=17yssd3t95xun"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="mailto:info@moonmunchies.ca">
                <i className="far fa-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

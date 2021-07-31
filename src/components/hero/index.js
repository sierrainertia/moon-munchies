import React from "react";
import heroImage from "../../images/hero-image.png";
import "./index.scss";

export const Hero = () => {
  return (
    <div className="hero" id="home">
      <div className="wrapper">
        <div className="hero__image">
          <img src={heroImage} />
        </div>
        <div className="hero__text">
          <h1>Freeze-dried Snacks</h1>
          <p>Flavours that will take you to the moon and beyond.</p>
          <a href="#products">Order Now</a>
        </div>
      </div>
    </div>
  );
};

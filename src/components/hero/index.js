import React from "react";
import "./index.scss";

export const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <div className="hero__image"></div>
        <div className="hero__text">
          <h1>Freeze-dried Treats</h1>
          <p>Flavour that will take you to the moon and beyond.</p>
          <button>Order Now</button>
        </div>
      </div>
    </div>
  );
};

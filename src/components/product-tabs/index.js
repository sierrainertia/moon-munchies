import React, { Component } from "react";
import "./tabs.scss";

const categoryProperNames = {
  "ice-cream": "Intergalactic Ice Cream",
  taffy: "Moon Taffy",
  candy: "Cosmic Candy",
  beyond: "And Beyond",
};

const categoryOrder = ["ice-cream", "taffy", "candy", "beyond"];

export class ProductTabs extends Component {
  render() {
    return (
      <>
        <div className="productBar">
          <ul>
            {this.props.categories
              .sort((a, b) => {
                return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
              })
              .map((category) => (
                <li key={category}>
                  <button
                    onClick={() => this.props.onCategorySelected(category)}
                    className={
                      this.props.selectedCategory === category ? "active" : ""
                    }
                  >
                    {categoryProperNames[category]}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="galleryImages"></div>
      </>
    );
  }
}

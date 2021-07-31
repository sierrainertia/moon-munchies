import React, { Component } from "react";
import "./tabs.scss";

const categoryProperNames = {
  desserts: "Desserts",
  taffy: "Moon Taffy",
  candy: "Cosmic Candy",
  beyond: "And Beyond",
};

const categoryOrder = ["taffy", "candy", "desserts", "beyond"];

export class ProductTabs extends Component {
  render() {
    return (
      <>
        <div className="productBar">
          <ul>
            {this.props.categories
              .filter((category) => category !== "null")
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
                    {categoryProperNames[category] || category}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  }
}

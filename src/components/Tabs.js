import React, { Component } from "react";
import "./tabs.scss";

export class Tabs extends Component {
  render() {
    return (
      <>
        <div className="productBar">
          <ul>
            <li>
              <button>Intergalatic Ice Cream</button>
            </li>
            <li>
              <button>Moon Taffy</button>
            </li>
            <li>
              <button>Cosmic Candy</button>
            </li>
            <li>
              <button>And Beyond</button>
            </li>
          </ul>
        </div>
        <div className="galleryImages"></div>
      </>
    );
  }
}

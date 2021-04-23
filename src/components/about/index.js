import React from "react";
import "./index.scss";

export const About = () => {
  return (
    <div className="aboutUs" id="about">
      <div className="wrapper">
        <div className="info">
          <h2>About us</h2>
          <p>
            {/* We’re a family run business with a mission to create powerful and
            unique food experiences. By freeze-drying */}
            Moon Munchies creates freeze-dried candy, fruits, and much more! By
            doing this we intensify the flavours and provides a whole new way to
            enjoy your snacks.
          </p>
          <p>Does your favourite confectionary send you to the dentist? </p>

          <p>
            Do grandma and grandpa&apos;s dentures pop out every time they take
            a bite of their delectable desserts?
          </p>
          <p>
            Worry no more! Moon Munchies freeze-dried treats melt in your mouth,
            so you can now enjoy all your sticky snacks with no fear!
          </p>
          <p>
            Ready to try flavours that are out of this world? Place an order
            today!
          </p>
        </div>
      </div>
    </div>
  );
};

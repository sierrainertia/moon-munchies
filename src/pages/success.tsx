import React, { useCallback, useLayoutEffect, useState } from "react";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";
import { SimplePageContents } from "../components/simple-page-contents";
import { Link } from "gatsby";
import { SEO } from "../components/seo";

const OrderSuccessPage = () => {
  const [width, height] = useWindowSize();
  const [startConfetti, setStartConfetti] = useState(false);
  const clearCart = useCallback(
    () => window.localStorage.removeItem("persist:root"),
    []
  );

  useLayoutEffect(() => {
    const handle = window.setTimeout(() => {
      setStartConfetti(true);
      clearCart();
    }, 1000); // Give the page a bit of time to load

    return (): void => window.clearTimeout(handle);
  }, [clearCart]);

  return (
    <>
      <SEO />
      <SimplePageContents title="Order Placed!">
        <p>
          Thank you for placing your order, someone will be in contact with you
          shortly. <Link to="/">Return to the main page</Link>.
        </p>
      </SimplePageContents>
      {startConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          initialVelocityX={2}
          initialVelocityY={10}
          confettiSource={{ x: 0, y: -20, w: width, h: 0 }}
          recycle={false}
        />
      )}
    </>
  );
};

export default OrderSuccessPage;

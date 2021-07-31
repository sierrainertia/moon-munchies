import React, { useLayoutEffect, useState } from "react";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";
import { SimplePageContents } from "../components/simple-page-contents";

const OrderSuccessPage = () => {
  const [width, height] = useWindowSize();
  const [startConfetti, setStartConfetti] = useState(false);

  useLayoutEffect(() => {
    const handle = window.setTimeout(() => {
      setStartConfetti(true);
    }, 1000); // Give the page a bit of time to load

    return () => clearTimeout(handle);
  }, []);

  return (
    <>
      <SimplePageContents title="Order Placed!">
        <p>
          Thank you for placing your order, someone will be in contact with you
          shortly.
        </p>
      </SimplePageContents>
      <Confetti
        width={width}
        height={height}
        run={startConfetti}
        numberOfPieces={500}
        initialVelocityX={2}
        initialVelocityY={10}
        confettiSource={{ x: 0, y: -20, w: width, h: 0 }}
        recycle={false}
      />
    </>
  );
};

export default OrderSuccessPage;

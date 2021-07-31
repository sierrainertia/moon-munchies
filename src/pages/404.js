import React from "react";
import { SimplePageContents } from "../components/simple-page-contents";

const OrderSuccessPage = () => {
  return (
    <>
      <SimplePageContents title="Page not found">
        <p>
          Maybe you can find what you're looking for on the{" "}
          <a href="/">home page</a>
        </p>
      </SimplePageContents>
    </>
  );
};

export default OrderSuccessPage;

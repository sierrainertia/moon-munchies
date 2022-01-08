import React from "react";
import "./index.scss";

export const SimplePageContents = ({
  title = "",
  children,
}: {
  title?: string;
  children: React.ReactChildren;
}) => {
  return (
    <div className="simple-page-contents">
      <h1 className="simple-page-contents__header">{title}</h1>
      <div className="simple-page-contents__body"> {children}</div>
    </div>
  );
};

import React, { useCallback } from "react";

export const AnchorLink = ({ children, href }) => {
  const goToAnchor = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      // Find the anchor on the page and scroll to it
      const el = document.querySelector(href);
      el.scrollIntoView({
        behavior: "smooth",
      });

      return false;
    },
    [href]
  );

  return (
    <a onClick={goToAnchor} href={href}>
      {children}
    </a>
  );
};

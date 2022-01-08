import React, { useCallback } from "react";

export const AnchorLink = ({ children, href }) => {
  const goToAnchor = useCallback(
    (e) => {
      // Find the anchor on the page and scroll to it
      try {
        const el = document.querySelector(href);
        el.scrollIntoView({
          behavior: "smooth",
        });

        e.stopPropagation();
        e.preventDefault();
      } catch (e) {
        // no-op if the element doesn't exist
      }
    },
    [href]
  );

  return (
    <a href={href} onClick={goToAnchor}>
      {children}
    </a>
  );
};

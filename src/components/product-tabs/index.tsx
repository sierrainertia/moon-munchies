import React from "react";
import useBreakpoint from "use-breakpoint";
import "./tabs.scss";

const categoryProperNames = {
  desserts: "Desserts",
  taffy: "Moon Taffy",
  candy: "Cosmic Candy",
  beyond: "And Beyond",
};

const categoryOrder = ["taffy", "candy", "desserts", "beyond"];

const BREAKPOINTS = { xs: 0, mobile: 500, tablet: 768, desktop: 1024 };

const CategoryItem = ({ category, selectedCategory, onCategorySelected }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");

  if (["xs", "mobile"].includes(breakpoint)) {
    return (
      <option value={category} selected={category === selectedCategory}>
        {categoryProperNames[category] || category}
      </option>
    );
  }

  return (
    <li>
      <button
        onClick={() => onCategorySelected(category)}
        className={selectedCategory === category ? "active" : ""}
      >
        {categoryProperNames[category] || category}
      </button>
    </li>
  );
};

const CategoryContainer = ({ children, onCategorySelected }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");

  if (["xs", "mobile"].includes(breakpoint)) {
    return (
      <>
        <label>Category:</label>
        <select onChange={(e) => onCategorySelected(e.target.value)}>
          {children}
        </select>
      </>
    );
  }

  return <ul>{children}</ul>;
};

export const ProductTabs = ({
  categories,
  selectedCategory,
  onCategorySelected,
}) => {
  return (
    <div className="productBar">
      <CategoryContainer onCategorySelected={onCategorySelected}>
        {categories
          .filter((category) => category !== "null")
          .sort((a, b) => {
            return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
          })
          .map((category) => (
            <CategoryItem
              key={category}
              onCategorySelected={onCategorySelected}
              category={category}
              selectedCategory={selectedCategory}
            />
          ))}
      </CategoryContainer>
    </div>
  );
};

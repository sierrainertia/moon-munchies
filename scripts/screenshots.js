#!/usr/bin/env node

/* global require, process */
const puppeteer = require("puppeteer");

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const BASE_URL = `http://localhost:8000`;
const PAGE_LIST = [
  {
    pageName: "home",
    path: "/",
  },
  { pageName: "success", path: "/success/" },
  {
    pageName: "cart",
    path: "/",
    setup: async (page) => {
      await page.evaluate(() => {
        const addToCartBtns = document.querySelectorAll(
          ".product-item__price-box button"
        );

        addToCartBtns[0]?.click();
        document.querySelectorAll(".cart-buttons button")?.[1]?.click();

        addToCartBtns[1]?.click();
        document.querySelector(".cart__checkout-button")?.click();
      });
    },
    screenshotConfig: {
      fullPage: false,
    },
  },
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const { path, pageName, setup, screenshotConfig } of PAGE_LIST) {
    console.log(`Taking screenshots of URL ${path}`);
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });
    await page.goto(`${BASE_URL}${path}`);
    await setup?.(page);
    await sleep(2000);
    await page.screenshot({
      path: `./screenshots/screenshot-${pageName}-desktop.png`, // lowercase it
      fullPage: true,
      ...screenshotConfig,
    });
    await page.setViewport({
      width: 480,
      height: 800,
      deviceScaleFactor: 1,
    });
    await page.screenshot({
      path: `./screenshots/screenshot-${pageName}-mobile.png`,
      fullPage: true,
      ...screenshotConfig,
    });
  }

  await browser.close();

  console.log("Done!");
  process.exit(0);
})();

import React, { useRef } from "react";
import Helmet from "react-helmet";
import ColorFlow from "colorflow";
import useAnimationFrame from "use-animation-frame";
import { useSiteUrl } from "../../hooks/use-site-url";

export const SEO = () => {
  const colorFlow = useRef(
    new ColorFlow({
      background: ["#d5d8ff", "#febcd7", "#fff296", "#90ede0"],
      time: 20,
    })
  );
  const loaded = useRef<boolean>(false);
  const colorCyclingEl = useRef<HTMLDivElement | null>(null);
  const metaThemeEl = useRef<HTMLMetaElement | null>(null);

  const { url } = useSiteUrl();

  useAnimationFrame(() => {
    if (loaded.current) {
      metaThemeEl.current.content = window.getComputedStyle(
        colorCyclingEl.current
      ).backgroundColor;
    } else {
      const el = document.head.querySelector(
        'meta[name="theme-color"]'
      ) as HTMLMetaElement;
      if (el) {
        metaThemeEl.current = el;
        loaded.current = true;
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta name="theme-color" content="white" />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
      </Helmet>
      <div ref={colorCyclingEl} className={colorFlow.current.thisClass} />
    </>
  );
};

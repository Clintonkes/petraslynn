import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { entryImages, photoSrcSet, photoUrl } from "./src/config/images";

const PLACEHOLDER = "<!--entry-image-preload-->";

// The site renders client side, so the browser can't discover a page's photos
// until the JS bundle has downloaded and React has mounted. This inlines a
// tiny script into index.html that preloads the top photo for the route
// being opened, at the width this screen needs, so it downloads in parallel
// with the bundle instead of after it.
function preloadEntryImages(): Plugin {
  return {
    name: "preload-entry-images",
    transformIndexHtml(html) {
      if (!html.includes(PLACEHOLDER)) {
        throw new Error(`index.html is missing the ${PLACEHOLDER} placeholder`);
      }
      // Resolved here so the inline script stays tiny: route -> [src, srcset, sizes].
      const map = Object.fromEntries(
        Object.entries(entryImages).map(([route, { url, sizes }]) => [
          route,
          [photoUrl(url, 1440), photoSrcSet(url), sizes],
        ]),
      );
      const script =
        `(function(){var m=${JSON.stringify(map)},b=new URL(document.baseURI).pathname,p=location.pathname;` +
        `if(p.indexOf(b)===0)p='/'+p.slice(b.length);p=p.replace(/\\/+$/,'')||'/';` +
        `var u=m[p]||m['/'],l=document.createElement('link');l.rel='preload';l.as='image';` +
        `l.href=u[0];l.setAttribute('imagesrcset',u[1]);l.setAttribute('imagesizes',u[2]);` +
        `l.setAttribute('fetchpriority','high');document.head.appendChild(l);})();`;
      return html.replace(PLACEHOLDER, `<script>${script}</script>`);
    },
  };
}

export default defineConfig({
  // Relative asset paths: index.html sets <base> at runtime to wherever the
  // site is served from (the repo sub-path on github.io, "/" on a domain).
  base: "./",
  plugins: [react(), preloadEntryImages()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { allImages, photoSrcSet, photoUrl } from "@/config/images";

// Once the first page has fully loaded, fetch every other photo while the
// browser is idle, so later pages show their images the moment they open.
function warmImageCache() {
  const start = () => {
    for (const { url, sizes } of allImages) {
      const img = new Image();
      img.decoding = "async";
      // Same srcset/sizes as the rendered <Photo>, so the browser picks the
      // same width and the cached copy is the one the page will use.
      img.sizes = sizes;
      img.srcset = photoSrcSet(url);
      img.src = photoUrl(url, 1440);
    }
  };
  const idle = () =>
    "requestIdleCallback" in window ? window.requestIdleCallback(start) : setTimeout(start, 200);
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
}

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(warmImageCache, []);

  return (
    <div className="min-h-screen bg-pine-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

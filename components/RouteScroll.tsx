"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToHash, scrollToTop } from "./SiteLink";

gsap.registerPlugin(ScrollTrigger);

/* after every route change (and on the first load), wait for the fonts
   and two frames so the pinned sections have measured, then refresh
   scrolltrigger and put the page where the url says: on its hash, or at
   the top. back/forward is left to the browser's own restoration.
   rendered after {children} in the layout so it runs last. */
export default function RouteScroll() {
  const pathname = usePathname();
  const popped = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onPop = () => {
      popped.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const wasPop = popped.current;
    const isFirst = first.current;
    popped.current = false;
    first.current = false;

    let cancelled = false;
    let raf = 0;
    const seat = () => {
      if (cancelled) return;
      ScrollTrigger.refresh();
      const hash = window.location.hash;
      if (hash.length > 1 && scrollToHash(hash, true)) {
        // the pins re-measure once the page has moved; settle a second time
        raf = requestAnimationFrame(() => {
          if (cancelled) return;
          ScrollTrigger.refresh();
          scrollToHash(hash, true);
        });
        return;
      }
      if (!wasPop && !isFirst) scrollToTop(true);
    };
    document.fonts.ready.then(() => {
      if (cancelled) return;
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(seat);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}

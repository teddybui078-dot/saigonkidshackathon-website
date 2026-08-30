"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/* one link for the whole site. on the page it points at, a hash link
   glides there with lenis (clear of the fixed navbar); from any other
   page it's a normal next/link navigation, and RouteScroll seats the
   hash once the new page has mounted. */

export const NAV_OFFSET = -72;

/* where an element sits on the page in layout terms — offsetTop up the
   chain, so an entrance transform mid-flight doesn't skew the target */
function pageTop(el: HTMLElement) {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

/* scroll to an element by hash. returns false if it isn't on this page.
   lenis measures the page on a debounced resize observer and clamps every
   scroll to that (possibly stale) limit, so re-measure first and hand it
   the exact number we mean */
export function scrollToHash(hash: string, immediate = false) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return false;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.resize();
    const y = pageTop(el) + NAV_OFFSET;
    lenis.scrollTo(Math.max(0, y), { immediate });
  } else {
    el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }
  return true;
}

export function scrollToTop(immediate = false) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}

function splitHref(href: string): [path: string, hash: string] {
  const i = href.indexOf("#");
  return i < 0 ? [href, ""] : [href.slice(0, i), href.slice(i)];
}

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export default function SiteLink({ href, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const [path, hash] = splitHref(href);
  const samePage = path === "" || path === pathname;

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !samePage) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (hash) {
      if (scrollToHash(hash)) e.preventDefault();
    } else {
      e.preventDefault();
      scrollToTop();
    }
  };

  // hash links opt out of next's own scrolling: on the same page lenis has
  // it, across pages RouteScroll waits for the layout to settle first
  return <Link href={href} onClick={handle} scroll={hash ? false : undefined} {...rest} />;
}

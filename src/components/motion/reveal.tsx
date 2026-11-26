"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

function useReveal<Element extends HTMLElement>() {
  const ref = useRef<Element>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible || reducedMotion) return;

    let observer: IntersectionObserver | undefined;
    let observedAmount = -1;

    function observe() {
      if (!element) return;
      const height = element.getBoundingClientRect().height;
      if (!height) return;

      // Tall sections reveal once they occupy 40% of the viewport.
      const amount = 0.4 * Math.min(1, window.innerHeight / height);
      if (amount === observedAmount) return;
      observedAmount = amount;
      observer?.disconnect();
      observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio >= amount) setVisible(true);
      }, { threshold: amount });
      observer.observe(element);
    }

    observe();
    const resize = new ResizeObserver(observe);
    resize.observe(element);
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      resize.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [reducedMotion, visible]);

  return {
    ref,
    "data-scroll-reveal": "",
    initial: { opacity: 0, y: 24 },
    animate: visible || reducedMotion ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.7, ease: "easeOut" as const },
    onFocusCapture: () => setVisible(true),
  };
}

export function RevealSection(props: HTMLMotionProps<"section">) {
  const reveal = useReveal<HTMLElement>();
  return <motion.section {...props} {...reveal} />;
}

export function RevealContent(props: HTMLMotionProps<"div">) {
  const reveal = useReveal<HTMLDivElement>();
  return <motion.div {...props} {...reveal} />;
}

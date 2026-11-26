"use client";

import Link from "next/link";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./layout.module.css";

const links = [
  { id: "about", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contack" },
];

function NavPill({ activeSection, onNavigate }: { activeSection: string | null; onNavigate: () => void }) {
  const present = useIsPresent();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.floatingNav}
      initial={false}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: reducedMotion ? 0 : 0.18 }}
      inert={!present}
    >
      <div className={styles.floatingSurface} aria-hidden="true" />
      <nav className={styles.floatingLinks} aria-label="빠른 메뉴">
        {links.map(({ id, label }) => (
          <Link
            key={id}
            href={`/#${id}`}
            aria-current={id === activeSection ? "location" : undefined}
            onNavigate={onNavigate}
          >
            {label}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigationTime = useRef(0);
  const visibility = useRef(false);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const sections = links.map(({ id }) => document.getElementById(id)).reverse();

    let turningPoint = Math.max(0, window.scrollY);

    function updateActiveSection(position: number) {
      const viewportHeight = window.innerHeight;
      const atPageEnd = position + viewportHeight >= document.documentElement.scrollHeight - 2;
      const active = atPageEnd
        ? sections[0]
        : sections.find((section) => section && section.getBoundingClientRect().top <= viewportHeight / 2);
      setActiveSection(active?.id ?? null);
    }

    function onScroll() {
      const position = Math.max(0, window.scrollY);
      if (!header || header.getBoundingClientRect().bottom > 0 || Date.now() - navigationTime.current < 250) {
        turningPoint = position;
        if (visibility.current) {
          visibility.current = false;
          setVisible(false);
        }
        return;
      }

      if (visibility.current) {
        turningPoint = Math.min(turningPoint, position);
        if (position - turningPoint < 12) {
          updateActiveSection(position);
          return;
        }
      } else {
        turningPoint = Math.max(turningPoint, position);
        if (turningPoint - position < 50) return;
      }

      turningPoint = position;
      visibility.current = !visibility.current;
      if (visibility.current) updateActiveSection(position);
      setVisible(visibility.current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function handleNavigate() {
    navigationTime.current = Date.now();
    visibility.current = false;
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && <NavPill activeSection={activeSection} onNavigate={handleNavigate} />}
    </AnimatePresence>
  );
}

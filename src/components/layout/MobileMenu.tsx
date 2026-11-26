"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import styles from "./layout.module.css";

export default function MobileMenu({ items }: { items: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const Icon = open ? LuX : LuMenu;

  return (
    <div
      className={styles.mobileMenu}
      data-open={open || undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        className={styles.mobileToggle}
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-links"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setOpen((current) => !current)}
      >
        <Icon aria-hidden="true" />
      </button>
      <ul className={styles.mobileLinks} id="mobile-nav-links" inert={!open}>
        {items.map((label) => (
          <li key={label}>
            <Link href={`/#${label.toLowerCase()}`} onNavigate={() => setOpen(false)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

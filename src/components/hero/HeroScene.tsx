"use client";

import { useEffect, useRef } from "react";
import styles from "./hero.module.css";

export default function HeroScene() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    let generation = 0;

    function update() {
      const request = ++generation;
      dispose?.();
      dispose = undefined;
      if (preference.matches) return;

      void import("./sculpture").then(({ mountSculpture }) => {
        if (request === generation && stage) {
          dispose = mountSculpture(stage);
        }
      }).catch(() => {
        // Keep the static droplet when the 3D scene cannot start.
      });
    }

    update();
    preference.addEventListener("change", update);
    return () => {
      generation++;
      dispose?.();
      preference.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.scene} aria-hidden="true">
      <div className={styles.dropletFallback} />
    </div>
  );
}

import type { ReactNode } from "react";
import styles from "./layout.module.css";

export default function Container({
  children,
  size = "content",
}: {
  children: ReactNode;
  size?: "content" | "gnb";
}) {
  return (
    <div className={size === "gnb" ? styles.gnbContainer : styles.container}>
      {children}
    </div>
  );
}

"use client";

import { personalProjects } from "@/components/portfolio/personalProjects";
import styles from "./layout.module.css";

export default function PersonalProjectSelect() {
  return (
    <select
      className={styles.footerSelect}
      aria-label="개인 프로젝트 새 탭으로 열기"
      defaultValue=""
      onChange={(event) => {
        const select = event.currentTarget;
        const project = personalProjects.find(({ id }) => id === select.value);
        if (!project) return;

        window.open(project.url, "_blank", "noopener,noreferrer");
        select.value = "";
      }}
    >
      <option value="">--- 개인 프로젝트 ---</option>
      {personalProjects.map(({ id, name }) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  );
}

"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type MouseEvent } from "react";
import { LuArrowUpRight, LuX } from "react-icons/lu";
import styles from "./portfolio.module.css";

import { projects, type Project } from "./projects";

const slideStart = 0.26;
const slideEnd = 0.97;
const conceptNotice = "AI를 사용하여 제작된 가상의 프로젝트 입니다";

function ProjectPreview({ project }: { project: Project }) {
  const src = `/images/projects/${project.id}/thumbnail.webp`;

  return (
    <span className={styles.preview} data-app-preview={project.id === "inmedic-app" || undefined}>
      <Image src={src} alt="" fill unoptimized />
      <span className={styles.previewBlur} aria-hidden="true">
        <Image src={src} alt="" fill unoptimized />
      </span>
    </span>
  );
}

function ProjectGallery({ project, screens }: {
  project: Project;
  screens: Project["sections"][number]["screens"];
}) {
  const isApp = project.id === "inmedic-app";

  return (
    <div className={styles.gallery} data-mobile-screens={isApp || undefined}>
      {screens.map(([file, caption, width, height]) => {
        const src = `/images/projects/${project.id}/${file}.webp`;
        return (
          <figure key={file} className={isApp ? styles.portrait : undefined}>
            <a href={src} target="_blank" rel="noopener" aria-label={`${caption} 확대 보기 (새 탭)`}>
              <Image
                src={src}
                alt={caption}
                width={width}
                height={height}
                quality={90}
                sizes={isApp ? "(max-width: 30rem) 75vw, 280px" : "(max-width: 60rem) 90vw, 850px"}
                unoptimized={project.concept}
              />
            </a>
            <figcaption>{caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  entry,
  progress,
  onOpen,
  onFocus,
}: {
  project: Project;
  index: number;
  entry: MotionValue<number>;
  progress: MotionValue<number>;
  onOpen: () => void;
  onFocus: (event: FocusEvent<HTMLButtonElement>) => void;
}) {
  const opacity = useTransform(() => {
    if (index === 0) {
      const reveal = (entry.get() - 0.86) / 0.32 + progress.get() / 0.12;
      return Math.min(1, Math.max(0, reveal));
    }
    if (index >= 3) return 1;
    const start = index * 0.045;
    return Math.min(1, Math.max(0, (progress.get() - start) / 0.16));
  });
  const y = useTransform(opacity, [0, 1], [24, 0]);
  const pointerEvents = useTransform(opacity, (value) => value > 0.1 ? "auto" : "none");

  return (
    <motion.li className={styles.card} style={{ opacity, y, pointerEvents }}>
      <button
        className={styles.cardButton}
        type="button"
        aria-haspopup="dialog"
        aria-label={`${project.name} 상세 보기${project.concept ? ` · ${conceptNotice}` : ""}`}
        onClick={onOpen}
        onFocus={onFocus}
      >
        <ProjectPreview project={project} />
        <span className={styles.cardCopy}>
          <span className={styles.cardLabels}>
            <strong>{project.name}</strong>
            <span>{project.type}</span>
            <span className={styles.highlights}>{project.highlights}</span>
            {project.concept && <span className={styles.conceptNotice}>{conceptNotice}</span>}
          </span>
          <LuArrowUpRight aria-hidden="true" />
        </span>
      </button>
    </motion.li>
  );
}

export default function Portfolio() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const trackViewport = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogBody = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const { scrollYProgress: entry } = useScroll({
    target: section,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: progress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const backgroundColor = useTransform(entry, [0.4, 1], ["#f5f7fb", "#08080a"]);
  const color = useTransform(entry, [0.4, 1], ["#171717", "#ffffff"]);
  const distance = useTransform(progress, [slideStart, slideEnd], [0, -1]);
  const x = useMotionTemplate`calc(${distance} * var(--track-travel))`;

  useEffect(() => {
    const detail = dialog.current;
    if (selected && detail && !detail.open) {
      detail.showModal();
      dialogBody.current?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [selected]);

  function revealFocusedCard(event: FocusEvent<HTMLButtonElement>, index: number) {
    if (!event.currentTarget.matches(":focus-visible") || !section.current || !stage.current || !trackViewport.current) return;
    if (getComputedStyle(stage.current).position !== "sticky") return;

    const card = event.currentTarget.getBoundingClientRect();
    const viewport = trackViewport.current.getBoundingClientRect();
    const visible = event.currentTarget.parentElement?.style.opacity === "1";
    if (visible && card.left >= viewport.left && card.right <= viewport.right &&
        card.top >= 0 && card.bottom <= window.innerHeight) return;

    const start = window.scrollY + section.current.getBoundingClientRect().top;
    const scrollable = section.current.offsetHeight - window.innerHeight;
    const cardProgress = slideStart + (slideEnd - slideStart) * (index / (projects.length - 1));
    window.scrollTo({ top: start + scrollable * cardProgress, behavior: "instant" });
  }

  function closeFromBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      event.currentTarget.close();
    }
  }

  return (
    <section
      ref={section}
      className={styles.section}
      id="portfolio"
      aria-labelledby="portfolio-title"
      style={{ "--project-count": projects.length } as CSSProperties}
    >
      <motion.div ref={stage} className={styles.stage} style={{ backgroundColor, color }}>
        <div className={styles.content}>
          <header className={styles.heading}>
            <h2 id="portfolio-title">Portfolio</h2>
          </header>
          <div className={styles.trackViewport} ref={trackViewport}>
            <motion.ol className={styles.track} style={{ x }}>
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={index}
                  entry={entry}
                  progress={progress}
                  onOpen={() => setSelected(project)}
                  onFocus={(event) => revealFocusedCard(event, index)}
                />
              ))}
            </motion.ol>
          </div>
        </div>
      </motion.div>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="portfolio-detail-title"
        onClick={closeFromBackdrop}
        onClose={() => setSelected(null)}
      >
        <header className={styles.dialogBar}>
          <p>프로젝트 상세</p>
          <button
            className={styles.close}
            type="button"
            aria-label="프로젝트 상세 닫기"
            autoFocus
            onClick={() => dialog.current?.close()}
          >
            <LuX aria-hidden="true" />
          </button>
        </header>
        <div
          ref={dialogBody}
          className={styles.dialogBody}
          tabIndex={0}
          role="region"
          aria-label="프로젝트 상세 내용"
        >
          {selected && (
            <>
              <p className={styles.detailType}>{selected.type}</p>
              <h3 id="portfolio-detail-title">{selected.name}</h3>
              <p className={styles.summary}>{selected.summary}</p>
              <section className={styles.stack}>
                <h4>사용 기술</h4>
                <ul>
                  {selected.stack.map(([technology, usage]) => (
                    <li key={technology}>
                      <strong>{technology}</strong>
                      <p>{usage}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <p className={styles.zoomHint}>이미지를 선택하면 새 탭에서 고해상도로 볼 수 있습니다.</p>
              <div className={styles.detailSections}>
                {selected.sections.map((section) => {
                  const { title, description, interaction, screens } = section;
                  return (
                    <section key={title} className={styles.detailSection}>
                      <h4>{title}</h4>
                      <p>{description}</p>
                      <p>{interaction}</p>
                      <ProjectGallery project={selected} screens={screens} />
                    </section>
                  );
                })}
              </div>
              {selected.concept && <p className={`${styles.conceptNotice} ${styles.detailNotice}`}>{conceptNotice}</p>}
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}

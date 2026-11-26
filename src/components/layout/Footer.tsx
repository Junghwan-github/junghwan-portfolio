import { LuArrowUp } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import Container from "./Container";
import PersonalProjectSelect from "./PersonalProjectSelect";
import styles from "./layout.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerMain}>
          <div>
            <strong className={styles.footerName}>JUNGHWAN PARK</strong>
            <p>Full-stack Developer</p>
          </div>
          <nav className={styles.footerLinks} aria-label="푸터 메뉴">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className={styles.footerMeta}>
          <small>© JUNGHWAN PARK</small>
          <div className={styles.footerUtilities}>
            <a href="mailto:jungie2@naver.com">jungie2@naver.com</a>
            <a className={styles.footerGithub} href="https://github.com/Junghwan-github" target="_blank" rel="noopener noreferrer" aria-label="GitHub 프로필 (새 탭)">
              <SiGithub aria-hidden="true" />
            </a>
            <PersonalProjectSelect />
          </div>
        </div>
      </Container>
      <a className={styles.backToTop} href="#top" aria-label="맨 위로" title="맨 위로">
        <LuArrowUp aria-hidden="true" />
      </a>
    </footer>
  );
}

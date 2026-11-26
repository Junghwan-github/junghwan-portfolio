import { SlArrowRight } from "react-icons/sl";
import { RevealContent } from "@/components/motion/reveal";
import HeroScene from "./HeroScene";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroScene />
      <div className={styles.content}>
        <RevealContent className={styles.copy}>
          <h1 id="hero-title">
            <span>JUNGHWAN&apos;s</span>{" "}
            <span>FULL-STACK DEVELOPER</span>{" "}
            <span className={styles.titleAccent}>PORTFOLIO.</span>
          </h1>
          <a className="action-button" href="#contact">
            Contack <SlArrowRight aria-hidden="true" size="0.75em" />
          </a>
        </RevealContent>
      </div>
    </section>
  );
}

import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";
import Container from "./Container";
import FloatingNav from "./FloatingNav";
import MobileMenu from "./MobileMenu";
import styles from "./layout.module.css";

const menu = ["About", "Skills", "Portfolio"];

export default function Header() {
  return (
    <>
      <header className={styles.header} id="site-header">
        <Container size="gnb">
          <nav className={styles.nav} aria-label="주 메뉴">
            <Link className={styles.brand} href="/#top">
              JUNGHWAN PARK
            </Link>
            <ul className={styles.menu}>
              {menu.map((label) => (
                <li key={label}>
                  <Link href={`/#${label.toLowerCase()}`}>{label}</Link>
                </li>
              ))}
            </ul>
            <Link className={styles.inquiry} href="/#contact">
              Contack <SlArrowRight aria-hidden="true" size="0.75em" />
            </Link>
            <MobileMenu items={[...menu, "Contact"]} />
          </nav>
        </Container>
      </header>
      <FloatingNav />
    </>
  );
}

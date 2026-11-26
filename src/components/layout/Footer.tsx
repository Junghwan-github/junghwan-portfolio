import Container from "./Container";
import styles from "./layout.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <small>© JUNGHWAN PARK</small>
      </Container>
    </footer>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { LuMail } from "react-icons/lu";
import { SlArrowRight } from "react-icons/sl";
import Container from "@/components/layout/Container";
import { RevealContent } from "@/components/motion/reveal";
import styles from "./contact.module.css";

const email = "jungie2@naver.com";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function sendEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setSending(true);
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const result = await response.json();
        setFeedback(result.message);
        return;
      }

      form.reset();
      setFeedback("메일을 보냈습니다.");
    } catch {
      setFeedback("메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <Container>
        <h2 className={styles.heading} id="contact-title">Contact</h2>
        <RevealContent className={styles.layout}>
          <div className={styles.intro}>
            <h3>함께 만들고 싶은<br />프로젝트가 있나요?</h3>
            <a href={`mailto:${email}`}>
              <LuMail aria-hidden="true" /> {email}
            </a>
          </div>
          <form className={styles.form} onSubmit={sendEmail}>
            <fieldset className={styles.fields} disabled={sending}>
              <div className={styles.identity}>
                <label>
                  이름
                  <input name="name" autoComplete="name" maxLength={80} pattern={/.*\S.*/.source} required />
                </label>
                <label>
                  이메일
                  <input name="email" type="email" autoComplete="email" maxLength={254} required />
                </label>
              </div>
              <label>
                제목
                <input name="subject" maxLength={120} pattern={/.*\S.*/.source} required />
              </label>
              <label>
                문의 내용
                <textarea name="message" rows={6} maxLength={2500} required />
              </label>
            </fieldset>
            <div className={styles.actions}>
              <p role="status">{feedback}</p>
              <button className={`action-button ${styles.submit}`} type="submit" disabled={sending}>
                {sending ? "보내는 중…" : "메일 보내기"} <SlArrowRight aria-hidden="true" size="0.75em" />
              </button>
            </div>
          </form>
        </RevealContent>
      </Container>
    </section>
  );
}

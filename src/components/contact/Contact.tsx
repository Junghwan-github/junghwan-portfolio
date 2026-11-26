"use client";

import type { FormEvent } from "react";
import { LuArrowUpRight, LuMail } from "react-icons/lu";
import Container from "@/components/layout/Container";
import { RevealContent } from "@/components/motion/reveal";
import styles from "./contact.module.css";

const email = "jungie2@naver.com";

export default function Contact() {
  function composeEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const replyEmail = String(form.get("email")).trim();
    const message = String(form.get("message")).trim();
    const subject = encodeURIComponent(`포트폴리오 문의 · ${name}`);
    const body = encodeURIComponent(`이름: ${name}\r\n이메일: ${replyEmail}\r\n\r\n${message.replace(/\r?\n/g, "\r\n")}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
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
          <form className={styles.form} onSubmit={composeEmail} aria-describedby="contact-form-hint">
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
              문의 내용
              <textarea name="message" rows={6} maxLength={2500} required />
            </label>
            <div className={styles.actions}>
              <button className="action-button" type="submit">
                메일 작성하기 <LuArrowUpRight aria-hidden="true" />
              </button>
              <p id="contact-form-hint">입력한 내용은 기본 메일 앱에서 확인하고 보낼 수 있어요.</p>
            </div>
          </form>
        </RevealContent>
      </Container>
    </section>
  );
}

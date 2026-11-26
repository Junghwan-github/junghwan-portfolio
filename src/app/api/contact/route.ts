import nodemailer from "nodemailer";

export const runtime = "nodejs";

const recipient = "jungie2@naver.com";
const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const email = typeof data?.email === "string" ? data.email.trim() : "";
  const subject = typeof data?.subject === "string" ? data.subject.trim() : "";
  const message = typeof data?.message === "string" ? data.message.trim() : "";

  if (!name || name.length > 80 || email.length > 254 || !emailPattern.test(email) ||
      !subject || subject.length > 120 || /[\r\n]/.test(subject) || !message || message.length > 2500) {
    return Response.json({ message: "이름, 이메일, 제목과 문의 내용을 확인해 주세요." }, { status: 400 });
  }

  const sender = process.env.CONTACT_SMTP_USER?.trim();
  const password = process.env.CONTACT_SMTP_PASSWORD;
  if (!sender || !emailPattern.test(sender) || !password) {
    return Response.json({ message: "현재 메일 발송을 사용할 수 없습니다." }, { status: 503 });
  }

  const host = process.env.CONTACT_SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.CONTACT_SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: sender, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    await transport.sendMail({
      from: sender,
      to: recipient,
      replyTo: email,
      subject,
      text: `이름: ${name}\n이메일: ${email}\n\n${message}`,
    });
    return Response.json({ sent: true });
  } catch {
    return Response.json({ message: "메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 });
  }
}

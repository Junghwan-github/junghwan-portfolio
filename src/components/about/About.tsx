import Image from "next/image";
import {
  LuBriefcaseBusiness,
  LuCodeXml,
  LuGraduationCap,
  LuUserRound,
} from "react-icons/lu";
import Container from "@/components/layout/Container";
import { RevealContent } from "@/components/motion/reveal";
import styles from "./about.module.css";

const strengths = [
  ["아이디어를 작동하는 화면으로", "필요한 기능과 사용 흐름을 정리해 직접 써볼 수 있는 화면으로 구현합니다."],
  ["화면부터 서버까지", "사용자가 보는 화면과 그 뒤의 API, 데이터 구조를 함께 설계합니다."],
  ["웹과 모바일을 함께", "웹과 React Native 앱에서 화면 크기와 사용 방식에 맞게 인터페이스를 구현합니다."],
];

const careers = [
  {
    period: "2024. 10. ~ 2025. 10.",
    organization: "국제화 연구소",
    role: "웹·앱 개발팀장",
    responsibilities: [
      "INMEDIC 공식 웹사이트 병원 후기 작성 기능의 화면 퍼블리싱과 백엔드 개발",
      "React Native 앱 전체 화면 퍼블리싱과 Node.js 백엔드 개발",
      "실시간 통신, 푸시 알림, 데이터 저장을 위한 백엔드 기능 개발",
    ],
    stack: [
      ["웹·앱", "Next.js, React Native"],
      ["백엔드", "Node.js"],
      ["실시간 통신·알림", "WebRTC, WebSocket, Firebase Cloud Messaging"],
      ["데이터·캐시", "MySQL, MongoDB, Redis"],
      ["인프라·형상 관리", "AWS, Git"],
    ],
  },
  {
    period: "2023. 08. ~ 2024. 02.",
    organization: "영남인재교육원",
    role: "교육 과정 팀 프로젝트 PM",
    responsibilities: [
      "프로젝트 전체 UI 디자인과 프론트엔드 퍼블리싱·개발",
      "Spring Boot 기반 블로그 백엔드 구현 및 데이터베이스 작업",
      "배포를 위한 Linux 서버 환경 설정",
    ],
    stack: [
      ["프론트엔드", "JSP, CSS, JavaScript, jQuery"],
      ["백엔드", "Spring Boot"],
      ["배포·형상 관리", "Linux, Git"],
    ],
  },
];

export default function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <Container>
        <h2 className={styles.heading} id="about-title">About Me</h2>
        <RevealContent className={styles.feature}>
          <div className={styles.featureCopy}>
            <p className={styles.role}>Full-stack Developer</p>
            <h3 className={styles.intro}>
              화면부터 서버까지, <span>서비스의 흐름을 잇습니다.</span>
            </h3>
            <p className={styles.description}>
              풀스택 개발자 박정환입니다. 웹과 모바일에서 사용자가 기능을 쉽게 쓸 수 있도록 화면을 만들고,
              그 화면을 뒷받침하는 API와 데이터 구조를 함께 설계합니다.
            </p>
          </div>
          <div className={styles.portraitFrame}>
            <Image
              className={styles.portrait}
              src="/images/about-clay-portrait-white.webp"
              alt="둥근 금테 안경을 쓴 박정환의 점토 스타일 캐릭터"
              width={900}
              height={900}
              sizes="(max-width: 48rem) 192px, (max-width: 65rem) 30vw, 320px"
            />
          </div>
        </RevealContent>
        <RevealContent>
          <section className={styles.detailRow} aria-labelledby="about-strengths">
            <h3 className={styles.detailTitle} id="about-strengths">
              <LuCodeXml aria-hidden="true" /> 제가 잘하는 일
            </h3>
            <ul className={styles.strengths}>
              {strengths.map(([title, description]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.detailRow} aria-labelledby="about-profile">
            <h3 className={styles.detailTitle} id="about-profile">
              <LuUserRound aria-hidden="true" /> 프로필
            </h3>
            <dl className={styles.profile}>
              <div><dt>Email</dt><dd><a href="mailto:jungie2@naver.com">jungie2@naver.com</a></dd></div>
              <div><dt>GitHub</dt><dd><a href="https://github.com/Junghwan-github">Junghwan-github</a></dd></div>
              <div><dt>생년월일</dt><dd><time dateTime="1985-06-25">1985년 6월 25일</time></dd></div>
              <div><dt>성별</dt><dd>남성</dd></div>
              <div><dt>거주지</dt><dd>대구</dd></div>
            </dl>
          </section>
          <section className={styles.detailRow} aria-labelledby="about-career">
            <h3 className={styles.detailTitle} id="about-career">
              <LuBriefcaseBusiness aria-hidden="true" /> 경력
            </h3>
            <ol className={styles.historyList}>
              {careers.map(({ period, organization, role, responsibilities, stack }) => (
                <li className={styles.historyEntry} key={organization}>
                  <p className={styles.period}>{period}</p>
                  <h4>{organization}</h4>
                  <p className={styles.entryRole}>{role}</p>
                  <ul className={styles.responsibilities}>
                    {responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                  <dl className={styles.stack}>
                    {stack.map(([category, technologies]) => (
                      <div key={category}>
                        <dt>{category}</dt>
                        <dd>{technologies}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ol>
          </section>
          <section className={styles.detailRow} aria-labelledby="about-education">
            <h3 className={styles.detailTitle} id="about-education">
              <LuGraduationCap aria-hidden="true" /> 교육
            </h3>
            <div className={styles.historyEntry}>
              <p className={styles.period}>2023. 02. ~ 2024. 02.</p>
              <h4>영남인재교육원</h4>
              <p className={styles.entryRole}>Java / Spring Boot 웹개발자 과정 수료</p>
            </div>
          </section>
        </RevealContent>
      </Container>
    </section>
  );
}

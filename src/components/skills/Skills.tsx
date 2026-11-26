import { FaAws } from "react-icons/fa";
import { LuCloud, LuDatabase, LuPanelsTopLeft, LuServer } from "react-icons/lu";
import {
  SiDocker,
  SiGit,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import { RevealContent } from "@/components/motion/reveal";
import Container from "@/components/layout/Container";
import styles from "./skills.module.css";

const groups = [
  {
    title: "Frontend",
    icon: LuPanelsTopLeft,
    skills: [
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178c6",
        level: 75,
        usage: "컴포넌트 props와 API 응답에 타입을 정의해 화면과 서버 사이의 데이터 구조를 명확하게 관리합니다.",
      },
      {
        name: "React",
        icon: SiReact,
        color: "#087ea4",
        level: 85,
        usage: "화면을 재사용 가능한 컴포넌트로 나누고, 상태와 이벤트를 연결해 폼과 인터랙션을 구현합니다.",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "#171717",
        level: 80,
        usage: "페이지와 레이아웃을 구성하고, INMEDIC 웹의 병원 후기 작성 화면처럼 입력과 제출이 이어지는 흐름을 구현합니다.",
      },
    ],
  },
  {
    title: "Backend",
    icon: LuServer,
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "#417e38",
        level: 80,
        usage: "앱에서 호출하는 API를 구현하고, 실시간 통신과 푸시 알림에 필요한 서버 로직을 연결합니다.",
      },
      {
        name: "Spring Boot",
        icon: SiSpringboot,
        color: "#58972f",
        level: 70,
        usage: "팀 프로젝트에서 블로그 백엔드를 구현하고, 요청 처리와 데이터베이스 작업을 연결했습니다.",
      },
    ],
  },
  {
    title: "DevOps",
    icon: LuCloud,
    skills: [
      {
        name: "AWS",
        icon: FaAws,
        color: "#232f3e",
        level: 65,
        usage: "웹·앱 프로젝트에서 서버를 실행하는 클라우드 인프라로 활용합니다.",
      },
      {
        name: "Linux",
        icon: SiLinux,
        color: "#171717",
        level: 70,
        usage: "팀 프로젝트를 배포할 수 있도록 Linux 서버의 실행 환경을 설정했습니다.",
      },
      {
        name: "Git",
        icon: SiGit,
        color: "#d34731",
        level: 80,
        usage: "브랜치와 커밋으로 작업을 나누고, 팀 프로젝트에서 변경 이력을 공유하고 병합합니다.",
      },
      {
        name: "Docker",
        icon: SiDocker,
        color: "#1d63ed",
        level: 55,
        usage: "애플리케이션과 의존성을 이미지로 묶어 컨테이너에서 동일한 실행 환경을 구성합니다.",
      },
    ],
  },
  {
    title: "Database",
    icon: LuDatabase,
    skills: [
      {
        name: "MySQL",
        icon: SiMysql,
        color: "#27647a",
        level: 75,
        usage: "관계형 테이블에 서비스 데이터를 저장하고, SQL로 필요한 데이터를 조회하고 수정합니다.",
      },
      {
        name: "Redis",
        icon: SiRedis,
        color: "#d82c20",
        level: 60,
        usage: "빠른 접근이 필요한 데이터를 키-값으로 캐싱하는 데 활용합니다.",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#13834f",
        level: 65,
        usage: "데이터를 문서 단위로 저장하고, 애플리케이션에 필요한 조건으로 조회합니다.",
      },
    ],
  },
];

export default function Skills() {
  return (
    <section className={styles.section} id="skills" aria-labelledby="skills-title">
      <RevealContent>
        <Container>
          <h2 id="skills-title" className={styles.heading}>Skills</h2>
          {groups.map(({ title, icon: GroupIcon, skills }) => (
            <section className={styles.group} key={title} aria-labelledby={`skills-${title.toLowerCase()}`}>
              <h3 className={styles.groupTitle} id={`skills-${title.toLowerCase()}`}>
                <GroupIcon aria-hidden="true" /> {title}
              </h3>
              <ul className={styles.list}>
                {skills.map(({ name, icon: Icon, color, usage, level }) => (
                  <li className={styles.skill} key={name}>
                    <div className={styles.skillCopy}>
                      <h4><Icon aria-hidden="true" color={color} /> {name}</h4>
                      <p>{usage}</p>
                    </div>
                    <div className={styles.proficiency}>
                      <p aria-hidden="true">{level}%</p>
                      <meter className={styles.meter} min={0} max={100} value={level} aria-label={`${name} 숙련도`} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </RevealContent>
    </section>
  );
}

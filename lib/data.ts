import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaGlasses, FaLinux } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { MdWorkspacePremium } from "react-icons/md";
import passwordmanager from "@/public/passwordmanager.png";
import passwordmanagergui from "@/public/passwordmanagergui.jpeg";
import marksheetmanager from "@/public/marksheetmanagement.jpeg";
import academicsuite from "@/public/academicsuite.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

type ExperienceEntry = {
  title: string;
  location: string;
  description: string | readonly string[];
  icon: React.ReactElement;
  date: string;
};

export const experiencesData: ExperienceEntry[] = [
  {
    title: "AI Agents Intensive Course",
    location: "Google",
    description:
      "Completed an intensive programme on building AI agents, covering agentic frameworks, tool use, and multi-agent orchestration.",
    icon: React.createElement(FaGlasses),
    date: "2024",
  },
  {
    title: "Software Development Engineer",
    location: "Zoho Corporation, Chennai",
    description: [
      "Built a CLI-based server configuration and deployment automation tool in Python and Shell, adopted by the entire Zoho Projects engineering team for setup and releases.",
      "Cut developer cycle time by ~40% by streamlining environment setup, code changes, and testing loops.",
      "Developed backend components for a shared API gateway powering install/uninstall for all Zoho Projects integrations (10+ external systems) — new integrations are config-driven, eliminating ~40% of duplicated integration code.",
      "Consolidated real-time data synchronisation from 5+ services into one shared design that dispatches Kafka or scheduler payloads based on each module's sync requirement, cutting cross-service sync latency from minutes to seconds — now the standard pattern for new services.",
    ],
    icon: React.createElement(CgWorkAlt),
    date: "06/2023 – Present",
  },
  {
    title: "Software Development Engineer — Intern",
    location: "Zoho Corporation, Chennai",
    description: [
      "Independently built a full-stack project management tool — backend APIs and UI — adopted by 200+ internal users.",
      "Resolved 30+ production issues in a live product and collaborated on new-feature analysis with the core team.",
      "Drove the team's Eclipse → IntelliJ migration by reimplementing slow IDE-plugin workflows as Python/Shell scripts with fully automated configuration.",
    ],
    icon: React.createElement(CgWorkAlt),
    date: "02/2021 – 06/2023",
  },
  {
    title: "MCA — Master of Computer Applications",
    location: "Kongu Engineering College, Erode",
    description:
      "Completed postgraduate degree in Computer Applications, developing full-stack projects across Python, Flask, and web technologies.",
    icon: React.createElement(LuGraduationCap),
    date: "10/2021 – 04/2023",
  },
  {
    title: "Hackathon — State Level Participation",
    location: "",
    description:
      "Competed in a state-level hackathon, collaborating under time-constrained conditions to build and present a working software solution.",
    icon: React.createElement(MdWorkspacePremium),
    date: "2021",
  },
  {
    title: "RHCSA – Red Hat Certified System Administrator",
    location: "Certification ID: 210-048-773",
    description:
      "Industry-recognised Linux system administration certification (EX200). Validates expertise in managing Red Hat Enterprise Linux environments.",
    icon: React.createElement(FaLinux),
    date: "2021",
  },
  {
    title: "B.Sc Computer Science",
    location: "Thiagarajar College, Madurai",
    description:
      "Graduated with a Bachelor of Science in Computer Science. Built foundational programming skills and participated in web development with the college team.",
    icon: React.createElement(LuGraduationCap),
    date: "04/2018 – 05/2021",
  },
];

export const projectsData = [
  {
    title: "Academic Suite — Exam Controller",
    description:
      "Full-stack platform automating marksheet, hall-ticket, and report generation for PG/UG/Diploma programs — staff RBAC portal plus a student self-service portal.",
    tags: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    imageUrl: academicsuite,
    modalType: "image",
    modalTitle: "Academic Suite — Exam Controller",
    modalPoints: [
      "Automates marksheet, hall-ticket, and department-report generation for PG, UG, and Diploma programs — pixel-accurate PDFs (A4/Legal/A5) rendered from Jinja2 templates.",
      "Unified grading engine covering three academic systems with Strategy + Factory patterns, keeping program rules isolated and extensible.",
      "Two role-aware React frontends served by one FastAPI backend: a staff portal with granular RBAC and time-windowed marks entry, and a student portal with tab-scoped JWT and AES-GCM-encrypted sessions.",
      "Typed SQLAlchemy 2.0 data layer with a repository pattern on PostgreSQL; Dockerised and self-deployed on a VPS with backups and monitoring.",
      "The modern successor to the Marksheet Management System after five years of production use.",
    ],
    modalSrc: "/academicsuite.png",
  },
  {
    title: "Password Manager — Web",
    description:
      "Web-based password manager securing credentials with Fernet symmetric encryption. Store everything in one place, accessible from any device.",
    tags: ["Python", "Flask", "Bootstrap", "SQLite", "MongoDB", "Firebase"],
    imageUrl: passwordmanager,
    modalType: "image",
    modalTitle: "Password Manager — Web App",
    modalPoints: [
      "Web-based password manager built with Flask and Bootstrap — my first end-to-end project.",
      "Secures credentials with Fernet symmetric encryption (Python cryptography) and hash-based login verification.",
      "Full CRUD support for managing stored credentials behind authenticated sessions.",
      "Persistence implemented across SQLite, MongoDB, and Firebase — supporting both cloud-based and offline modes.",
      "Responsive, multi-user UI built with Bootstrap.",
    ],
    modalSrc: "/pwdm.png",
  },
  {
    title: "Password Manager — Desktop",
    description:
      "Cross-platform PyQt5 desktop app with locally encrypted password storage — credentials secured with Fernet symmetric encryption on the user's machine.",
    tags: ["Python", "PyQt5", "SQLite", "Firebase", "MongoDB"],
    imageUrl: passwordmanagergui,
    modalSrc: "/pwdm.mp4",
    modalType: "video",
    modalTitle: "Password Manager — Desktop App",
    modalPoints: [
      "Cross-platform PyQt5 desktop client for secure password management on Windows, Linux, and Mac.",
      "Secures credentials with Fernet symmetric encryption (Python cryptography) and hash-based login verification.",
      "Full CRUD operations with persistence across SQLite, MongoDB, and Firebase.",
      "Works in both cloud-backed and fully offline modes, with multi-user support.",
      "Built alongside the web client as my first end-to-end project — learning CRUD design, encryption, and cross-platform GUI development.",
    ],
  },
  {
    title: "Marksheet Management System",
    description:
      "Flask web app that reads student marks from Excel sheets and generates marksheets, hall tickets, and department copies. Still running in production; later evolved into Academic Suite.",
    tags: ["Python", "Flask", "Bootstrap", "MySQL", "Pandas"],
    imageUrl: marksheetmanager,
    modalSrc: "/mm.mp4",
    modalType: "video",
    modalTitle: "Marksheet Management System",
    modalPoints: [
      "Reads student marks from Excel sheets and processes them with Pandas into print-ready marksheets, hall tickets, and department copies.",
      "Generates department-wise reports for a complete performance overview.",
      "Delivered as a fully offline, single-machine system per the institution's requirement — a stable build still running in production today.",
      "Later evolved into Academic Suite, a separate web app accessible from anywhere.",
    ],
  },
] as const;

export const skillsData = [
  {
    category: "Programming",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "Shell Scripting"],
  },
  {
    category: "Backend",
    skills: [
      "FastAPI",
      "Flask",
      "Django",
      "REST APIs",
      "Microservices",
      "Kafka",
      "SQLAlchemy",
    ],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "HTML", "CSS"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Kubernetes", "Google Cloud", "GitHub Actions", "CI/CD", "Linux"],
  },
  {
    category: "Tools & Security",
    skills: ["Git", "Postman", "JWT", "RBAC", "Cryptography"],
  },
] as const;

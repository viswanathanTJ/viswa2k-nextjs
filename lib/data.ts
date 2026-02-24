import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaGlasses, FaLinux } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { MdWorkspacePremium } from "react-icons/md";
import passwordmanager from "@/public/passwordmanager.png";
import passwordmanagergui from "@/public/passwordmanagergui.jpeg";
import marksheetmanager from "@/public/marksheetmanagement.jpeg";

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
      "Built a CLI-based automated tool using Python and Shell that simplified server configuration and deployment, improving team pace by ~40%.",
      "Developed backend components for a shared API gateway integrating 10+ external systems, standardising CRUD operations and reducing maintenance overhead.",
      "Implemented real-time data synchronisation across interconnected services, improving data accuracy and reducing manual intervention.",
    ],
    icon: React.createElement(CgWorkAlt),
    date: "06/2023 – Present",
  },
  {
    title: "Software Development Engineer — Intern",
    location: "Zoho Corporation, Chennai",
    description: [
      "Built a full-stack internal project management tool now used by 200+ users, contributing to backend APIs and UI components.",
      "Reduced integration time by automating repetitive workflow steps, improving data flow across services.",
      "Identified and resolved 30+ production issues through hands-on debugging with mentor guidance.",
      "Upgraded legacy modules and improved API handling for better system responsiveness under load.",
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
    title: "Password Manager — Web",
    description:
      "A secure, web-based password manager with advanced encryption. Store all credentials in one place, accessible from any device, anytime.",
    tags: ["Python", "Flask", "MongoDB", "HTML", "CSS", "JS"],
    imageUrl: passwordmanager,
    modalType: "image",
    modalTitle: "Password Manager — Web App",
    modalPoints: [
      "A secure, web-based solution designed for efficient password management with advanced encryption techniques.",
      "Fully supports CRUD operations with robust encryption and decryption mechanisms.",
      "Implements hash-based verification for secure logins and strong password storage.",
      "Provides a responsive and user-friendly GUI, ensuring seamless interaction across multiple users.",
      "Offers compatibility for cloud-based and offline modes to cater to diverse user needs.",
      "Supports cross-platform functionality on Windows, Linux, and Mac for wide accessibility.",
      "This project highlights expertise in web application development, encryption methodologies, and secure multi-user systems.",
    ],
    modalSrc: "/pwdm.png",
  },
  {
    title: "Password Manager — Desktop",
    description:
      "Multi-platform desktop app with locally encrypted password storage. Provides 200% safer encryption accessible only on the user's machine.",
    tags: ["Python", "PyQt5", "SQL", "Firebase", "MongoDB"],
    imageUrl: passwordmanagergui,
    modalSrc: "/pwdm.mp4",
    modalType: "video",
    modalTitle: "Password Manager — Desktop App",
    modalPoints: [
      "A secure and user-friendly application designed to simplify password management while ensuring data protection across multiple platforms.",
      "Full support for CRUD operations to manage passwords efficiently.",
      "Implements robust encryption and decryption algorithms to safeguard user data.",
      "Hash-based login verification for enhanced security.",
      "Strong encryption for securely storing sensitive information.",
      "Responsive GUI, ensuring an intuitive user experience.",
      "Available for both cloud-based and offline usage, offering flexibility to users.",
      "Supports multi-user functionality for collaborative environments.",
      "Compatible with Windows, Linux, and Mac, ensuring cross-platform accessibility.",
      "This project demonstrates expertise in secure coding practices, encryption methodologies, and cross-platform application development.",
    ],
  },
  {
    title: "Marksheet Management System",
    description:
      "Automated system that generates marksheets, hall tickets, and department reports from student data. Supports Excel input and direct email delivery.",
    tags: ["Python", "Flask", "pymysql", "pandas", "HTML", "CSS", "JS"],
    imageUrl: marksheetmanager,
    modalSrc: "/mm.mp4",
    modalType: "video",
    modalTitle: "Marksheet Management System",
    modalPoints: [
      "A comprehensive and automated solution for managing student records, designed to streamline academic operations efficiently.",
      "Generates individual marksheets and detailed student reports effortlessly.",
      "Provides department-wise reports for a comprehensive performance overview.",
      "Automates hall ticket generation for seamless examination processes.",
      "Includes automated features to send marksheets and hall tickets directly to students via email.",
      "Simplifies data handling, improving accuracy and reducing manual effort.",
      "This project showcases expertise in automation, report generation, and building efficient academic management systems.",
    ],
  },
] as const;

export const skillsData = [
  {
    category: "Programming",
    skills: ["Python", "Java", "JavaScript", "Shell Scripting"],
  },
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "React", "Next.js", "TypeScript"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Flask", "Django", "Spring Boot", "Kafka", "REST APIs"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Kubernetes", "Google Cloud", "GitHub Actions", "Linux", "CI/CD"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "MongoDB", "Redis"],
  },
] as const;

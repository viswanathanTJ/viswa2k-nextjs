import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaCodiepie, FaGlasses, FaLinux, FaLockOpen, FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import passwordmanager from "@/public/passwordmanager.png";
import passwordmanagergui from "@/public/passwordmanagergui.jpeg";
import marksheetmanager from "@/public/marksheetmanagement.jpeg";
import wordanalyticsImg from "@/public/wordanalytics.png";

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

export const experiencesData = [
  {
    title: "Web Designing and Development",
    location: "",
    description:
      "Started my coding skill from this stage. I worked with college web development team and learned about UI/UX design and development",
    icon: React.createElement(FaReact),
    date: "2018",
  },
  {
    title: "Android reverse engineering",
    location: "",
    description:
      "Android reverse engineering is the process of decompiling APK files to reveal and modify their source code, and then recompiling them. This allows for a deep understanding of an application's functionality, enabling enhancements and performance optimization.",
    icon: React.createElement(FaLockOpen),
    date: "2020",
  },
  {
    title: "Thiagarajar College",
    location: "Madurai, India",
    description:
      "I graduated with Bachelor of Computer Science B.Sc degree",
    icon: React.createElement(LuGraduationCap),
    date: "2018-2021",
  },
  {
    title: "Redhat Certified System Administrator",
    location: "",
    description:
      "The Red Hat Certified System Administrator (RHCSA) is a prestigious certification that validates one's expertise in managing system administration tasks in Red Hat Enterprise Linux environments. Certification ID: 210-048-773",
    icon: React.createElement(FaLinux),
    date: "2018-2021",
  },
  {
    title: "DSA - Problem Solving",
    location: "",
    description:
      "Started my path on solving problems in Leetcode, HackerRank platforms",
    icon: React.createElement(FaGlasses),
    date: "2021",
  },
  {
    title: "Kongu Engineering College",
    location: "Erode, India",
    description:
      "I graduated with Master of Computer Application MCA degree",
    icon: React.createElement(LuGraduationCap),
    date: "2021-2023",
  },
  {
    title: "Summer Intern",
    location: "Zoho Corporation - Chennai",
    description:
      "Joined as intern in zoho corporation and acquired necessary knowledge required in IT fields",
    icon: React.createElement(CgWorkAlt),
    date: "2022",
  },
  {
    title: "Project Trainee",
    location: "Zoho Corporation - Chennai",
    description:
      "Completed my internship and joined as Project Trainee.",
    icon: React.createElement(CgWorkAlt),
    date: "2022",
  },
  {
    title: "Member Technical Staff",
    location: "Zoho Corporation - Chennai",
    description:
      "Became a full time employee and Zoho Corporation",
    icon: React.createElement(CgWorkAlt),
    date: "2023 - present",
  }
] as const;

export const projectsData = [
  {
    title: "Web Application",
    description:
      "I developed my own password manager where I used to store all internet credentials in one place. It is convienient to use from anydevices, anytime and anywhere.",
    tags: ["Python", "Flask", "MongoDB", "HTML", "CSS", "JS"],
    imageUrl: passwordmanager,
  },
  {
    title: "Software Development",
    description:
      "Designed multi platform software where password are stored encrypted in their own machine. It provides 200% safer encryption and can only access in that machine",
    tags: ["Python", "PyQt5", "Sql", "Firebase", "MongoDB"],
    imageUrl: passwordmanagergui,
  },
  {
    title: "Marksheet Management",
    description:
      "An application that generate marksheet based on the student data provided in Excel and SQL. Helps to generate report, hall ticket and printing all marksheets",
    tags: ["Python", "Flask", "pymysql", "pandas", "HTML", "CSS", "JS"],
    imageUrl: marksheetmanager,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Firebase",
  "MySQL",
  "PHP",
  "Python",
  "pandas",
  "numpy",
  "Docker",
  "Kubernetees",
  "Cloud Computing",
  "Django",
  "Java",
  "Linux administration",
  "Shell Scripting",
] as const;

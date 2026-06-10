"use client";

import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I am a backend-leaning full-stack{" "}
        <span className="font-medium">Software Engineer at Zoho Corporation</span> with 3+ years
        of full-time experience (5+ including my internship) across the full software lifecycle —
        from building <span className="font-medium">backend APIs and CLI automation tools</span> to
        contributing to large-scale <span className="font-medium">distributed systems</span> and{" "}
        <span className="font-medium">API gateways</span>.
      </p>

      <p className="mb-3">
        My core strength lies in <span className="font-medium">backend engineering</span> —
        designing reliable services, automating repetitive infrastructure tasks, and integrating
        external systems. I work across{" "}
        <span className="font-medium">Python, Java, and Shell environments</span>, and I am
        experienced with <span className="font-medium">Docker, Kubernetes, and Google Cloud</span>{" "}
        for deployment and operations. I also build and operate my own production systems end to
        end — most recently <span className="font-medium">Academic Suite</span>, a self-hosted
        exam-management platform on FastAPI, React, and PostgreSQL.
      </p>

      <p>
        <span className="italic">Outside of work</span>, I enjoy cricket, badminton, and chess.
        I am currently exploring{" "}
        <span className="font-medium">AI agents and LLM tooling</span>, and I follow the
        intersection of <span className="font-medium">technology and markets</span> closely.
      </p>
    </motion.section>
  );
}

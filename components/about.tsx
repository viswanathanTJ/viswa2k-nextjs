"use client";

import React from "react";
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
        A proficient coder with a knack for designing websites and software that are not only functional but also {" "}
        <span className="font-medium">aesthetically pleasing</span>. With a solid foundation in <span className="font-medium">Linux management and DevOps</span>,{" "}
        I excel at creating streamlined systems that enhance <span className="font-medium">productivity</span> and <span className="font-medium">efficiency.</span>
      </p>
      
      <p>
        My interest extends to the realm of <span className="font-medium">automation</span>, where I utilize my skills in shell scripting and  <span className="font-medium">Python</span> to automate complex tasks,
        thereby simplifying processes and improving overall performance. This passion for automation, combined with my expertise in coding,{" "}
        allows me to provide comprehensive digital solutions that meet the highest standards of quality.
        In essence, I am a coder who believes in the power of technology to transform and simplify, and I strive to reflect this belief in every project I undertake.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        cricket, badminton, video games and watching movies. I also enjoy{" "}
        <span className="font-medium">learning new things</span> about technology and stocks. I am currently
        learning about{" "}
        <span className="font-medium">web development and social marketing</span>.
      </p>
    </motion.section>
  );
}

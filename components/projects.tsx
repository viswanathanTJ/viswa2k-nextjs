"use client";

import SectionHeading from "./section-heading";
import { projectsData, miniProjectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>

      <h3 className="mt-10 mb-4 text-xl font-medium">More on GitHub</h3>
      <div className="grid gap-3 sm:grid-cols-3 max-w-[49rem] text-left">
        {miniProjectsData.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-100 border border-black/5 rounded-lg p-4 hover:bg-gray-200 transition dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
          >
            <h4 className="font-semibold">{project.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-white/70">
              {project.description}
            </p>
            <ul className="flex flex-wrap mt-3 gap-1.5">
              {project.tags.map((tag) => (
                <li
                  className="bg-black/[0.7] px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiGithub, FiExternalLink, FiStar, FiX, FiArrowRight } from "react-icons/fi";
import portfolioData from "@/data/portfolio.json";

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  category: string[];
  github: string;
  demo: string;
  highlights: string[];
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { projects } = portfolioData;

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get unique categories from projects
  const allCategories = Array.from(
    new Set(projects.flatMap((project) => project.category))
  );
  const filters = ["All", ...allCategories];

  // Filter projects based on selected filter
  const filteredProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((project) => project.category.includes(selectedFilter));

  return (
    <section id="projects" ref={ref} className="py-8 md:py-20 max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-400/5 to-emerald-400/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-blue-400/5 to-purple-400/5 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white whitespace-nowrap">
              <span className="text-blue-500 dark:text-blue-400 font-mono text-lg md:text-2xl mr-2">04.</span>
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-grow max-w-xs"></div>
          </div>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-4xl">
            A selection of projects showcasing my expertise in building scalable, production-ready applications.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedFilter === filter
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105"
                : "glass-card text-slate-700 dark:text-slate-300 hover:shadow-lg hover:-translate-y-0.5"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Project Card Content */}
              <div className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                    <FiStar className="text-white" size={24} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label="View Details"
                    >
                      <FiExternalLink size={20} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 text-sm flex-grow">
                  {project.description}
                </p>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {project.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">▸</span>
                        <span className="text-slate-600 dark:text-slate-400 line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 md:px-3 md:py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 md:px-3 md:py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover effect gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No projects found for this category.
            </p>
          </div>
        )}
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                    <FiStar className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedProject.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-8">
                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Overview</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 md:px-3 md:py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs md:text-sm font-medium border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Key Features & Achievements</h4>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm md:text-base">
                          <span className="text-blue-600 dark:text-blue-400 mt-1.5 flex-shrink-0">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      <FiGithub size={20} />
                      View Source
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                    >
                      <FiExternalLink size={20} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

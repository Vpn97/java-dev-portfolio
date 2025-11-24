"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";
import portfolioData from "@/data/portfolio.json";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { experience } = portfolioData;

  return (
    <section id="experience" ref={ref} className="py-8 md:py-20 max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-tr from-purple-400/5 to-pink-400/5 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white whitespace-nowrap">
              <span className="text-blue-500 dark:text-blue-400 font-mono text-lg md:text-2xl mr-2">02.</span>
              Work <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
            </h2>
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-grow max-w-xs"></div>
          </div>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-4xl">
            My professional journey and the impact I've made across different organizations.
          </p>
        </div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative glass-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Top section: Company & Position */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                        <FiBriefcase className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {exp.position}
                        </h3>
                        <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Duration & Location */}
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <FiCalendar size={16} />
                      <span className="font-medium">{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <FiMapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-700 dark:text-slate-300 mb-6 text-sm md:text-base">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
                    Key Achievements & Responsibilities
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm md:text-base">
                        <span className="text-blue-600 dark:text-blue-400 mt-1.5">▸</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wide">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs md:text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative gradient */}
                <div className="absolute -top-3 -right-3 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;

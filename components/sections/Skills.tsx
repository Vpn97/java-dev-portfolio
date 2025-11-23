"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiCode,
  FiLayout,
  FiDatabase,
  FiSend,
  FiCloud,
  FiTool
} from "react-icons/fi";
import portfolioData from "@/data/portfolio.json";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { skills } = portfolioData;

  const skillCategories = [
    {
      title: "Backend Development",
      skills: skills.backend,
      icon: FiCode,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      title: "Frontend Development",
      skills: skills.frontend,
      icon: FiLayout,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      title: "Databases",
      skills: skills.databases,
      icon: FiDatabase,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      title: "Messaging & Streaming",
      skills: skills.messaging,
      icon: FiSend,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
    },
    {
      title: "Cloud & DevOps",
      skills: skills.cloud,
      icon: FiCloud,
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20"
    },
    {
      title: "Tools & Others",
      skills: skills.tools,
      icon: FiTool,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
    },
  ];

  return (
    <section id="skills" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl"></div>

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Technical <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-16 max-w-2xl">
            A comprehensive toolkit of technologies and frameworks I work with to build robust applications.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative bg-gradient-to-br ${category.bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-105`}
                >
                  {/* Icon with gradient */}
                  <div className={`inline-flex p-4 bg-gradient-to-br ${category.gradient} rounded-xl mb-4 shadow-lg`}>
                    <IconComponent className="text-white" size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {category.title}
                  </h3>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Decorative element */}
                  <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${category.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

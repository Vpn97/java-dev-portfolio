"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { personal, education } = portfolioData;

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mb-16"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Profile Image & Quick Info */}
            <div>
              {/* Profile Image */}
              <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                  <Image
                    src="/data/profile_photo.JPG"
                    alt="Vishal Nagvadiya"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-30"></div>
              </div>

              {/* Quick Info Cards */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-4 p-5 glass-card rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <FiMapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{personal.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-4 p-5 glass-card rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                    <FiMail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                    <p className="font-semibold text-slate-900 dark:text-white break-all">{personal.email}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-4 p-5 glass-card rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg">
                    <FiPhone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{personal.phone}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: About Text & Education */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Who I Am
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  {personal.summary}
                </p>

                {/* Education */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Education
                </h3>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-6 p-6 glass-card rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {edu.degree}
                    </h4>
                    <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold mb-2">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <span>{edu.duration}</span>
                      <span>•</span>
                      <span>{edu.location}</span>
                      <span>•</span>
                      <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

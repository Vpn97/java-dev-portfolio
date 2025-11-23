"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FiAward, FiCalendar, FiExternalLink } from "react-icons/fi";
import portfolioData from "@/data/portfolio.json";

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { certifications } = portfolioData;

  return (
    <section id="certifications" ref={ref} className="py-20 max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-tr from-purple-400/5 to-pink-400/5 rounded-full blur-3xl -z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Certifications <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">& Awards</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Professional certifications and achievements that validate my technical expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative glass-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                  <FiAward size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium mb-1">
                    {cert.issuer}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                    <div className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      <span>{cert.date}</span>
                    </div>
                    {cert.credentialId && (
                      <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>
                </div>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FiExternalLink size={20} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;

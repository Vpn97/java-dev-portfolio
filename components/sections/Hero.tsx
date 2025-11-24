"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";
import HeroBackground from "@/components/ui/HeroBackground";
import { FiDownload } from "react-icons/fi";

const Hero = () => {
  const { personal, sections } = portfolioData;
  const { hero } = sections;
  const { codeWindow } = hero;

  // Calculate delays based on content
  const baseDelay = 0.8;
  const skillsDelayStart = baseDelay + 0.2;
  const skillsDuration = codeWindow.skills.length * 0.1;
  const afterSkillsDelay = skillsDelayStart + skillsDuration;

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <HeroBackground />
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-white/50 dark:bg-slate-950/50 z-[5]"></div>

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block"
            >
              <span className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-mono text-xs md:text-sm rounded-full inline-flex items-center gap-2">
                <span className="text-base">👋</span>
                <span>{hero.greeting}</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-900 dark:text-slate-100 font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
            >
              {personal.name}.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {hero.tagline}
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-xl"
              dangerouslySetInnerHTML={{ __html: hero.description.replace(/className=/g, 'class=') }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 md:gap-4 pt-2"
            >
              <Magnetic>
                <a
                  href="/data/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 text-sm group"
                >
                  <FiDownload className="mr-2 group-hover:animate-bounce" size={16} />
                  <span>{hero.buttons.cv}</span>
                </a>
              </Magnetic>

              <Magnetic>
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-sm group"
                >
                  <span>{hero.buttons.projects}</span>
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all text-sm group"
                >
                  <span>{hero.buttons.contact}</span>
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Side: Enhanced Code Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hidden lg:block relative lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm border border-slate-700/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-slate-700/50 backdrop-blur-sm">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-400 font-mono">{codeWindow.file}</div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: baseDelay }}
                  className="text-slate-300"
                >
                  <span className="text-purple-400">public class</span> <span className="text-yellow-300">{codeWindow.class}</span> <span className="text-purple-400">extends</span> <span className="text-yellow-300">{codeWindow.extends}</span> {"{"}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: baseDelay + 0.1 }}
                  className="pl-4 text-slate-300"
                >
                  <span className="text-purple-400">private</span> String[] skills = {"{"}
                </motion.div>

                {codeWindow.skills.map((line: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: skillsDelayStart + (index * 0.1) }}
                    className="pl-8 text-green-400"
                  >
                    {line}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: afterSkillsDelay }}
                  className="pl-4 text-slate-300"
                >
                  {"};"}
                </motion.div>
                <br />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: afterSkillsDelay + 0.1 }}
                  className="pl-4 text-slate-300"
                >
                  <span className="text-purple-400">public void</span> <span className="text-blue-400">{codeWindow.methods.buildFuture}</span>() {"{"}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: afterSkillsDelay + 0.2 }}
                  className="pl-8 text-slate-300"
                >
                  <span className="text-purple-400">while</span>(alive) {"{"}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: afterSkillsDelay + 0.3 }}
                  className="pl-12 text-slate-300"
                >
                  {codeWindow.methods.eat}();
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: afterSkillsDelay + 0.4 }}
                  className="pl-12 text-slate-300"
                >
                  {codeWindow.methods.sleep}();
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: afterSkillsDelay + 0.5 }}
                  className="pl-12 text-slate-300"
                >
                  <span className="text-blue-400">{codeWindow.methods.code}</span>();
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: afterSkillsDelay + 0.6 }}
                  className="pl-8 text-slate-300"
                >
                  {"}"}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: afterSkillsDelay + 0.7 }}
                  className="pl-4 text-slate-300"
                >
                  {"}"}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: afterSkillsDelay + 0.8 }}
                  className="text-slate-300"
                >
                  {"}"}
                </motion.div>
              </div>

              {/* Cursor Blink */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: afterSkillsDelay + 1.0 }}
                className="absolute bottom-6 right-6 w-2 h-4 bg-blue-400"
              ></motion.div>
            </div>

            {/* Enhanced Background Glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10 rounded-full opacity-60"></div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Fade at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent dark:from-[#020617] dark:to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;

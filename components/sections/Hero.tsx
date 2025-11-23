"use client";

import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";
import HeroBackground from "@/components/ui/HeroBackground";

const Hero = () => {
  const { personal } = portfolioData;

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <HeroBackground />

      <div className="relative z-10 w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-blue-400 font-mono text-base md:text-lg mb-5 tracking-wide"
            >
              Hi, my name is
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-900 dark:text-slate-100 font-bold text-5xl md:text-7xl lg:text-8xl mb-4 tracking-tight"
            >
              {personal.name}.
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-600 dark:text-slate-400 text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight"
            >
              I build things for the web.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed mb-12 text-balance"
            >
              Senior Software Engineer with <span className="text-blue-600 dark:text-blue-400 font-semibold">6+ Years</span> hands-on experience in designing, developing, and deploying scalable <span className="text-purple-600 dark:text-purple-400 font-semibold">microservices-based applications</span>. Specialized in Java 17, Spring Boot, REST APIs, Apache Kafka, JPA/Hibernate, and multi-database integrations. Proven track record in building enterprise-grade systems, optimizing performance, leading teams, and delivering high-impact solutions for government and enterprise clients. Strong expertise in <span className="text-cyan-600 dark:text-cyan-400 font-semibold">DevOps practices</span>, cloud technologies, and end-to-end software development lifecycle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="/data/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-mono font-medium hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 text-sm md:text-base group"
                >
                  <span className="mr-2">Download CV</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-y-1 transition-transform"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>
              </Magnetic>

              <Magnetic>
                <Link
                  href="#projects"
                  className="inline-flex items-center justify-center px-8 py-4 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-mono hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-sm md:text-base"
                >
                  Check out my work!
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-mono transition-all text-sm md:text-base"
                >
                  Contact Me
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Side: Code Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hidden lg:block relative lg:col-span-5"
          >
            <div className="relative rounded-xl overflow-hidden bg-slate-900/90 backdrop-blur-sm border border-slate-700 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Window Header */}
              <div className="flex items-center px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-slate-400 font-mono">Developer.java</div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="text-slate-300">
                  <span className="text-purple-400">public class</span> <span className="text-yellow-300">Vishal</span> <span className="text-purple-400">extends</span> <span className="text-yellow-300">Developer</span> {"{"}
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-purple-400">private</span> String[] skills = {"{"}
                </div>
                <div className="pl-8 text-green-400">
                  "Java 17", "Spring Boot",
                </div>
                <div className="pl-8 text-green-400">
                  "Microservices", "Kafka",
                </div>
                <div className="pl-8 text-green-400">
                  "AWS", "Docker", "K8s"
                </div>
                <div className="pl-4 text-slate-300">
                  {"};"}
                </div>
                <br />
                <div className="pl-4 text-slate-300">
                  <span className="text-purple-400">public void</span> <span className="text-blue-400">buildFuture</span>() {"{"}
                </div>
                <div className="pl-8 text-slate-300">
                  <span className="text-purple-400">while</span>(alive) {"{"}
                </div>
                <div className="pl-12 text-slate-300">
                  eat();
                </div>
                <div className="pl-12 text-slate-300">
                  sleep();
                </div>
                <div className="pl-12 text-slate-300">
                  <span className="text-blue-400">code</span>();
                </div>
                <div className="pl-8 text-slate-300">
                  {"}"}
                </div>
                <div className="pl-4 text-slate-300">
                  {"}"}
                </div>
                <div className="text-slate-300">
                  {"}"}
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -inset-4 bg-blue-500/20 blur-3xl -z-10 rounded-full"></div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent dark:from-[#020617] dark:to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;

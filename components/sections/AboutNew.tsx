"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { personal, education } = portfolioData;

  const skills = [
    "Java & Spring Boot",
    "Angular 15+",
    "Hibernate & JPA",
    "Microservices Architecture",
    "EHCache & Redis",
    "PostgreSQL, MySQL & MongoDB",
    "Apache Kafka & Keycloak",
    "Kong API Gateway",
    "AWS, Jenkins (CI-CD) & Docker",
  ];

  return (
    <section id="about" ref={ref} className="py-20 max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl -z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
            <span className="text-blue-500 dark:text-blue-400 font-mono text-2xl mr-2">01.</span>
            About Me
          </h2>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-grow max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Text Content */}
          <div className="md:col-span-2">
            <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              <p>
                Hello! I'm Vishal, a software developer based in <span className="text-blue-500 dark:text-blue-400">{personal.location}</span>.
                I enjoy creating things that live on the internet, whether that be websites,
                applications, or anything in between.
              </p>
              <p>
                {personal.summary}
              </p>
              <p>
                I graduated from {education[0].institution} with a degree in {education[0].degree},
                where I developed a strong foundation in computer science and software engineering principles.
              </p>
              <p>Here are a few technologies I've been working with recently:</p>
            </div>

            <ul className="grid grid-cols-2 gap-2 mt-6 text-slate-600 dark:text-slate-400 font-mono text-sm">
              {skills.map((skill) => (
                <li key={skill} className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <span className="text-blue-500 dark:text-blue-400 mr-2">▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Profile Image */}
          <div className="relative group max-w-xs mx-auto md:mx-0">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform group-hover:-translate-y-2 transition-all duration-300">
              <div className="aspect-[3/4] relative bg-slate-200 dark:bg-slate-800">
                <Image
                  src="/data/profile_photo.JPG"
                  alt="Vishal Nagvadiya"
                  fill
                  className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
            <div className="absolute top-5 left-5 w-full h-full border-2 border-blue-500/50 rounded-xl -z-10 group-hover:top-3 group-hover:left-3 transition-all duration-300"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

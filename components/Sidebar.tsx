"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import portfolioData from "@/data/portfolio.json";
import Magnetic from "@/components/ui/Magnetic";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { personal } = portfolioData;

  return (
    <>
      {/* Fixed Left Navigation */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-24 flex-col justify-between items-center py-10 z-50">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-110 transition-transform">
          VN
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-col items-center space-y-8">
          {navItems.map((item, index) => (
            <Magnetic key={item.name}>
              <Link
                href={item.href}
                className="group relative p-2"
              >
                <div className={`w-1 rounded-full transition-all duration-300 ${activeSection === item.href
                    ? 'h-8 bg-blue-600 dark:bg-blue-400'
                    : 'h-2 bg-slate-300 dark:bg-slate-600 group-hover:h-6 group-hover:bg-blue-500 dark:group-hover:bg-blue-400'
                  }`}></div>

                <span className="absolute left-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap border border-slate-100 dark:border-slate-700">
                  {item.name}
                </span>
              </Link>
            </Magnetic>
          ))}
        </div>

        <div className="text-slate-300 dark:text-slate-600">
          {/* Vertical line */}
          <div className="w-px h-20 bg-current mx-auto"></div>
        </div>
      </nav>

      {/* Fixed Right Social Links */}
      <div className="hidden lg:block fixed right-10 bottom-0 z-50">
        <div className="flex flex-col items-center space-y-6">
          {personal.social.github && (
            <Magnetic>
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
            </Magnetic>
          )}
          {personal.social.linkedin && (
            <Magnetic>
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
            </Magnetic>
          )}
          <Magnetic>
            <a
              href={`mailto:${personal.email}`}
              className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
          </Magnetic>
          <div className="w-px h-24 bg-slate-300 dark:bg-slate-600"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

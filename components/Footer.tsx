"use client";

import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import portfolioData from "@/data/portfolio.json";

const Footer = () => {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-600 dark:text-slate-400 text-sm">
            © {currentYear} {personal.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            {personal.social.github && (
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
            )}
            {personal.social.linkedin && (
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
          </div>

          <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-500">
            <span>Made with</span>
            <FiHeart className="text-red-500 fill-current" size={14} />
            <span>using Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

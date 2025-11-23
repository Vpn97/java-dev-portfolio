"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "#about", number: "01" },
    { name: "Experience", href: "#experience", number: "02" },
    { name: "Work", href: "#projects", number: "03" },
    { name: "Contact", href: "#contact", number: "04" },
  ];

  return (
    <div className="lg:hidden fixed top-0 right-0 z-50 p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all shadow-lg glass-card"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm -z-10"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800"
            >
              <nav className="flex flex-col items-center justify-center h-full space-y-8 p-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex flex-col items-center"
                  >
                    <span className="text-blue-500 dark:text-blue-400 font-mono text-sm mb-2">{item.number}.</span>
                    <span className="text-3xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}

                <a
                  href="/data/cv.pdf"
                  className="mt-8 px-8 py-4 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-lg font-mono hover:bg-blue-500/10 transition-all"
                >
                  Download CV
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;

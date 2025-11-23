"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
      ? 'glass-card shadow-xl py-2'
      : 'bg-transparent py-4'
      }`}>
      <nav className="w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group relative z-50">
            <Magnetic>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">
                VN
              </span>
            </Magnetic>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Magnetic key={item.name}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 transition-colors font-medium text-sm ${scrolled
                    ? "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                    : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white"
                    }`}
                >
                  {item.name}
                </Link>
              </Magnetic>
            ))}
          </div>

          {/* Right Side: Theme Toggle + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <Magnetic>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
              </Magnetic>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-50 relative"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl md:hidden z-40 flex items-center justify-center"
            >
              <div className="flex flex-col items-center space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={toggleMenu}
                    className="text-2xl font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;

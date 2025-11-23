"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiMail, FiUser, FiMessageSquare, FiSend, FiGithub, FiLinkedin } from "react-icons/fi";
import portfolioData from "@/data/portfolio.json";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;

    setStatus("Opening your email client...");

    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setStatus("");
    }, 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/5 to-rose-400/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Let's <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mb-4"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              I'm currently open to new opportunities and collaborations. Let's build something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Get In Touch
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Feel free to reach out for collaborations, opportunities, or just a friendly chat!
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-4 p-5 glass-card rounded-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                    <FiMail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{personal.email}</p>
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Connect on Social</h4>
                <div className="flex gap-4">
                  {personal.social.github && (
                    <a
                      href={personal.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700"
                      aria-label="GitHub"
                    >
                      <FiGithub size={24} />
                    </a>
                  )}
                  {personal.social.linkedin && (
                    <a
                      href={personal.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700"
                      aria-label="LinkedIn"
                    >
                      <FiLinkedin size={24} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 backdrop-blur-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-4 top-4 text-slate-400" size={20} />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none text-slate-900 dark:text-white"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <FiSend size={20} />
                  Send Message
                </button>

                {status && (
                  <p className="text-center text-green-600 dark:text-green-400 font-medium">{status}</p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

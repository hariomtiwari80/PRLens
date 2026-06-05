import React from "react";
import {
  Github,
  Twitter,
  Linkedin,
  ShieldCheck,
  GitPullRequest,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="bg-black pt-20 px-4 overflow-hidden">

      <footer className="bg-[#131314] w-full max-w-[1350px] mx-auto text-white pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden border border-white/5">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-10 md:gap-12">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6"
          >

            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                PRLens AI
              </h2>

              <p className="text-sm text-neutral-400 mt-2">
                AI Pull Request Intelligence
              </p>
            </div>

            <p className="text-sm leading-7 text-neutral-300 max-w-xl">
              PRLens AI helps engineering teams review pull requests smarter
              using AI-powered security analysis, technical debt detection,
              architecture intelligence, and maintainability insights.
            </p>

            <div className="flex flex-wrap gap-3">

              <div className="flex items-center gap-2 bg-[#1b1b1d] border border-white/5 rounded-full px-4 py-2 text-sm text-neutral-300">
                <GitPullRequest className="w-4 h-4 text-orange-500" />
                Smart PR Reviews
              </div>

              <div className="flex items-center gap-2 bg-[#1b1b1d] border border-white/5 rounded-full px-4 py-2 text-sm text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Security Detection
              </div>

              <div className="flex items-center gap-2 bg-[#1b1b1d] border border-white/5 rounded-full px-4 py-2 text-sm text-neutral-300">
                <Brain className="w-4 h-4 text-orange-500" />
                AI Architecture Review
              </div>

            </div>

            <div className="flex gap-5 md:gap-6 pt-2">

              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                aria-label="Twitter"
                className="text-white hover:text-orange-500 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                aria-label="GitHub"
                className="text-white hover:text-orange-500 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                aria-label="LinkedIn"
                className="text-white hover:text-orange-500 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>

            </div>

          </motion.div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 lg:gap-20">

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >

              <h3 className="font-medium text-sm mb-5 text-white">
                Product
              </h3>

              <ul className="space-y-4 text-sm text-neutral-300">

                <li>
                  <a href="#features" className="hover:text-orange-500 transition">
                    Features
                  </a>
                </li>

                <li>
                  <a href="#analytics" className="hover:text-orange-500 transition">
                    Analytics
                  </a>
                </li>

                <li>
                  <a href="#pricing" className="hover:text-orange-500 transition">
                    Pricing
                  </a>
                </li>

                <li>
                  <a href="#faq" className="hover:text-orange-500 transition">
                    Documentation
                  </a>
                </li>

              </ul>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >

              <h3 className="font-medium text-sm mb-5 text-white">
                AI Capabilities
              </h3>

              <ul className="space-y-4 text-sm text-neutral-300">

                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    PR Analysis
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Security Reviews
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Technical Debt
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-orange-500 transition">
                    Architecture Insights
                  </a>
                </li>

              </ul>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="sm:col-span-2 md:col-span-1"
            >

              <h3 className="font-medium text-sm mb-5 text-white">
                Developer Intelligence
              </h3>

              <div className="space-y-4">

                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <GitPullRequest className="w-4 h-4 text-orange-500" />
                  AI Pull Request Reviews
                </div>

                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                  Security & Vulnerability Detection
                </div>

                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <Brain className="w-4 h-4 text-orange-500" />
                  Technical Debt Intelligence
                </div>

              </div>

            </motion.div>

          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-14 pt-5 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-neutral-500 text-sm">
            © 2026 PRLens AI. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-neutral-500">

            <a href="#" aria-label="Privacy" className="hover:text-orange-500 transition">
              Privacy
            </a>

            <a href="#" aria-label="Terms" className="hover:text-orange-500 transition">
              Terms
            </a>

            <a href="#" aria-label="Security" className="hover:text-orange-500 transition">
              Security
            </a>

          </div>

        </div>

        <div className="relative mt-10">

          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-orange-500 rounded-full blur-[170px] opacity-20 pointer-events-none" />

          <h3 className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,15vw,15rem)] [-webkit-text-stroke:1px_#7c2d12]">
            PRLens
          </h3>

        </div>

      </footer>

    </div>
  );
};

export default Footer;
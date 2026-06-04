import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import GithubModal from "@/components/GithubModal";
import {
  ArrowRight,
  Github,
  ShieldCheck,
  GitPullRequest,
} from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dashboardRef.current) {
        const scrolled = window.scrollY;

        const progress = Math.min(1, scrolled / 500);

        const tilt = 15 * (1 - progress);
        const scale = 0.92 + 0.08 * progress;
        const translateY = 40 * (1 - progress);

        dashboardRef.current.style.transform = `
          perspective(1400px)
          rotateX(${tilt}deg)
          scale(${scale})
          translateY(${translateY}px)
        `;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="home" className="relative bg-gradient-to-b from-saas-black to-[#1c160c] overflow-hidden min-h-[100vh] flex items-center pt-20">

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-saas-orange opacity-10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-orange-700 opacity-15 rounded-full blur-[80px]"></div>
      <div className="absolute top-20 right-1/4 w-[250px] h-[250px] bg-orange-400 opacity-10 rounded-full blur-[70px]"></div>

      <div className="section-container relative z-10 text-center px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <span className="inline-flex items-center gap-2 bg-saas-orange/10 text-saas-orange px-5 py-2 rounded-full text-sm font-medium mb-6 border border-saas-orange/20">
              <ShieldCheck className="w-4 h-4" />
              AI Powered Pull Request Intelligence
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Review Code Smarter With{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                PRLens AI
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Detect code smells, architecture issues, duplicate logic,
              maintainability risks, and security vulnerabilities before merge
              using AI-powered pull request analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Button 
              onClick={() => setOpenModal(true)}
              className="bg-saas-orange hover:bg-orange-600 text-white font-semibold py-6 px-7 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20">
                <Github className="mr-2 h-5 w-5" />
                Connect GitHub
              </Button>

              <Button
                variant="outline"
                className="border-saas-orange text-saas-orange hover:bg-saas-orange hover:text-white py-6 px-7 rounded-xl transition-all duration-300"
              >
                View Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 text-sm text-gray-300">

              <div className="flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-saas-orange" />
                AI PR Reviews
              </div>

              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-500"></div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-saas-orange" />
                Security Detection
              </div>

              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-500"></div>

              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-saas-orange" />
                GitHub Integration
              </div>

            </div>

          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-16 w-full flex justify-center"
            >

              <div
                ref={dashboardRef}
                className="relative w-[95vw] max-w-[1700px] mx-auto rounded-[28px] border border-saas-orange/20 shadow-2xl shadow-orange-500/10 transition-all duration-300 ease-out"
                style={{
                  transform:
                    "perspective(1400px) rotateX(15deg) scale(0.92) translateY(40px)",
                }}
              >

                <div className="absolute inset-0 bg-gradient-to-r from-saas-orange to-orange-700 blur-3xl opacity-20 rounded-[28px]"></div>

                <div className="relative bg-[#0f0f11] backdrop-blur-xl rounded-[28px] border border-saas-orange/10 overflow-hidden">

                  <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>

                    </div>

                    <div className="text-xs text-gray-400">
                      PRLens Dashboard
                    </div>

                  </div>

                  <div className="p-6 md:p-8">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                      <div className="lg:col-span-2 bg-[#18181b] rounded-2xl border border-white/5 p-6">

                        <div className="flex items-center justify-between mb-6">

                          <div>
                            <h3 className="text-white text-xl font-semibold">
                              Pull Request Analysis
                            </h3>

                            <p className="text-sm text-gray-400 mt-1">
                              AI-generated engineering insights
                            </p>
                          </div>

                          <div className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full">
                            Safe Merge
                          </div>

                        </div>

                        <div className="space-y-4">

                          <div className="bg-[#101012] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">
                                Security Vulnerabilities
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                No critical issues detected
                              </p>
                            </div>

                            <div className="text-green-400 text-sm font-semibold">
                              Passed
                            </div>
                          </div>

                          <div className="bg-[#101012] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">
                                Duplicate Logic Detection
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                2 repeated code blocks found
                              </p>
                            </div>

                            <div className="text-yellow-400 text-sm font-semibold">
                              Warning
                            </div>
                          </div>

                          <div className="bg-[#101012] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">
                                Architecture Review
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Maintainability score improved
                              </p>
                            </div>

                            <div className="text-orange-400 text-sm font-semibold">
                              92%
                            </div>
                          </div>

                        </div>

                      </div>

                      <div className="space-y-6">

                        <div className="bg-[#18181b] rounded-2xl border border-white/5 p-5">

                          <p className="text-sm text-gray-400 mb-3">
                            AI Review Score
                          </p>

                          <h2 className="text-5xl font-bold text-white">
                            9.4
                          </h2>

                          <div className="mt-4 h-2 bg-[#222226] rounded-full overflow-hidden">
                            <div className="w-[94%] h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
                          </div>

                        </div>

                        <div className="bg-[#18181b] rounded-2xl border border-white/5 p-5">

                          <p className="text-sm text-gray-400 mb-5">
                            Repository Insights
                          </p>

                          <div className="space-y-4">

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">
                                Code Quality
                              </span>

                              <span className="text-sm text-orange-400">
                                Excellent
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">
                                Technical Debt
                              </span>

                              <span className="text-sm text-green-400">
                                Low
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">
                                Security Status
                              </span>

                              <span className="text-sm text-green-400">
                                Protected
                              </span>
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 w-20 h-20 border border-saas-orange/20 rounded-full"></div>
      <div className="absolute top-20 right-10 w-10 h-10 border border-saas-orange/20 rounded-full"></div>
      <div className="absolute top-40 left-20 w-5 h-5 bg-saas-orange/20 rounded-full"></div>
      <GithubModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </div>
    
  );
};

export default HeroSection;
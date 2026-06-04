import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Github,
  ShieldCheck,
  GitPullRequest,
} from "lucide-react";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="relative bg-saas-darkGray py-20 md:py-28 overflow-hidden">

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-saas-orange/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-amber-600/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto bg-gradient-to-r from-saas-orange/10 to-amber-600/10 rounded-[32px] border border-saas-orange/20 overflow-hidden shadow-2xl"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-saas-orange/5 to-transparent"></div>

          <div className="relative z-10 px-6 sm:px-8 md:px-14 py-14 md:py-20 text-center flex flex-col items-center">

            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-saas-orange/10 text-saas-orange px-5 py-2 rounded-full text-sm font-medium border border-saas-orange/20 mb-7"
            >
              <ShieldCheck className="w-4 h-4" />
              AI Powered Developer Intelligence
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight max-w-5xl"
            >
              Ready To Build Better{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Pull Requests?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-300 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed mb-10"
            >
              Connect your GitHub repositories and let PRLens AI detect
              security risks, architecture issues, code smells, and technical
              debt before merge using intelligent AI-powered pull request reviews.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >

              <Button className="bg-saas-orange hover:bg-orange-600 text-white font-semibold py-6 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl shadow-orange-500/20">
                <Github className="mr-2 h-5 w-5" />
                Connect GitHub
              </Button>

              <Button
                variant="outline"
                className="border-saas-orange text-saas-orange hover:bg-saas-orange hover:text-white py-6 px-8 rounded-xl transition-all duration-300"
              >
                View Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 flex flex-wrap justify-center items-center gap-5 text-sm text-gray-300"
            >

              <div className="flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-saas-orange" />
                Smart PR Analysis
              </div>

              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-saas-orange" />
                AI Security Reviews
              </div>

              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>

              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-saas-orange" />
                GitHub Integration
              </div>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default CtaSection;
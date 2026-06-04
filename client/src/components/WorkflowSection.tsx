import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  ScanSearch,
  ShieldCheck,
  Brain,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Github,
    title: "Connect Repository",
    description:
      "Securely connect your GitHub repositories with PRLens AI.",
  },
  {
    icon: ScanSearch,
    title: "AI Scans Pull Request",
    description:
      "Analyze code changes, dependencies, and architecture instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Detect Issues",
    description:
      "Find vulnerabilities, duplicate logic, and maintainability risks.",
  },
  {
    icon: Brain,
    title: "Generate AI Review",
    description:
      "Receive intelligent engineering insights and recommendations.",
  },
  {
    icon: CheckCircle2,
    title: "Approve Merge",
    description:
      "Ship safer and cleaner code with confidence.",
  },
];

const WorkflowSection = () => {
  return (
    <section className="relative bg-saas-black py-20 md:py-28 overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]  blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >

          <span className="inline-flex items-center gap-2 bg-saas-orange/10 text-saas-orange px-5 py-2 rounded-full text-sm font-medium border border-saas-orange/20 mb-6">
            AI Workflow
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            How{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              PRLens AI
            </span>{" "}
            Works
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Automate pull request reviews with AI-powered engineering intelligence
            in just a few steps.
          </p>

        </motion.div>

        <div className="relative">

          <div className="hidden lg:block absolute top-24 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500/40 to-orange-500/0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                  }}
                  className="relative"
                >

                  <div className="bg-[#111113] border border-white/5 rounded-3xl p-7 h-full backdrop-blur-xl hover:border-orange-500/30 transition-all duration-300 shadow-xl">

                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 mx-auto">

                      <Icon className="w-8 h-8 text-orange-500" />

                    </div>

                    <div className="text-center">

                      <div className="text-orange-500 text-sm font-semibold mb-2">
                        Step {index + 1}
                      </div>

                      <h3 className="text-white text-xl font-semibold mb-4">
                        {step.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-7">
                        {step.description}
                      </p>

                    </div>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
};

export default WorkflowSection;
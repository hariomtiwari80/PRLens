import React from "react";
import {
  ShieldCheck,
  GitPullRequest,
  Bug,
  LineChart,
  Github,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <GitPullRequest className="h-6 w-6 text-saas-orange" />,
    title: "AI Pull Request Reviews",
    description:
      "Automatically analyze pull requests and detect risky code changes before merge.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-saas-orange" />,
    title: "Security Detection",
    description:
      "Detect vulnerabilities, hardcoded secrets, unsafe logic, and security risks instantly.",
  },
  {
    icon: <Brain className="h-6 w-6 text-saas-orange" />,
    title: "Architecture Intelligence",
    description:
      "Identify bad architecture patterns, tight coupling, and maintainability problems.",
  },
  {
    icon: <Bug className="h-6 w-6 text-saas-orange" />,
    title: "Code Smell Detection",
    description:
      "Find duplicate logic, oversized functions, and technical debt across repositories.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-saas-orange" />,
    title: "Technical Debt Analytics",
    description:
      "Track maintainability scores and repository health using advanced AI insights.",
  },
  {
    icon: <Github className="h-6 w-6 text-saas-orange" />,
    title: "GitHub Integration",
    description:
      "Connect repositories seamlessly and automate AI-powered code review workflows.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative bg-saas-black py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px]  rounded-full"></div>

      <div className="section-container relative z-10 px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Intelligent Features For{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Modern Developers
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="relative bg-saas-darkGray/90 backdrop-blur-xl p-7 rounded-2xl border border-gray-800 hover:border-saas-orange/40 transition-all duration-300 overflow-hidden group shadow-lg"
            >

              <div className="absolute inset-0 bg-gradient-to-br from-saas-orange/0 via-saas-orange/0 to-saas-orange/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative z-10">
                <div className="bg-saas-orange/10 w-14 h-14 flex items-center justify-center rounded-xl mb-5 border border-saas-orange/10">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
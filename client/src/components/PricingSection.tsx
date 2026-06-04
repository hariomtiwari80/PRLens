import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  ShieldCheck,
  GitPullRequest,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 19,
      annualPrice: 15,
      description: "Perfect for solo developers and small teams",
      features: [
        "AI Pull Request Reviews",
        "Basic Security Detection",
        "GitHub Integration",
        "Maintainability Insights",
        "Email Support",
      ],
      isPopular: false,
      ctaText: "Start Free",
    },
    {
      name: "Professional",
      monthlyPrice: 49,
      annualPrice: 39,
      description: "Advanced AI review workflow for growing engineering teams",
      features: [
        "Advanced PR Intelligence",
        "Architecture Analysis",
        "Technical Debt Analytics",
        "Priority Support",
        "Unlimited Repositories",
        "Team Collaboration",
        "Custom AI Rules",
      ],
      isPopular: true,
      ctaText: "Start Pro",
    },
    {
      name: "Enterprise",
      monthlyPrice: 99,
      annualPrice: 79,
      description: "Enterprise-grade AI code review and repository intelligence",
      features: [
        "Enterprise Security Reviews",
        "Full Architecture Intelligence",
        "Unlimited Team Members",
        "Dedicated AI Models",
        "SSO Authentication",
        "24/7 Dedicated Support",
        "Custom Integrations",
        "Advanced Analytics",
        "Dedicated Account Manager",
      ],
      isPopular: false,
      ctaText: "Contact Sales",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-saas-darkGray to-saas-black py-20 md:py-28 overflow-hidden"
      id="pricing">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"></div>

      <div className="section-container relative z-10 px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >

          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Simple Pricing For{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Modern Teams
            </span>
          </h2>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10">
            Scale your AI-powered code review workflow with pricing designed for
            developers, startups, and enterprise engineering teams.
          </p>

          <div className="flex items-center justify-center space-x-4">

            <span
              className={`text-sm font-medium transition ${
                isAnnual ? "text-saas-orange" : "text-gray-400"
              }`}
            >
              Annual
              <span className="text-xs ml-1 text-saas-orange">
                Save 20%
              </span>
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                isAnnual ? "bg-saas-orange" : "bg-gray-700"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`inline-block h-5 w-5 rounded-full bg-white ${
                  isAnnual ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>

            <span
              className={`text-sm font-medium transition ${
                !isAnnual ? "text-saas-orange" : "text-gray-400"
              }`}
            >
              Monthly
            </span>

          </div>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className={`relative rounded-3xl p-8 overflow-hidden transition-all duration-300 ${
                plan.isPopular
                  ? "bg-gradient-to-b from-saas-orange/20 to-saas-black border border-saas-orange/30 shadow-2xl shadow-orange-500/10"
                  : "bg-saas-darkGray border border-gray-800"
              }`}
            >

              <div className="absolute inset-0 bg-gradient-to-br from-saas-orange/0 to-saas-orange/5 opacity-0 hover:opacity-100 transition duration-500"></div>

              <div className="relative z-10">

                {plan.isPopular && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5,
                    }}
                    className="bg-saas-orange text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase mb-5 inline-block"
                  >
                    Most Popular
                  </motion.span>
                )}

                <h3 className="text-3xl font-bold mb-3 text-white">
                  {plan.name}
                </h3>

                <p className="text-gray-400 mb-7 leading-relaxed">
                  {plan.description}
                </p>

                <div className="mb-8">

                  <div className="flex items-end gap-2">

                    <span className="text-5xl font-bold text-white">
                      $
                      {isAnnual
                        ? plan.annualPrice
                        : plan.monthlyPrice}
                    </span>

                    <span className="text-gray-400 mb-1">
                      /month
                    </span>

                  </div>

                </div>

                <Button
                  className={`w-full rounded-xl py-6 font-semibold transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-saas-orange hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                      : "bg-[#1b1b1d] hover:bg-[#232325] text-white border border-white/10"
                  }`}
                >
                  {plan.ctaText}
                </Button>

                <div className="mt-8 space-y-4">

                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.05,
                      }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >

                      <div className="mt-0.5">
                        <Check className="w-5 h-5 text-saas-orange" />
                      </div>

                      <span className="text-sm text-gray-300 leading-relaxed">
                        {feature}
                      </span>

                    </motion.div>
                  ))}

                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-gray-400">

                  <div className="flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4 text-saas-orange" />
                    AI Reviews
                  </div>

                  <div className="w-1 h-1 rounded-full bg-gray-600"></div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-saas-orange" />
                    Secure
                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default PricingSection;
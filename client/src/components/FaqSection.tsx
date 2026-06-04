import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Github,
  GitPullRequest,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does PRLens AI review pull requests?",
    answer:
      "PRLens AI analyzes pull request diffs using advanced AI models to detect security risks, code smells, architecture issues, and maintainability problems before merge.",
  },
  {
    question: "Does PRLens AI integrate with GitHub?",
    answer:
      "Yes. PRLens AI connects directly with GitHub repositories and automatically reviews pull requests using GitHub APIs and webhooks.",
  },
  {
    question: "Can PRLens AI detect security vulnerabilities?",
    answer:
      "Absolutely. PRLens AI identifies hardcoded secrets, unsafe patterns, vulnerable logic, and risky code changes during pull request analysis.",
  },
  {
    question: "What programming languages are supported?",
    answer:
      "PRLens AI is designed to support modern development stacks including JavaScript, TypeScript, Python, Java, Go, and many other popular languages.",
  },
  {
    question: "Does it provide technical debt insights?",
    answer:
      "Yes. PRLens AI tracks maintainability scores, duplicate logic, architecture quality, and technical debt trends across repositories.",
  },
  {
    question: "Can teams use PRLens AI collaboratively?",
    answer:
      "Yes. Teams can review pull requests together, monitor repository health, and improve engineering workflows with shared AI insights.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="relative bg-saas-black py-20 md:py-28 border-t border-gray-800 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"></div>

      <div className="section-container relative z-10 px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Learn how PRLens AI helps engineering teams review pull requests,
            reduce technical debt, and improve software quality using AI.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-b from-saas-darkGray to-saas-black rounded-3xl p-6 md:p-10 border border-gray-800 shadow-2xl overflow-hidden relative"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-saas-orange/0 to-saas-orange/5"></div>

          <div className="relative z-10">
            <Accordion type="single" collapsible className="space-y-5">

              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                >

                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-gray-800 rounded-2xl px-5 bg-saas-black/40 backdrop-blur-md overflow-hidden"
                  >

                    <AccordionTrigger className="text-left text-white hover:text-saas-orange py-5 text-base md:text-lg font-medium transition-all duration-300">
                      {faq.question}
                    </AccordionTrigger>

                    <AccordionContent className="text-gray-400 pb-5 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </AccordionContent>

                  </AccordionItem>

                </motion.div>
              ))}

            </Accordion>
          </div>

        </motion.div>


      </div>
    </section>
  );
};

export default FaqSection;
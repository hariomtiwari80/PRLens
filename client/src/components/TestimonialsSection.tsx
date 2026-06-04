import React from "react";
import {
  Star,
  ShieldCheck,
  Github,
  GitPullRequest,
} from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "PRLens AI completely transformed our review workflow. We now detect risky pull requests and architecture issues before deployment.",
    author: "Sarah Johnson",
    position: "CTO, DevScale Labs",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100",
  },
  {
    text: "The AI review suggestions feel like having a senior engineer reviewing every pull request. It significantly improved our code quality.",
    author: "Michael Chen",
    position: "Lead Backend Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
  },
  {
    text: "Technical debt analytics and maintainability insights helped our team refactor critical modules much faster and safer.",
    author: "Emily Rodriguez",
    position: "Engineering Manager",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative bg-saas-black py-20 md:py-28 overflow-hidden"
      id="reviews">

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px]  rounded-full"></div>

      <div className="section-container relative z-10 px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Trusted By{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Engineering Teams
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Teams use PRLens AI to improve pull request quality, reduce
            technical debt, and ship secure code faster.
          </p>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="relative bg-gradient-to-b from-saas-darkGray to-saas-black border border-gray-800 hover:border-saas-orange/40 rounded-2xl p-7 overflow-hidden transition-all duration-300 shadow-xl"
            >

              <div className="absolute inset-0 bg-gradient-to-br from-saas-orange/0 to-saas-orange/5 opacity-0 hover:opacity-100 transition duration-500"></div>

              <div className="relative z-10">

                <div className="flex items-center justify-between mb-6">

                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-saas-orange fill-saas-orange"
                      />
                    ))}
                  </div>

                  <div className="bg-saas-orange/10 p-2 rounded-lg border border-saas-orange/10">
                    <GitPullRequest className="w-4 h-4 text-saas-orange" />
                  </div>

                </div>

                <p className="text-gray-300 mb-8 leading-relaxed text-[15px]">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center">

                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-saas-orange/20"
                  />

                  <div>
                    <p className="font-semibold text-white text-base">
                      {testimonial.author}
                    </p>

                    <p className="text-gray-400 text-sm">
                      {testimonial.position}
                    </p>
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

export default TestimonialsSection;
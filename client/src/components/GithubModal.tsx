import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ShieldCheck,
  GitPullRequest,
  Brain,
  X,
} from "lucide-react";

interface GithubModalProps {
  open: boolean;
  onClose: () => void;
}

const GithubModal = ({
  open,
  onClose,
}: GithubModalProps) => {
  return (
    <AnimatePresence>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[95vw] sm:max-w-lg bg-[#101012] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl"
          >

            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-400 hover:text-white transition z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative p-5 sm:p-8">

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-orange-500/10 blur-[100px] rounded-full"></div>

              <div className="relative z-10">

                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 mx-auto mb-5 shadow-xl shadow-orange-500/20">

                  <Github className="w-8 h-8 sm:w-10 sm:h-10 text-white" />

                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
                  Connect GitHub
                </h2>

                <p className="text-sm sm:text-base text-gray-400 text-center leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto">
                  Connect repositories and let PRLens AI analyze pull requests,
                  detect vulnerabilities, and review architecture automatically.
                </p>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">

                  <div className="flex items-start gap-3 sm:gap-4 bg-white/5 border border-white/5 rounded-2xl p-4">

                    <div className="min-w-[48px] h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                      <GitPullRequest className="w-6 h-6 text-orange-500" />
                    </div>

                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">
                        AI Pull Request Reviews
                      </p>

                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Instant AI engineering intelligence
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3 sm:gap-4 bg-white/5 border border-white/5 rounded-2xl p-4">

                    <div className="min-w-[48px] h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-orange-500" />
                    </div>

                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">
                        Security Detection
                      </p>

                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        AI vulnerability and dependency analysis
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3 sm:gap-4 bg-white/5 border border-white/5 rounded-2xl p-4">

                    <div className="min-w-[48px] h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-orange-500" />
                    </div>

                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">
                        Architecture Intelligence
                      </p>

                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Technical debt and maintainability insights
                      </p>
                    </div>

                  </div>

                </div>

                <button 
                    onClick={() => {
                        window.location.href =
                        `${import.meta.env.VITE_API_URL}/api/auth/github`;
                    }}
                    className="w-full h-12 sm:h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-all duration-300 shadow-xl shadow-orange-500/20">

                  <Github className="w-5 h-5" />

                  Continue With GitHub

                </button>

                <p className="text-[11px] sm:text-xs text-center text-gray-500 mt-4 sm:mt-5 leading-6">
                  Demo modal UI — OAuth integration can be added later.
                </p>

              </div>

            </div>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default GithubModal;
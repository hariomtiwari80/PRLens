import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisible);

    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4"
        >

<motion.button
            type="button"
            aria-label="Back to top"
            whileHover={{ scale: 1.05 }}
            className="px-5 py-3 rounded-2xl border border-white/10 bg-[#111111]/90 backdrop-blur-xl text-white text-sm font-medium shadow-xl"
            onClick={scrollToTop}
          >
            Back to top
          </motion.button>

<motion.button
            type="button"
            aria-label="Back to top"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] border border-white/10 bg-[#111111]/90 backdrop-blur-xl flex items-center justify-center shadow-2xl overflow-hidden"
            >

            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                }}
                className="absolute w-10 h-10 sm:w-14 sm:h-14 border-t-[3px] border-orange-500 rounded-full opacity-80"
            />

            <div className="absolute inset-0 bg-orange-500/5 blur-2xl"></div>

            <ChevronUp className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 relative z-10" />

            </motion.button>

        </motion.div>
      )}
    </>
  );
};

export default BackToTop;
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import GithubModal from "@/components/GithubModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openNavbarModal, setOpenNavbarModal] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "#home" },
    { name: "Features", path: "#features" },
    { name: "Pricing", path: "#pricing" },
    { name: "Reviews", path: "#reviews" },
    { name: "FAQ", path: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        item.path.replace("#", "")
      );

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navAnimation = {
    hidden: {
      opacity: 0,
      y: -20,
    },

    visible: (i: number) => ({
      opacity: 1,
      y: 0,

      transition: {
        delay: i * 0.08,
        duration: 0.4,
      },
    }),
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-40 py-1 bg-saas-black/80 backdrop-blur-2xl border-b border-white/5"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-[72px] sm:h-20">

            <motion.a
              href="#home"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >

              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                PRLens
              </span>

            </motion.a>

            <div className="hidden md:flex items-center gap-8">

              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  custom={index}
                  variants={navAnimation}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    y: -2,
                  }}
                  className={`relative text-sm font-medium transition-all duration-300 group ${
                    activeSection === item.path.replace("#", "")
                      ? "text-saas-orange"
                      : "text-white hover:text-saas-orange"
                  }`}
                >

                  {item.name}

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-saas-orange transition-all duration-300 ${
                      activeSection === item.path.replace("#", "")
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />

                </motion.a>
              ))}

            </div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:flex items-center"
            >

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >

                <Button
                  onClick={() => setOpenNavbarModal(true)}
                  className="bg-gradient-to-r from-saas-orange to-orange-600 hover:opacity-90 text-white rounded-xl px-5 py-6 flex items-center gap-2 shadow-xl shadow-orange-500/20 transition-all duration-300"
                >
                  <Github size={18} />
                  Connect GitHub
                </Button>

              </motion.div>

            </motion.div>

            <div className="md:hidden flex items-center">

              <button
                onClick={toggleMenu}
                className="relative z-50 inline-flex items-center justify-center w-11 h-11 rounded-xl text-white bg-white/5 border border-white/10"
              >

                <AnimatePresence mode="wait">

                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}

                </AnimatePresence>

              </button>

            </div>

          </div>

        </div>

        <AnimatePresence>

          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -25,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: -25,
              }}

              transition={{ duration: 0.3 }}

              className="md:hidden bg-[#0f0f11]/95 backdrop-blur-2xl border-b border-white/5"
            >

              <div className="px-6 py-8 flex flex-col gap-6">

                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}

                    animate={{
                      opacity: 1,
                      x: 0,

                      transition: {
                        delay: index * 0.08,
                      },
                    }}

                    whileTap={{ scale: 0.98 }}

                    className={`text-lg font-medium transition-all duration-300 ${
                      activeSection === item.path.replace("#", "")
                        ? "text-saas-orange"
                        : "text-white hover:text-saas-orange"
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: 0.4,
                  }}

                  className="pt-2"
                >

                  <Button
                    onClick={() => {
                      setOpenNavbarModal(true);
                      setIsOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-saas-orange to-orange-600 hover:opacity-90 text-white rounded-xl py-6 flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20"
                  >

                    <Github size={18} />

                    Connect GitHub

                  </Button>

                </motion.div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </motion.nav>

      <GithubModal
        open={openNavbarModal}
        onClose={() => setOpenNavbarModal(false)}
      />
    </>
  );
};

export default Navbar;
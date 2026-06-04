import {
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "next-themes";

const ThemeToggle = () => {

  const {
    theme,
    setTheme,
  } = useTheme();

  return (

    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="w-12 h-12 rounded-2xl bg-[#111113] border border-white/5 flex items-center justify-center hover:bg-white/5 transition-all duration-300"
    >

      {theme === "dark" ? (

        <Sun className="w-5 h-5 text-yellow-400" />

      ) : (

        <Moon className="w-5 h-5 text-blue-400" />

      )}

    </button>
  );
};

export default ThemeToggle;
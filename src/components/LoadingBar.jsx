import React from "react";
import { motion } from "framer-motion";

const LoadingBar = () => {
  const totalBoxes = 18;

  return (
    <div className="flex gap-1 mt-2 justify-center">
      {Array.from({ length: totalBoxes }).map((_, i) => {
        const isGreen = i > 10;
        const isBlinking = i >= 4 && i <= 9; // 8th, 9th, 10th box

        return (
          <motion.div
            key={i}
            className={`w-2 h-4 md:w-3  md:h-6 rounded-sm ${
              isGreen ? "bg-gray-300" : "bg-[#a2db1a]"
            }`}
            animate={
              isBlinking
                ? { opacity: [1, 0.3, 1] }
                : {}
            }
            transition={
              isBlinking
                ? {
                    duration: 1,        // blink speed
                    repeat: Infinity,   // keep looping
                    repeatDelay: 2,     // wait before next cycle
                    delay: (i - 7) * 1, // stagger (8 → 0s, 9 → 1s, 10 → 2s)
                  } 
                  
                : {}
            }
          />
        );
      })}
    </div>
  );
};

export default LoadingBar;

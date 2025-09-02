import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay, shape = "circle", pattern = "float" }) => {
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
    ring: "rounded-full border-4 border-current bg-transparent",
    diamond: "rotate-45 rounded-lg",
  };

  const animations = {
    float: {
      y: ["0%", "100%", "0%"],
      x: ["0%", "100%", "0%"],
      rotate: [0, 360],
    },
    drift: {
      y: ["0%", "-50%", "0%"],
      x: ["0%", "30%", "0%"],
      rotate: [0, -180, 0],
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.3, 0.15],
    },
    swirl: {
      x: ["0%", "50%", "-50%", "0%"],
      y: ["0%", "50%", "-50%", "0%"],
      rotate: [0, 180, 360],
    },
  };

  return (
    <motion.div
      className={`absolute ${shapeClasses[shape]} ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={animations[pattern]}
      transition={{
        duration: 20,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;

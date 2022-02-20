//masonry
const breakpointColumnsObj = {
  default: 5,
  1600: 4,
  1100: 3,
  719: 2,
  560: 1,
};

//framer motion
const transition = {
  duration: 0.45,
  ease: [0.6, 0.01, -0.05, 0.9],
  staggerChildren: 0.5,
  delayChildren: 0.4,
};
const imageVariants = {
  exit: { translateY: "50%", opacity: 0, transition },
  enter: {
    translateY: "1%",
    opacity: 1,
    transition,
  },
  animate:{translateX: 0, opacity:1,translateY:0},

  itemVariants: { scale: 0, opacity: 0, transition },
};
const itemVariants = {
  enter: { y: "0%", opacity: 1, duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] },
};
export { breakpointColumnsObj, transition, imageVariants, itemVariants };

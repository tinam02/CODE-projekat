//masonry
const breakpointColumnsObj = {
  default: 5,
  1600: 4,
  1100: 3,
  719: 2,
  560: 1,
};

//framer motion
const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };
const imageVariants = {
  exit: { y: "50%", opacity: 0, transition },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};
export { breakpointColumnsObj, transition, imageVariants };

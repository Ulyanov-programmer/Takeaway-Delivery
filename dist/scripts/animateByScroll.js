import AnimateByScroll, { AnimationGroup } from "./modules/animateByScroll.src.js";
new AnimateByScroll(
  { repeatingAnimations: false, activeAnimationClass: "animation-end" },
  new AnimationGroup({
    selectors: "[data-animated-title]",
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 500
  }),
  new AnimationGroup({
    selectors: "[data-animated-text]",
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 1100
  }),
  new AnimationGroup({
    selectors: "[data-animated-button]",
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 2e3
  }),
  new AnimationGroup({
    selectors: "[data-animated-block]",
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 2200
  }),
  new AnimationGroup({
    selectors: "[data-animated-decor]",
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 2700
  })
);

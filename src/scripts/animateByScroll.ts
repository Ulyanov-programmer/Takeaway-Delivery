import AnimateByScroll, { AnimationGroup, AnimationMediaQuery } from './modules/animateByScroll.src.js'

new AnimateByScroll(
  { repeatingAnimations: false, activeAnimationClass: 'animation-end' },

  new AnimationGroup({
    selectors: '[data-animated-title]',
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 500,
  }),
  new AnimationGroup({
    selectors: '[data-animated-text]',
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 1100,
  }),
  new AnimationGroup({
    selectors: '[data-animated-button]',
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 2000,
  }),
  new AnimationGroup({
    selectors: '[data-animated-block]',
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 2200,
  }),
  new AnimationGroup({
    selectors: '[data-animated-decor]',
    animateStartCoeff: [0.5, 0.5],
    timeoutBeforeStart: 2700,
  }),

  // new AnimationGroup({
  //   selectors: '.animation_by_scroll__item_2',
  //   animateStartCoeff: [0.5, 0.5],
  //   timeoutBeforeStart: 1500,
  // },
  //   new AnimationMediaQuery({
  //     activationWidth: 768,
  //     defAnimStartCoeffs: [0.8, 0.8],
  //     timeoutBeforeStart: 300,
  //   })
  // ),
)
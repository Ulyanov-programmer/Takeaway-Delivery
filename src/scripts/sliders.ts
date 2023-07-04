import Swiper from '../libs/swiper/swiper-bundle.esm.browser.min.js'

new Swiper(`#menu-slider-1`, {
  spaceBetween: 20,
  slidesPerView: 2,
  centeredSlides: true,
  grabCursor: true,

  scrollbar: {
    el: '.menu-slider__slider-scrollbar',
    draggable: true,
  },

  breakpoints: {
    900: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: true,
    },
    700: {
      slidesPerView: 1.5,
      centeredSlides: false,
    },
    326: {
      slidesPerView: 1,
    },
  },
})
new Swiper(`#menu-slider-2`, {
  spaceBetween: 20,
  slidesPerView: 2,
  grabCursor: true,
  centeredSlides: true,

  scrollbar: {
    el: '.menu-slider__slider-scrollbar_2',
    draggable: true,
  },

  breakpoints: {
    900: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: true,
    },
    700: {
      slidesPerView: 1.5,
      centeredSlides: false,
    },
    326: {
      slidesPerView: 1,
    },
  },
})
new Swiper(`#menu-slider-3`, {
  spaceBetween: 20,
  slidesPerView: 2,
  centeredSlides: true,
  grabCursor: true,

  scrollbar: {
    el: '.menu-slider__slider-scrollbar_3',
    draggable: true,
  },

  breakpoints: {
    900: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: true,
    },
    700: {
      slidesPerView: 1.5,
      centeredSlides: false,
    },
    326: {
      slidesPerView: 1,
    },
  },
})

new Swiper(`.steps__slider`, {
  spaceBetween: 20,
  slidesPerView: 3,
  watchOverflow: true,
  grabCursor: true,

  breakpoints: {
    768: {
      slidesPerView: 3,
      centeredSlides: false,
    },
    500: {
      slidesPerView: 1.7,
      centeredSlides: true,
    },
    326: {
      slidesPerView: 1,
    },
  },
})

/* HINTS 
  grabCursor: true,

  navigation: {
    nextEl: `.class__button-next`, prevEl: `.class__button-prev`,
    disabledClass: 'unactive',
  },
  pagination: { 
    el: `.class__pagination`, 
    clickable: true, 
  },

  preloadImages: true,
  lazy: {
    loadOnTransitionStart: false,
    loadPrevnext: true,
  },

  autoplay:{
    delay: 3000,
    stopOnLastSlide: false,
  },
  
  ? Infinite scrolling.
  loop: false,

  ? Changes the slider settings based on the width of the screen.
  breakpoints: {
    // ? when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },

  ? Changes the height of the slider in runtime depending on the height of the slides.
  autoHeight: true,

  ? If there are no more than one slides, the slider stops working.
  watchOverflow: true,

  direction: 'horizontal' or 'vertical',

  ? Indent between slides.
  spaceBetween: 150,

  ? Enable parallax effect.
  parallax: true,
  ?? For working add and set attributes on elements in slide:
  data-swiper-parallax='toRight_InPixels'
  data-swiper-parallax-duration='1000'

  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  }

  ? Thumbs construction:
  new Swiper(`.thumbs`, {
    spaceBetween: 15,
    slidesPerView: 6,
    watchOverflow: true,
  })

  new Swiper(`.main`, {
    watchOverflow: true,

    thumbs: {
      swiper: demosSwiper,
      slideThumbActiveClass: 'active',
    },
  })
  ? Multiple rows
  grid: {
    rows: 2,
    fill: 'row',
  },
*/
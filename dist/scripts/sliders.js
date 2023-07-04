import Swiper from "../libs/swiper/swiper-bundle.esm.browser.min.js";
new Swiper(`#menu-slider-1`, {
  spaceBetween: 20,
  slidesPerView: 2,
  centeredSlides: true,
  grabCursor: true,
  scrollbar: {
    el: ".menu-slider__slider-scrollbar",
    draggable: true
  },
  breakpoints: {
    900: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: true
    },
    700: {
      slidesPerView: 1.5,
      centeredSlides: false
    },
    326: {
      slidesPerView: 1
    }
  }
});
new Swiper(`#menu-slider-2`, {
  spaceBetween: 20,
  slidesPerView: 2,
  grabCursor: true,
  centeredSlides: true,
  scrollbar: {
    el: ".menu-slider__slider-scrollbar_2",
    draggable: true
  },
  breakpoints: {
    900: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: true
    },
    700: {
      slidesPerView: 1.5,
      centeredSlides: false
    },
    326: {
      slidesPerView: 1
    }
  }
});
new Swiper(`#menu-slider-3`, {
  spaceBetween: 20,
  slidesPerView: 2,
  centeredSlides: true,
  grabCursor: true,
  scrollbar: {
    el: ".menu-slider__slider-scrollbar_3",
    draggable: true
  },
  breakpoints: {
    900: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: true
    },
    700: {
      slidesPerView: 1.5,
      centeredSlides: false
    },
    326: {
      slidesPerView: 1
    }
  }
});
new Swiper(`.steps__slider`, {
  spaceBetween: 20,
  slidesPerView: 3,
  watchOverflow: true,
  grabCursor: true,
  breakpoints: {
    768: {
      slidesPerView: 3,
      centeredSlides: false
    },
    500: {
      slidesPerView: 1.7,
      centeredSlides: true
    },
    326: {
      slidesPerView: 1
    }
  }
});

import Swiper from 'swiper';
import {
  Navigation,
  EffectFade,
  Pagination,
  Autoplay,
  EffectCreative,
  Controller,
} from 'swiper/modules';

// styles ======================================================================

// base styles
import '../../scss/base/swiper.scss';

// all styles
// import "../../scss/libs/swiper.scss";

// all styles from node_modules
// import 'swiper/css';

// launch ======================================================================

let tabsSlider = null;
let heroProjectSlider = null;
let heroSlider = null;

// hero slide text
const setSlideText = swiper => {
  const target = document.querySelector(
    '.hero__slider-nav-wrap .hero__slide-text'
  );
  const text =
    swiper.slides[swiper.activeIndex].querySelector('.hero__slide-text');
  target.innerHTML = text.innerHTML;
};
// autoplay progress
const setAutoplayProgress = (s, time, progress) => {
  const progressLine = document.querySelector('.sl-fraction__progress');
  progressLine.style.setProperty('--progress', 1 - progress);
};

function initSliders() {
  if (document.querySelector('.our-team__slider')) {
    new Swiper('.our-team__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      spaceBetween: 30,
      autoHeight: false,
      speed: 800,

      // navigation
      navigation: {
        prevEl: '.our-team__slider-btn_prev',
        nextEl: '.our-team__slider-btn_next',
      },

      // events
      on: {},
    });
  }
  if (document.querySelector('.hero__slider')) {
    if (window.innerWidth <= 768) {
      heroSlider = new Swiper('.hero__slider', {
        modules: [Navigation, EffectFade, Pagination],
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: false,
        speed: 800,
        allowTouchMove: false,
        updateOnWindowResize: true,

        // effects
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },

        // navigation
        navigation: {
          prevEl: '.hero__slider-arr_prev',
          nextEl: '.hero__slider-arr_next',
        },

        // pagination
        pagination: {
          el: '#projects-sl-fraction',
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            const isSingletTotal = total < 10 ? '0' : ' ';
            const isSingleCurrent = current < 10 ? '0' : ' ';
            return isSingleCurrent + current + ' / ' + isSingletTotal + total;
          },
        },

        // events
        on: {
          afterInit: swiper => {
            setSlideText(swiper);
          },
          slideChange: swiper => {
            setSlideText(swiper);
          },
        },
      });
    } else {
      heroSlider = new Swiper('.hero__slider', {
        modules: [Navigation, EffectFade, Pagination, Autoplay],
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: false,
        speed: 800,
        allowTouchMove: false,
        updateOnWindowResize: true,

        // effects
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },

        // autoplay
        autoplay: {
          delay: 8000,
          disableOnInteraction: false,
        },

        // navigation
        navigation: {
          prevEl: '.hero__slider-arr_prev',
          nextEl: '.hero__slider-arr_next',
        },

        // pagination
        pagination: {
          el: '#projects-sl-fraction',
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            const isSingletTotal = total < 10 ? '0' : ' ';
            const isSingleCurrent = current < 10 ? '0' : ' ';
            return isSingleCurrent + current + ' / ' + isSingletTotal + total;
          },
        },

        // events
        on: {
          afterInit: swiper => {
            setSlideText(swiper);
            swiper.autoplay.stop();
            if (document.documentElement.classList.contains('_loaded')) {
              setTimeout(() => {
                swiper.autoplay.start();
              }, 2000);
            }
          },
          slideChange: swiper => {
            setSlideText(swiper);
          },
          autoplayTimeLeft: (s, time, progress) => {
            setAutoplayProgress(s, time, progress);
          },
        },
      });
    }
  }
  if (document.querySelector('.projects__tabs')) {
    if (window.innerWidth <= 768 && !tabsSlider) {
      tabsSlider = new Swiper('.projects__tabs', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        autoHeight: false,
        speed: 800,
        updateOnWindowResize: true,
        slideToClickedSlide: true,
        freeMode: true,
      });
    } else if (window.innerWidth > 768 && tabsSlider) {
      tabsSlider.destroy();
      tabsSlider = null;
    }
  }
  if (document.querySelector('.hero-project__slider')) {
    if (window.innerWidth <= 768) {
      heroProjectSlider = new Swiper('.hero-project__slider', {
        modules: [Navigation, Pagination],
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        centeredSlides: false,
        loop: true,
        updateOnWindowResize: true,

        // navigation
        navigation: {
          prevEl: '.hero__slider-arr_prev',
          nextEl: '.hero__slider-arr_next',
        },

        // pagination

        // pagination
        pagination: {
          el: '#project-sl-fraction',
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            const isSingletTotal = total < 10 ? '0' : ' ';
            const isSingleCurrent = current < 10 ? '0' : ' ';
            return isSingleCurrent + current + ' / ' + isSingletTotal + total;
          },
        },
      });
    } else if (window.innerWidth > 768) {
      heroProjectSlider = new Swiper('.hero-project__slider', {
        modules: [Navigation, Pagination, EffectCreative, Autoplay],
        observer: true,
        observeParents: true,
        slidesPerView: 4,
        centeredSlides: false,
        loop: true,
        updateOnWindowResize: true,

        // autoplay
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
        },

        // effects
        effect: 'creative',
        creativeEffect: {
          limitProgress: 10,
          prev: {
            scale: 0.85,
            translate: ['-45%', 0, 0],
          },
          next: {
            scale: 0.85,
            translate: ['45%', 0, 0],
          },
        },

        // navigation
        navigation: {
          prevEl: '.hero__slider-arr_prev',
          nextEl: '.hero__slider-arr_next',
        },

        // pagination
        pagination: {
          el: '#project-sl-fraction',
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            const isSingletTotal = total < 10 ? '0' : ' ';
            const isSingleCurrent = current < 10 ? '0' : ' ';
            return isSingleCurrent + current + ' / ' + isSingletTotal + total;
          },
        },

        // events
        on: {
          autoplayTimeLeft: (s, time, progress) => {
            setAutoplayProgress(s, time, progress);
          },
          init: swiper => {
            swiper.autoplay.stop();
            if (document.documentElement.classList.contains('_loaded')) {
              setTimeout(() => {
                swiper.autoplay.start();
              }, 2000);
            }
          },
        },
      });
    }
  }
  if (document.querySelector('.project-info__slider')) {
    new Swiper('.project-info__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoHeight: false,
      speed: 800,
      allowTouchMove: true,
      loop: true,

      // navigation
      navigation: {
        prevEl: '.project-info__slider-arr_prev',
        nextEl: '.project-info__slider-arr_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          allowTouchMove: false,
        },
      },
    });
  }
  if (document.querySelector('.project-layout__slider')) {
    new Swiper('.project-layout__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoHeight: false,
      speed: 800,
      allowTouchMove: true,
      loop: true,
      // navigation
      navigation: {
        prevEl: '.project-layout__slider-arr_prev',
        nextEl: '.project-layout__slider-arr_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          allowTouchMove: false,
        },
      },
    });
  }
  if (document.querySelector('.project-interiors__slider')) {
    new Swiper('.project-interiors__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoHeight: false,
      speed: 800,
      allowTouchMove: true,
      loop: true,
      // navigation
      navigation: {
        prevEl: '.project-interiors__slider-arr_prev',
        nextEl: '.project-interiors__slider-arr_next',
      },

      // breakpoints
      breakpoints: {
        768: {
          allowTouchMove: false,
        },
      },
    });
  }
  if (document.querySelector('.privileges-company-info__slider')) {
    new Swiper('.privileges-company-info__slider', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoHeight: false,
      speed: 800,
      allowTouchMove: false,
      loop: true,
      // navigation
      navigation: {
        prevEl: '.privileges-company-info__slider-arr_prev',
        nextEl: '.privileges-company-info__slider-arr_next',
      },
    });
  }
  if (document.querySelector('.hero-portfolio__slider')) {
    const portfolioThumbs = new Swiper('.hero-portfolio__thumbs', {
      modules: [Controller],
      observer: true,
      observeParents: true,
      spaceBetween: 30,
      slidesPerView: 2.4,
      slideToClickedSlide: true,
    });
    const portfolioSlider = new Swiper('.hero-portfolio__slider', {
      modules: [Navigation, Pagination, EffectFade, Controller],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      updateOnWindowResize: true,

      // effects
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },

      // navigation
      navigation: {
        prevEl: '.hero-portfolio__slider-arr_prev',
        nextEl: '.hero-portfolio__slider-arr_next',
      },

      // pagination
      pagination: {
        el: '.hero-portfolio__slider-fraction',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          const isSingletTotal = total < 10 ? '0' : ' ';
          const isSingleCurrent = current < 10 ? '0' : ' ';
          return isSingleCurrent + current + ' / ' + isSingletTotal + total;
        },
      },

      // events
      on: {
        init: swiper => {
          swiper.update();
        },
      },
    });
    portfolioSlider.controller.control = portfolioThumbs;
    portfolioThumbs.controller.control = portfolioSlider;
  }
}

// slider scroll ===============================================================
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar =
        sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

//=================================================================================================================

window.addEventListener('load', function (e) {
  document.documentElement.classList.add('_loaded');
  initSliders();
  //initSlidersScroll();
});

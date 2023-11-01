import Swiper from 'swiper';
import { Navigation, EffectFade, Pagination, Autoplay } from 'swiper/modules';

// styles ======================================================================

// base styles
import '../../scss/base/swiper.scss';

// all styles
// import "../../scss/libs/swiper.scss";

// all styles from node_modules
// import 'swiper/css';

// launch ======================================================================
let tabsSlider = null;

// hero slide text
const setSlideText = swiper => {
  const target = document.querySelector(
    '.hero__slider-nav-wrap .hero__slide-text'
  );
  const text =
    swiper.slides[swiper.activeIndex].querySelector('.hero__slide-text');
  target.innerHTML = text.innerHTML;
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
    new Swiper('.hero__slider', {
      modules: [Navigation, EffectFade, Pagination, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
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
        delay: 7000,
        disableOnInteraction: false,
        enabled: false,
      },

      // navigation
      navigation: {
        prevEl: '.hero__slider-arr_prev',
        nextEl: '.hero__slider-arr_next',
      },

      // pagination
      pagination: {
        el: '.sl-fraction__content',
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
        autoplayTimeLeft: (s, time, progress) => {
          const progressLine = document.querySelector('.sl-fraction__progress');
          progressLine.style.setProperty('--progress', 1 - progress);
        },
      },

      // breakpoints
      breakpoints: {
        768: {
          autoplay: { enabled: true },
          autoHeight: false,
        },
      },
    });
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
      });
    } else if (window.innerWidth > 768 && tabsSlider) {
      tabsSlider.destroy();
      tabsSlider = null;
    }
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
  initSliders();
  //initSlidersScroll();
});

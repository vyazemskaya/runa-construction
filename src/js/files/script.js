import { isMobile, removeClasses } from './functions.js';
import { modules } from './modules.js';

window.addEventListener('load', function () {
  const md = window.matchMedia('(max-width: 768px)').matches;

  // show page body
  document.body.style.opacity = '1';

  // tabs
  const tabs = document.querySelectorAll('[data-tab]');
  if (tabs.length) {
    tabs.forEach(tab => {
      const parent = tab.closest('.projects__tabs-col');
      const target = tab.closest('.projects__tabs-wrapper');
      const moveTabs = () => {
        if (window.innerWidth <= 768) {
          target.appendChild(tab);
        } else if (window.innerWidth > 768) {
          parent.appendChild(tab);
        }
      };
      moveTabs();
      window.addEventListener('resize', moveTabs);
    });
  }

  // --------------------------------------------------------------------------

  // animations
  const setAnimations = () => {
    // gsap plugins
    gsap.registerPlugin(ScrollTrigger);

    // mainpage animations
    if (window.innerWidth > 768 && document.querySelector('.mainpage')) {
      // hero anim
      const tl1 = gsap.timeline();
      tl1
        .to('.mainpage__hero', {
          '--line': '100%',
          duration: 1.5,
        })
        .to('.mainpage__hero', {
          '--opacity': 1,
          duration: 1.5,
        })
        .to(
          '.mainpage .hero__btn',
          {
            opacity: 1,
            duration: 1.5,
          },
          2.3
        );

      // about company anim
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-company',
          start: '20% bottom',
          once: true,
        },
      });
      tl2
        .to('.about-company', {
          '--l1': 'calc(145.6rem + (192rem - 145.6rem - 15rem) / 2 - 2px)',
          '--l2': 'calc(100% + 18rem - 2px)',
          '--l3': 'calc(100% + 2.5rem - 4px)',
          '--l4': '100%',
          duration: 2,
        })
        .fromTo(
          '.about-company__image-wrap',
          {
            'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          },
          {
            '--imgX': 'translateX(100%)',
            '--opacity': 0.3,
            'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.5,
          }
        )
        .fromTo(
          '.about-company__txt-wrap',
          {
            'clip-path': 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          },
          {
            'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.2,
          }
        )
        .to(
          '.about-company__link',
          {
            opacity: 1,
          },
          3.5
        )
        .to(
          '.about-company__title',
          {
            opacity: 1,
            duration: 2,
          },
          2
        );
    }
  };
  setAnimations();

  // --------------------------------------------------------------------------

  // handler functions
  const onClickHandler = e => {
    if (e.target.closest('[data-tab]')) {
      const parent = e.target
        .closest('[data-tab]')
        .closest('.projects__tabs-wrapper');
      removeClasses(parent.querySelectorAll('[data-tab]'), '_active');
      e.target.closest('[data-tab]').classList.add('_active');
    }
  };

  // --------------------------------------------------------------------------

  // document events
  document.addEventListener('click', onClickHandler);

  // window events
  window.addEventListener('resize', setAnimations);
});

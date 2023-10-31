import { isMobile } from './functions.js';
import { modules } from './modules.js';

window.addEventListener('load', function () {
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

  // main page hero anim

  window.addEventListener('resize', setAnimations);
});

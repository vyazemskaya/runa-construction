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
  // gsap plugins
  gsap.registerPlugin(ScrollTrigger);

  // gsap defaults
  gsap.defaults({
    duration: 1.5,
    delay: 0,
    ease: 'sine.out',
  });

  // variables
  const CLIP_W1 = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
  const CLIP_W2 = 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)';
  const CLIP_H1 = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
  const CLIP_H2 = 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)';

  // gsap effects
  const gsapEffects = [
    {
      id: 'fadeIn',
      animate: 'fromTo',
      props: { opacity: 0 },
      props2: { opacity: 1, duration: 1.5 },
    },
    {
      id: 'scaleY',
      animate: 'fromTo',
      props: { '--scaleY': 0 },
      props2: { '--scaleY': 1, duration: 1 },
    },
    {
      id: 'scaleX',
      animate: 'fromTo',
      props: { '--scaleX': 0 },
      props2: { '--scaleX': 1, duration: 1 },
    },
    {
      id: 'scale',
      animate: 'fromTo',
      props: { '--scaleX': 0, '--scaleY': 0 },
      props2: { '--scaleX': 1, '--scaleY': 1, duration: 1 },
    },
    {
      id: 'clipT2B',
      animate: 'fromTo',
      props: { 'clip-path': CLIP_H1 },
      props2: { 'clip-path': CLIP_H2, duration: 1 },
    },
    {
      id: 'clipL2R',
      animate: 'fromTo',
      props: { 'clip-path': CLIP_W1 },
      props2: { 'clip-path': CLIP_W2, duration: 1 },
    },
    {
      id: 'fadeImg',
      animate: 'fromTo',
      props: {
        '--opacity': 1,
        '--x': 'translateX(-100%)',
        'clip-path': CLIP_W1,
      },
      props2: {
        '--opacity': 0.3,
        '--x': 'translateX(100%)',
        'clip-path': CLIP_W2,
        duration: 2,
      },
    },
  ];
  gsapEffects.forEach(effect => {
    gsap.registerEffect({
      name: effect.id,
      defaults: { duration: 1.5 },
      extendTimeline: true,
      effect(targets, config) {
        console.log(targets);
        if (effect.animate === 'from') {
          return gsap.from(targets, { ...effect.props, ...config });
        } else if (effect.animate === 'fromTo') {
          return gsap.fromTo(
            targets,
            { ...effect.props, ...config },
            { ...effect.props2 }
          );
        } else {
          return gsap.to(targets, { ...effect.props, ...config });
        }
      },
    });
  });

  // set animations
  const setAnimations = () => {
    // mainpage animations
    if (window.innerWidth > 768 && document.querySelector('.scroll-trigger')) {
      // hero anim
      if (document.querySelector('.mainpage__hero')) {
        gsap
          .timeline()
          .scaleY('.mainpage__hero')
          .fadeIn(['.hero__title', '.hero__text', '.hero__facts'], '+=0.5')
          .fadeIn('.hero__btn', { duration: 1.2 }, 2.3);
      }
      // about company anim
      if (document.querySelector('.mainpage__about-company')) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.mainpage__about-company',
              start: '20% bottom',
              once: true,
            },
          })
          .scale('.mainpage__about-company')
          .fadeIn('.about-company__title', 1.5)
          .fadeImg('.about-company__image-wrap', 2.5)
          .clipT2B('.about-company__txt-wrap', 3.5)
          .fadeIn('.about-company__link', 3.5);
      }
      // services anim
      if (document.querySelector('.mainpage__services')) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.mainpage__services',
              start: '10% bottom',
              once: true,
            },
          })
          .scale('.mainpage__services')
          .fadeIn(['.services__title', '.services__btn'], 0);
        const servicesCards = document.querySelectorAll('.services__card');
        if (servicesCards.length) {
          servicesCards.forEach(servicesCard => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: servicesCard,
                  start: '40% bottom',
                  once: true,
                },
              })
              .scale(servicesCard)
              .clipL2R(
                servicesCard.querySelector('.card-services__text-wrap'),
                0.5
              )
              .fadeIn(
                servicesCard.querySelector('.card-services__image-wrap'),
                0.5
              );
          });
        }
      }
      // privileges anim
      if (document.querySelector('.mainpage__privileges')) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.mainpage__privileges',
              start: '20% bottom',
              once: true,
            },
          })
          .scale('.mainpage__privileges')
          .fadeIn('.privileges__title')
          .fadeIn(['.privileges__image', '.privileges__card-image'], 1.5)
          .clipL2R(document.querySelectorAll('.privileges__card_text'), 2.3);
      }
      // team anim
      if (document.querySelector('.mainpage__team')) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.mainpage__team',
              start: '20% bottom',
              once: true,
            },
          })
          .scale('.mainpage__team')
          .fadeIn('.team__title')
          .fadeImg('.team__image-wrap', 1.5)
          .clipL2R('.team__group', 2.5)
          .clipT2B('.team__text', 3.5);
      }
      // request anim
      if (document.querySelector('.mainpage__request')) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.mainpage__request',
              start: '20% bottom',
              once: true,
            },
          })
          .scale('.mainpage__request')
          .fadeIn('.request__image')
          .clipL2R('.request__text-wrap', 1.5)
          .clipL2R('.request__form'),
          2;
      }
      // out team
      if (document.querySelector('.mainpage__our-team')) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.mainpage__our-team',
              start: '20% bottom',
              once: true,
            },
          })
          .scale('.mainpage__our-team')
          .fadeIn('.our-team__wrapper')
          .clipL2R(['.our-team__title', '.our-team__text'], 2)
          .fadeIn('.our-team__slider-control', 3);
      }
      // footer anim
      if (document.querySelector('.footer')) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.footer',
              start: '20% bottom',
              once: true,
            },
          })
          .scale('.footer');
      }
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
  window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
  });
});

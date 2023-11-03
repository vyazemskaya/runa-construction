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
    // variables
    const LINE_FW = '161rem';
    const LINE_FH = '100%';
    const LINE_H = 'calc(100% + 18rem - 2px)';
    const CLIP_W1 = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
    const CLIP_W2 = 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)';
    const CLIP_H1 = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
    const CLIP_H2 = 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)';

    // gsap plugins
    gsap.registerPlugin(ScrollTrigger);

    // gsap defaults
    gsap.defaults({
      duration: 1.5,
    });

    // gsap effects
    const gsapEffects = [
      {
        id: 'fadeIn',
        animate: 'to',
        props: { opacity: 1 },
      },
      {
        id: 'setFH',
        animate: 'to',
        props: { '--line-fh': LINE_FH, duration: 2 },
      },
      {
        id: 'setFW',
        animate: 'to',
        props: { '--line-fw': LINE_FW, duration: 2 },
      },
      {
        id: 'clipT2B',
        animate: 'fromTo',
        props: { 'clip-path': CLIP_H1 },
        props2: { 'clip-path': CLIP_H2, duration: 1.2 },
      },
      {
        id: 'clipL2R',
        animate: 'fromTo',
        props: { 'clip-path': CLIP_W1 },
        props2: { 'clip-path': CLIP_W2, duration: 1.2 },
      },
    ];

    gsapEffects.forEach(effect => {
      gsap.registerEffect({
        name: effect.id,
        defaults: { duration: 1.5 },
        extendTimeline: true,
        effect(targets, config) {
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

    // mainpage animations
    if (window.innerWidth > 768 && document.querySelector('.mainpage')) {
      // hero anim
      gsap
        .timeline()
        .setFH('.mainpage__hero')
        .fadeIn(['.hero__title', '.hero__text'])
        .fadeIn('.hero__btn', {}, 2.3);

      // about company anim
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.mainpage__about-company',
            start: '20% bottom',
            once: true,
          },
        })
        .to('.mainpage__about-company', {
          '--line-fw': LINE_FW,
          '--line-fh': LINE_FH,
          '--l1': 'calc(100% + 2.5rem - 4px)',
          '--l2': 'calc(100% + 18rem - 2px)',
          duration: 2,
        })
        .fadeIn('.about-company__title', 2)
        .fromTo(
          '.about-company__image-wrap',
          {
            'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          },
          {
            '--imgX': 'translateX(100%)',
            '--opacity': 0.3,
            'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
          2.5
        )
        .clipT2B('.about-company__txt-wrap', 3.5)
        .fadeIn('.about-company__link', 3.5);

      // services anim
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.mainpage__services',
            start: '10% bottom',
            once: true,
          },
        })
        .to('.mainpage__services', {
          '--line-fw': LINE_FW,
          '--l1': 'calc(100% + 18rem)',
          duration: 5,
        })
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
            .clipL2R(servicesCard.querySelector('.card-services__text-wrap'))
            .setFW(servicesCard, 0)
            .fadeIn(
              servicesCard.querySelector('.card-services__image-wrap'),
              0
            );
        });
      }

      // privileges anim
      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: '.mainpage__privileges',
          start: '10% bottom',
          once: true,
        },
      });
      tl4.to(['.mainpage__privileges', '.privileges__title'], {
        '--line-h': LINE_H,
        opacity: 1,
      });
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

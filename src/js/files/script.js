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
      props: { opacity: 0, visibility: 'hidden' },
      props2: { opacity: 1, visibility: 'visible', duration: 1.5 },
    },
    {
      id: 'toLeft',
      animate: 'fromTo',
      props: { xPercent: 100 },
      props2: { xPercent: 0, duration: 1.5 },
    },
    {
      id: 'fadeToTop',
      animate: 'fromTo',
      props: { yPercent: 40, opacity: 0, visibility: 'hidden' },
      props2: { yPercent: 0, opacity: 1, visibility: 'visible', duration: 1 },
    },
    {
      id: 'fadeToLeft',
      animate: 'fromTo',
      props: { xPercent: 80, opacity: 0, visibility: 'hidden' },
      props2: { xPercent: 0, opacity: 1, visibility: 'visible', duration: 1 },
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
    let mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      if (document.querySelector('.scroll-trigger')) {
        // hero anim
        if (document.querySelector('.mainpage__hero')) {
          gsap
            .timeline()
            .scaleY('.mainpage__hero')
            .fadeIn(['.hero__title', '.hero__text', '.hero__facts'], '+=0.5')
            .fadeIn('.hero__btn', { duration: 1.2 }, 2.3);
        }
        if (document.querySelector('.projects-page__hero')) {
          gsap
            .timeline()
            .scaleY('.projects-page__hero')
            .fadeIn(
              ['.hero__title', '.hero__text', '.hero__slider-control'],
              '+=0.5'
            )
            .fadeIn('.hero__btn', { duration: 1.2 }, 2.3);
        }
        if (document.querySelector('.project-page__hero')) {
          gsap
            .timeline()
            .scaleY('.project-page__hero')
            .fadeIn(['.hero-project__slider', '.hero-project__text-wrap'])
            .fadeIn('.hero-project__group');
        }
        if (document.querySelector('.portfolio-page__hero')) {
          gsap
            .timeline()
            .scaleY('.portfolio-page__hero')
            .fadeIn('.hero-portfolio__title')
            .clipT2B('.hero-portfolio__text', 2)
            .fadeIn('.swiper-slide-active .slide-hero-portfolio__content', 2)
            .toLeft('.hero-portfolio__thumbs-carousel', 3)
            .fadeIn(
              ['.hero-portfolio__slider-control', '.hero-portfolio__group'],
              3
            );
        }
        if (document.querySelector('.about-company-page__hero')) {
          gsap
            .timeline()
            .scale('.about-company-page__hero')
            .fadeIn('.hero__title-txt', 1.2)
            .fadeIn('.hero__info', 1.2)
            .clipL2R('.hero__text', 2);
        }
        // about company anim
        if (document.querySelector('.mainpage__about-company')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.mainpage__about-company',
                start: 'top 70%',
                once: true,
                invalidateOnRefresh: false,
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
                start: 'top 70%',
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
                    start: 'top 60%',
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
                start: 'top 70%',
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
                start: 'top 70%',
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
        if (document.querySelector('.request')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.request',
                start: 'top 60%',
                once: true,
              },
            })
            .scale('.request')
            .fadeIn('.request__image')
            .fadeIn('.request__text-wrap', 1.5)
            .clipL2R('.request__input', 2.5)
            .fadeIn(['.request__checkbox', '.request__btn'], 3.5);
        }
        // our team
        if (document.querySelector('.mainpage__our-team')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.mainpage__our-team',
                start: 'top 40%',
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
                once: true,
              },
            })
            .scale('.footer');
        }
        // projects anim
        if (document.querySelector('.projects-page__projects')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.projects-page__projects',
                start: '20% bottom',
                once: true,
              },
            })
            .scale('.projects-page__projects')
            .fadeIn(['.projects__title'], 0)
            .fadeIn(['.tab__text', '.projects__card']);
        }
        // image text anim
        if (document.querySelector('.projects-page__image-text')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.projects-page__image-text',
                start: '20% bottom',
                once: true,
              },
            })
            .scale('.projects-page__image-text')
            .fadeIn('.image-text__title', 1)
            .fadeImg('.image-text__image-wrap', { duration: 1 }, 0)
            .clipT2B('.image-text__body', 2);
        }
        // project info anim
        if (document.querySelector('.project-page__project-info')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.project-page__project-info',
                start: '20% bottom',
                once: true,
              },
            })
            .scale('.project-page__project-info')
            .fadeIn('.project-info__title', 1)
            .clipT2B('.project-info__text-wrap', 2)
            .fadeIn('.project-info__slider', 2)
            .fadeIn('.project-info__slider-nav');
        }
        // project interiors anim
        if (document.querySelector('.project-page__interiors')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.project-page__interiors',
                start: '20% bottom',
                once: true,
              },
            })
            .scale('.project-page__interiors')
            .fadeIn('.project-interiors__title', 1)
            .fadeIn('.project-interiors__slider-nav', 1)
            .fadeIn('.project-interiors__slider', 2);
        }
        // project layout anim
        if (document.querySelector('.project-page__project-layout')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.project-page__project-layout',
                start: '20% bottom',
                once: true,
              },
            })
            .scale('.project-page__project-layout')
            .fadeIn('.project-layout__title', 1)
            .clipT2B('.project-layout__text-wrap', 2)
            .fadeIn('.project-layout__slider', 2)
            .fadeIn('.project-layout__slider-nav');
        }
        // portfolio anim
        if (document.querySelector('.portfolio-page__portfolio')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.portfolio-page__portfolio',
                start: '20% bottom',
                once: true,
              },
            })
            .scale('.portfolio-page__portfolio')
            .fadeIn('.portfolio__title', 0);
          const portfolioRows = document.querySelectorAll('.portfolio__row');
          if (portfolioRows.length) {
            portfolioRows.forEach(portfolioRow => {
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: portfolioRow,
                    once: true,
                    start: 'top 70%',
                  },
                })
                .scale(portfolioRow)
                .fadeIn(portfolioRow.querySelectorAll('.portfolio__image-wrap'))
                .fadeIn(portfolioRow.querySelectorAll('.portfolio__info'), 1.5);
            });
          }
        }
        // contacts anim
        if (document.querySelector('.contacts-page__contacts')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.contacts-page__contacts',
                start: '20% bottom',
                once: true,
              },
            })
            .scale('.contacts-page__contacts')
            .fadeIn('.contacts__title', 1)
            .fadeIn('.contacts__image-wrap', 1.5)
            .fadeIn(
              ['.contacts__tel', '.contacts__btn', '.contacts__info'],
              2.5
            );
        }
        if (document.querySelector('.contacts__map')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.contacts__map',
                start: '20% bottom',
                once: true,
              },
            })
            .fadeToTop('.contacts__map');
        }
        // company info anim
        if (document.querySelector('.about-company-page__company-info')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.about-company-page__company-info',
                start: '20% bottom',
                once: true,
              },
            })
            .scale('.about-company-page__company-info')
            .fadeIn('.company-info', 0);
          const aboutCompanySections = document.querySelectorAll(
            '.company-info__section'
          );
          if (aboutCompanySections.length) {
            aboutCompanySections.forEach(aboutCompanySection => {
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: aboutCompanySection,
                    once: true,
                    start: 'top 70%',
                  },
                })
                .scale(aboutCompanySection)
                .fadeIn(
                  aboutCompanySection.querySelector(
                    '.info-company-info__heading'
                  )
                )
                .clipT2B(
                  aboutCompanySection.querySelectorAll(
                    '.info-company-info__text'
                  ),
                  2
                )
                .fadeIn(
                  aboutCompanySection.querySelector(
                    '.info-company-info__image-wrap'
                  ),
                  2
                )
                .fadeIn(
                  aboutCompanySection.querySelector(
                    '.numbers-company-info__image-wrap'
                  ),
                  1.2
                )
                .fadeIn(
                  aboutCompanySection.querySelectorAll(
                    '.numbers-company-info__group'
                  ),
                  2
                )
                .fadeIn(
                  aboutCompanySection.querySelector(
                    '.privileges-company-info__heading'
                  ),
                  1
                )
                .clipT2B(
                  aboutCompanySection.querySelector(
                    '.privileges-company-info__text'
                  ),
                  1.5
                )
                .fadeIn(
                  aboutCompanySection.querySelector(
                    '.privileges-company-info__btn'
                  ),
                  2.5
                )
                .fadeToLeft(
                  aboutCompanySection.querySelector(
                    '.privileges-company-info__slider'
                  ),
                  2.5
                )
                .fadeIn(
                  aboutCompanySection.querySelector(
                    '.privileges-company-info__slider-control'
                  ),
                  3.5
                );
            });
          }
        }
        // company methods anim
        if (document.querySelector('.about-company-page__methods')) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: '.about-company-page__methods',
                start: 'top 70%',
                once: true,
              },
            })
            .scale('.about-company-page__methods')
            .fromTo(
              '.company-methods__bg-text',
              {
                opacity: 0,
                xPercent: 80,
              },
              {
                opacity: 0.1,
                xPercent: 0,
                duration: 1,
              },
              0
            )
            .fadeIn(
              ['.company-methods__group', '.company-methods__image-wrap'],
              1.2
            )
            .clipT2B('.company-methods__text', 1.2)
            .fadeIn('.company-methods__link');
        }
      }
    });
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
  // window.addEventListener('resize', setAnimations);
  window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
  });
});

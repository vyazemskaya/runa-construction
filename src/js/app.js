// full logging system)
window['FLS'] = true;

// main styles
// import '../scss/style.scss';

// ================================================================================================================
// < functional > =================================================================================================
// ================================================================================================================
import './files/functions.js';

import { isWebp, menuInit, tabs } from './files/functions.js';

// webp support check, add webp class or no-webp class for HTML
isWebp();

// add touch class for HTML if the browser is mobile
// addTouchClass();

// add loaded for HTML after the page is fully loaded
// addLoadedClass();

// menu module
menuInit();

// accounting for the floating panel on mobile devices at 100vh
// fullVHfix();

// spoiler module
// snippet ( HTML ): spoilers
// spoilers();

// tabs module
// snippet ( HTML ): tabs
tabs();

// show more module
// snippet ( HTML ): showmore
// showMore();

// popups
// snippet ( HTML ): pl
// import './libs/popup.js'

// mouse parallax
// import './libs/parallax-mouse.js'

// ================================================================================================================
// < forms > ======================================================================================================
// ================================================================================================================

import './files/forms/forms.js';

import { formFieldsInit, formSubmit } from './files/forms/forms.js';

// form fields
formFieldsInit({ viewPass: false });

// submit form
formSubmit();

// quantity module
// formQuantity();

// rating module
// formRating();

// select module
// import './libs/select.js'

// masks module
// connection and setup are in js/files/forms/inputmask.js
// plugin documentation: https://github.com/RobinHerbots/inputmask
import './files/forms/inputmask.js';

// range module
// connection and setup are in js/files/forms/range.js
// plugin documentation: https://refreshless.com/nouislider/
// snippet ( HTML ): range
// import "./files/forms/range.js";

// tippy module
// connection and setup are in js/files/tippy.js
// plugin documentation: https://atomiks.github.io/tippyjs/
// snippet ( HTML ): tip ( adds attribute with a hint for html tag )
// import "./files/tippy.js";

// ================================================================================================================
// < swiper slider > ==============================================================================================
// ================================================================================================================

// connection and setup are in js/files/sliders.js
// plugin documentation: https://swiperjs.com/
// snippet ( HTML ): swiper
import './files/sliders.js';

// ================================================================================================================
// < scroll > =====================================================================================================
// ================================================================================================================

// simplebar
// plugin documentation: https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
// import './files/scroll/simplebar.js';

// lazy loading
// plugin documentation: https://github.com/verlok/vanilla-lazyload
import './files/scroll/lazyload.js';

// watcher
// import './libs/watcher.js';

// < scroll functions > ===========================================================================================

// import * as scroll from './files/scroll/scroll.js';

// smooth page navigation
// scroll.pageNavigation();

// adding classes to the header on scroll
// scroll.headerScroll();

// sticky block
// scroll.stickyBlock();

// ================================================================================================================
// < gallery > ====================================================================================================
// ================================================================================================================

// plugin documentation: https://www.lightgalleryjs.com/docs/
// import "./files/gallery.js";

// ================================================================================================================
// < other plugins > ==============================================================================================
// ================================================================================================================

// dynamic adaptive
import './libs/dynamic_adapt.js';

// number formatting
// import './libs/wNumb.min.js';

// maps
import './files/map.js';

// ================================================================================================================
// < other > ======================================================================================================
// ================================================================================================================

// own scripts
import './files/script.js';

//============================================================================================================================================================================================================================================

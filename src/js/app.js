// full logging system
window['FLS'] = false;

// ================================================================================================================

import './files/functions.js';

import { menuInit, tabs } from './files/functions.js';

// menu module
menuInit();

// tabs module
tabs();

// popups
import './libs/popup.js';

// ================================================================================================================

import './files/forms/forms.js';

import { formFieldsInit, formSubmit } from './files/forms/forms.js';

// form fields
formFieldsInit({ viewPass: false });

// submit form
formSubmit();

// masks module
import './files/forms/inputmask.js';

// ================================================================================================================

import './files/sliders.js';

// ================================================================================================================

// lazy loading
import './files/scroll/lazyload.js';

// < scroll functions > ===========================================================================================

import './files/scroll/scroll.js';

import { headerScroll } from './files/scroll/scroll.js';

// adding classes to the header on scroll
headerScroll();

// ================================================================================================================

// dynamic adaptive
import './libs/dynamic_adapt.js';

// maps
import './files/map.js';

// ================================================================================================================

// own scripts
import './files/script.js';

import { modules } from '../modules.js';
import 'inputmask/dist/inputmask.min.js';

const inputMasks = document.querySelectorAll('[data-required="tel"]');
if (inputMasks.length) {
  modules.inputmask = Inputmask({ mask: '+7 (999) 999-9999' }).mask(inputMasks);
}

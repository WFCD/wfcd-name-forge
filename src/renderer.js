'use strict';

/* globals document, M  */
/* eslint-disable no-unused-vars */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {
  Generator,
} = require('warframe-name-generator');
require('materialize-css');

/* Generate names */
const generator = new Generator();
const getSelectValue = (formId) => {
  const form = document.getElementById(formId);
  return M.FormSelect.getInstance(form).input.value.toLowerCase();
};
const getSwitchValue = (formId) => document.getElementById(formId).checked;

const generateName = () => {
  const opts = {
    adjective: getSwitchValue('show-adj-check'),
    includeRace: getSwitchValue('show-race-check'),
    race: getSelectValue('race-picker'),
    type: getSelectValue('type-picker'),
    nouns: Number.parseInt(document.getElementById('noun-amt').value, 10),
  };
  const val = generator.make(opts);
  document.getElementById('name-result').value = val;

  // update values maually???
  M.updateTextFields();
  M.textareaAutoResize(document.getElementById('name-result'));
};

/* Init Materialize styles and special stuff */
document.addEventListener('DOMContentLoaded', () => {
  M.FormSelect.init(document.querySelectorAll('select'), {
    classes: 'blue-grey darken-4 cyan-text text-lighten-5',
  });

  M.Tooltip.init(document.querySelectorAll('.tooltipped'));

  Array
    .from(document.getElementsByClassName('select-dropdown'))
    .forEach((dropdown) => {
      dropdown.classList.add('blue-grey');
      dropdown.classList.add('darken-4');
      dropdown.classList.add('cyan-text');
      dropdown.classList.add('text-lighten-5');
    });

  Array
    .from(document.getElementsByClassName('caret'))
    .forEach((caret) => {
      caret.classList.add('light-caret');
    });
});

function init() {
  // eslint-disable-next-line global-require
  const { remote } = require('electron');
  const minButton = document.getElementById('min-button');
  const maxButton = document.getElementById('max-button');
  const restoreButton = document.getElementById('restore-button');
  const closeButton = document.getElementById('close-button');

  let window = remote.getCurrentWindow();
  const minimize = () => {
    window = remote.getCurrentWindow();
    window.minimize();
  };
  const close = (event) => {
    window = remote.getCurrentWindow();
    window.close();
  };

  minButton.addEventListener('click', minimize);
  closeButton.addEventListener('click', close);
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    init();
  }
};

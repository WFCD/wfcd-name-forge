/* globals M */
'use strict';
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron');
require('materialize-css');
const remote = require('@electron/remote');

const getSelectValue = (formId) => {
  const form = document.getElementById(formId);
  return M.FormSelect.getInstance(form).input.value.toLowerCase();
};
const getSwitchValue = (formId) => document.getElementById(formId).checked;

const generateName = async () => {
  const opts = {
    adjective: getSwitchValue('show-adj-check'),
    includeRace: getSwitchValue('show-race-check'),
    race: getSelectValue('race-picker'),
    type: getSelectValue('type-picker'),
    nouns: Number.parseInt(document.getElementById('noun-amt').value, 10),
  };
  document.getElementById('name-result').value = await ipcRenderer.invoke('generate-name', opts);

  // update values manually???
  M.updateTextFields();
  M.textareaAutoResize(document.getElementById('name-result'));
};

const initUi = () => {
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

  document.getElementById('generate-name-btn').addEventListener('click', generateName);

  const minButton = document.getElementById('min-button');
  const closeButton = document.getElementById('close-button');

  minButton.addEventListener('click', () => {
    remote.getCurrentWindow().minimize();
  });
  closeButton.addEventListener('click', () => {
    remote.getCurrentWindow().close();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUi);
} else {
  initUi();
}

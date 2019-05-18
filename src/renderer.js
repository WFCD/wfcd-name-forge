// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {
  Generator
} = require('warframe-name-generator');
require('materialize-css');

/* Open external stuff */
/**
 * Open an external link
 * @param  {HTMLElement} elem DOM anchor calling 
 * @return {undefined}      doesn't return
 */
const openB = (elem) => {
  require("electron").shell.openExternal(elem.getAttribute('data-href'));
}

/* Generate names */
const generator = new Generator();

const getSelectValue = (formId) => {
  return M.FormSelect.getInstance(document.getElementById(formId)).input.value.toLowerCase();
};

const getSwitchValue = (formId) => {
  return document.getElementById(formId).checked;
};

const generateName = () => {
  const opts = {
    adjective: getSwitchValue('show-adj-check'),
    includeRace: getSwitchValue('show-race-check'),
    race: getSelectValue('race-picker'),
    type: getSelectValue('type-picker'),
    nouns: Number.parseInt(document.getElementById('noun-amt').value, 10),
  };

  console.debug(opts);
  const val = generator.make(opts);
  document.getElementById('name-result').value = val;

  // update values maually???
  M.updateTextFields();
  M.textareaAutoResize(document.getElementById('name-result'));
}

/* Init Materialize styles and special stuff */
document.addEventListener('DOMContentLoaded', function () {
  M.FormSelect.init(document.querySelectorAll('select'), {
    classes: 'blue-grey darken-4 cyan-text text-lighten-5'
  });
  
  M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  
  const dropdowns = document.getElementsByClassName('select-dropdown');
  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].classList.add('blue-grey');
    dropdowns[i].classList.add('darken-4');
    dropdowns[i].classList.add('cyan-text');
    dropdowns[i].classList.add('text-lighten-5');
  }

  const carets = document.getElementsByClassName('caret');
  for (let i = 0; i < carets.length; i++) {
    carets[i].classList.add('light-caret');
  }
});


/* Electron seamless titlebar */
const remote = require('electron').remote;

(function handleWindowControls() {
  // When document has loaded, initialise
  document.onreadystatechange = () => {
    if (document.readyState == "complete") {
      init();
    }
  };

  function init() {
    let window = remote.getCurrentWindow();
    const minButton = document.getElementById('min-button'),
      maxButton = document.getElementById('max-button'),
      restoreButton = document.getElementById('restore-button'),
      closeButton = document.getElementById('close-button');

    minButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.minimize();
    });

    maxButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.maximize();
      toggleMaxRestoreButtons();
    });

    restoreButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.unmaximize();
      toggleMaxRestoreButtons();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation
    // occurs by means other than button clicks e.g. double-clicking
    // the title bar:
    toggleMaxRestoreButtons();
    window.on('maximize', toggleMaxRestoreButtons);
    window.on('unmaximize', toggleMaxRestoreButtons);

    closeButton.addEventListener("click", event => {
      window = remote.getCurrentWindow();
      window.close();
    });

    function toggleMaxRestoreButtons() {
      window = remote.getCurrentWindow();
      if (window.isMaximized()) {
        maxButton.style.display = "none";
        restoreButton.style.display = "flex";
      } else {
        restoreButton.style.display = "none";
        maxButton.style.display = "flex";
      }
    }
  }
})();
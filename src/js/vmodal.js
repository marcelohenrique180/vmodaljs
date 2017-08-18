import {
  vmodalDefaultTemplate,
  vmodalErrorTemplate,
  vmodalSuccessTemplate
} from '../templates';

/**
 * Find which template is the choosen between a set of templates.
 *
 * @export
 * @param {Object[]} templates contains type and builder properties
 * @param {String} type the choosen property
 * @returns {Function} the builder property from the choosen template
 */
export function resolveTemplate(templates, type) {
  return templates.reduce((previousTemplate, currentTemplate) => {
    if (currentTemplate.type === type) {
      return currentTemplate.builder;
    }
    return previousTemplate;
  }, templates[0].builder);
}

export default function vmodal({ title, message, type }) {
  const noScroll = 'body--no-scroll';
  let resolver, rejector;

  // All Templates
  const templates = [
    {
      type: 'default', builder: vmodalDefaultTemplate
    },
    {
      type: 'error', builder: vmodalErrorTemplate
    },
    {
      type: 'success', builder: vmodalSuccessTemplate
    }
  ];

  // Set the chosen one
  const template = resolveTemplate(templates, type);

  // Add template
  document.body.insertAdjacentHTML('afterBegin', template());

  // Lock body scroll
  document.body.classList.add(noScroll);
  document.documentElement.classList.add(noScroll);

  // get main box
  const box = document.getElementById('vmodal-box');
  const smContainer = document.getElementsByClassName('vmodal-box__container')[0];
  const overlay = document.getElementsByClassName('vmodal-overlay')[0];
  const button = document.getElementsByClassName('vmodal-box__button')[0];
  const closeBtn = document.getElementsByClassName('vmodal-box__close')[0];

  if (typeof title === 'undefined') {
    box.removeChild(box.firstChild);
  } else {
    box.firstChild.innerHTML = title;
  }

  if (typeof message === 'undefined') {
    smContainer.removeChild(smContainer.firstChild);
  } else {
    smContainer.firstChild.innerHTML = message;
  }

  // Composable function that enables promise resolution
  const close = (composition) => {
    return () => {
      box.style.pointerEvents = 'none'; // Allows only 1 click

      box.className += ' vmodal-box-fadeOut';
      overlay.className += ' vmodal-overlay-fadeOut';

      setTimeout(() => {
        document.body.classList.remove(noScroll);
        document.documentElement.classList.remove(noScroll);
        document.body.removeChild(box);
        document.body.removeChild(overlay);
        composition();
      }, 1000);
    };
  };

  // Create Promise
  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });

  button.addEventListener('click', close(resolver));
  closeBtn.addEventListener('click', close(rejector));
  button.focus();

  return promise;
}

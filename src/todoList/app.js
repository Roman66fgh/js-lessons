const formElem = document
  .querySelector('#form');

const inputElem = document
  .querySelector('#task');

const ulElem = document
  .querySelector('#tasks');

function onInputChange(event) {
  console.log(event.target.value);
}

function onFormSubmit(event) {
  event.preventDefault();
  const value = inputElem.value.trim();
  if (!value) { return; }
  let spanElem = createElement('span', value);
  let liElem = createElement('li', '');
  liElem.appendChild(spanElem);
  liElem.addEventListener('click', ulClick);
  liElem.setAttribute('performed', false);
  ulElem.appendChild(liElem);
  inputElem.value = '';
}

function createElement(elemName, elemText) {
  let newElem = document.createElement(elemName);
  newElem.innerText = elemText;
  return newElem;
}

function ulClick(event) {
  let task = event.currentTarget;
    if (task.getAttribute('performed') == 'false') {
      task.setAttribute('performed', true);
  } else {task.setAttribute('performed', false); }
}

let buttonFilter = document.querySelectorAll('button[filter]');

let styleTodo = document.querySelector('#styleTodo');

buttonFilter.forEach((elem) => {
elem.addEventListener('click', onFilterButtonClick);
});

function onFilterButtonClick(event) {
let elem = event.target;
let filter = elem.getAttribute('filter');
styleTodo.setAttribute('boolFilter', filter);
}

inputElem.addEventListener('input', onInputChange);


formElem.addEventListener('submit', onFormSubmit);

  
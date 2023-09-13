const refs = {
  divContainer: document.querySelector('.js-container'),
  divBackdrop: document.querySelector('.js-backdrop'),
  textOutput: document.querySelector('.txt'),
  btnClose: document.querySelector('.close'),
};

refs.divBackdrop.classList.remove('.is-hidden');

const invokeFunction = createField();
refs.divContainer.insertAdjacentHTML('beforeend', invokeFunction);

function createField() {
  let markup = '';
  for (let i = 1; i <= 9; i += 1) {
    markup += `<div class="field" data-id='${i}'></div>`;
  }
  return markup;
}

refs.divContainer.addEventListener('click', onFieldClick);

let player = 'X';
let counter = 0;
let stepX = [];
let stepO = [];
const winnerArr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function onFieldClick(ev) {
  counter += 1;

  let isWinner = false;

  if (!ev.target.textContent) {
    let id = Number(ev.target.dataset.id);

    if (player === 'X') {
      ev.target.style.backgroundColor = 'grey';
      stepX.push(id);
      isWinner = chooseWinner(stepX);
    } else {
      ev.target.style.backgroundColor = 'lightgrey';
      stepO.push(id);
      isWinner = chooseWinner(stepO);
    }

    ev.target.textContent = player;

    if (endOfGame(isWinner)) return;

    player = player === 'X' ? 'O' : 'X';
  }
}

function chooseWinner(arrPlayers) {
  return winnerArr.some(valuesArr => valuesArr.every(value => arrPlayers.includes(value)));
}

function reset() {
  refs.divContainer.innerHTML = invokeFunction;
  player = 'X';
  stepO = [];
  stepX = [];
  counter = 0;
}

function modalPopUp() {
  refs.divBackdrop.classList.toggle('is-hidden');
  document.body.classList.add('body');
  refs.divBackdrop.addEventListener('click', onBackdropClick);
}

function onBackdropClick(ev) {
  if (!ev.target.classList.contains('js-backdrop')) {
    return;
  } else {
    refs.divBackdrop.classList.add('is-hidden');
  }
}

refs.btnClose.addEventListener('click', onBtnClick);

function onBtnClick() {
  refs.divBackdrop.classList.add('is-hidden');
  document.body.classList.remove('body');
}

function endOfGame(isWinner) {
  if (isWinner) {
    setTimeout(() => {
      modalPopUp();
    }, 500);
    refs.textOutput.textContent = `Player ${player} is winner`;
    setTimeout(() => {
      reset();
    }, 500);

    return true;
  } else if (!isWinner && counter === 9) {
    setTimeout(() => {
      modalPopUp();
    }, 500);
    refs.textOutput.textContent = 'DRAW';
    setTimeout(() => {
      reset();
    }, 500);

    return true;
  }

  return false;
}

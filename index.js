const refs = {
  divContainer: document.querySelector('.container'),
  divBackdrop: document.querySelector('.backdrop'),
  textOutput: document.querySelector('.txt'),
  btnClose: document.querySelector('.close'),
};

refs.divBackdrop.classList.remove('.is-hidden');

const invokeFunction = createField();
refs.divContainer.insertAdjacentHTML('beforeend', invokeFunction);

function createField() {
  return ` <div class="field" data-id="1"></div>
      <div class="field" data-id="2" ></div>
      <div class="field" data-id="3"></div>
      <div class="field" data-id="4"></div>
      <div class="field" data-id="5"></div>
      <div class="field" data-id="6"></div>
      <div class="field" data-id="7"></div>
      <div class="field" data-id="8"></div>
      <div class="field" data-id="9"></div>`;
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
  if (!ev.target.classList.contains('field')) {
    return;
  }

  counter += 1;
  if (!ev.target.textContent) {
    const id = Number(ev.target.dataset.id);
    if (player === 'X') {
      ev.target.style.backgroundColor = 'blue';

      stepX.push(id);
      const isWinner = chooseWinner(stepX);

      if (isWinner) {
        modalPopUp();
        refs.textOutput.textContent = `Player ${player} is winner`;

        refs.divContainer.innerHTML = invokeFunction;
        reset();
      } else if (!isWinner && counter === 9) {
        modalPopUp();
        refs.textOutput.textContent = 'DRAW';
        refs.divContainer.innerHTML = invokeFunction;
        reset();
      }
    } else {
      ev.target.style.backgroundColor = 'lightblue';
      stepO.push(id);
      const isWinner = chooseWinner(stepO);

      if (isWinner) {
        modalPopUp();
        refs.textOutput.textContent = `Player ${player} is winner`;

        refs.divContainer.innerHTML = invokeFunction;
        reset();
        return;
      } else if (!isWinner && counter === 9) {
        modalPopUp();
        refs.textOutput.textContent = 'DRAW';
        refs.divContainer.innerHTML = invokeFunction;
        reset();
      }
    }

    ev.target.textContent = player;
    player = player === 'X' ? 'O' : 'X';
  }
}

function chooseWinner(arrPlayers) {
  const res = winnerArr.some(valuesArr => valuesArr.every(value => arrPlayers.includes(value)));
  return res;
}

function reset() {
  refs.divContainer.innerHTML = invokeFunction;
  player = 'O';
  stepO = [];
  stepX = [];
  counter = 0;
}

function modalPopUp() {
  refs.divBackdrop.classList.toggle('is-hidden');
}

refs.btnClose.addEventListener('click', onBtnClick);

function onBtnClick() {
  refs.divBackdrop.classList.add('is-hidden');
}

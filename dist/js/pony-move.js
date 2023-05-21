'use strict';

let pony = document.querySelector('.pony');
let style = document.querySelector('style');
let hasWings = true;
let ponyCoordinates = 0;
let X = 0, Y = 0;

this.addEventListener('click', (event) => {
  GetPonyCoordinates(event);
  GetPonyTypeAnimation(ponyCoordinates);
  PonyMove(ponyCoordinates);
});

/* For touch devices */
this.addEventListener('touchend', (event) => {
  GetPonyCoordinates(event);
  GetPonyTypeAnimation(ponyCoordinates);
  PonyMove(ponyCoordinates);
});

function GetPonyCoordinates(event) {
  X = event.pageX;
  Y = event.pageY;
  ponyCoordinates = pony.getBoundingClientRect();
}

/* PonyTypeAnimation */
function GetPonyTypeAnimation(ponyCoordinates) {
  // Pony Move-Type Animation
  {
    let distanceX = ponyCoordinates.left - X;
    let distanceY = ponyCoordinates.top - Y + window.scrollY;
    let actionDistance = 450;

    if (hasWings == true) {
      switch (true) {
        case (distanceX > actionDistance) || (distanceX < -actionDistance):
        case (distanceY > actionDistance) || (distanceY < -actionDistance):
          pony.classList = 'pony animation--fly'
          break;
        case (distanceX <= actionDistance) || (distanceX >= -actionDistance):
        case (distanceY <= actionDistance) || (distanceY >= -actionDistance):
          pony.classList = 'pony animation--trot'
          break;
      }
    }
    else pony.classList = 'pony animation--trot';
  }

  // Pony Boop Animation
  switch (true) {
    case pony.classList.contains('animation--boop-fly','animation--boop'):
      return;
    case pony.classList.contains('animation--fly'):
      pony.classList.remove('animation--fly');
      pony.classList.add('animation--boop-fly');
      break;
    case pony.classList.contains('animation--stand'):
      pony.classList.remove('animation--stand');
      pony.classList.add('animation--boop');
      break;
  }

  // Pony Scale Animation
  if (ponyCoordinates.left < X) pony.style.transform = 'scale(-1, 1)';
  else if (ponyCoordinates.left > X) pony.style.transform = 'initial';
}

/* PonyMove */
function PonyMove(ponyCoordinates) {
  let animationTime = '5';
  /*
  Добавляем в тэг "style" анимацию для блока "pony".
  We add animation for the "pony" block to the "style" tag.
  */

  if (style.textContent == '') {
    style.innerHTML = `
      .pony {
        animation: pony-move ${animationTime}s linear 1;
        animation-fill-mode: forwards;
        animation-duration: 1s;
      }
    `;
    /*
    Фреймы добавляем с задержкой в 150ms, иначе они не успеют обработаться и примениться.
    Frames are added with a delay of 150ms, otherwise they will not have time to be processed and applied.
    */
    setTimeout(() => {
      style.innerHTML += `
        @keyframes pony-move {
          from {
            left: ${ponyCoordinates.left}px;
            top: ${ponyCoordinates.top + window.scrollY}px;
          }
          to {
            left: ${X}px;
            top: ${Y}px;
          }
        }
      `;
      /*
      Указываем конечные координаты ( они-же будут начальными при следующей итерации анимации ).
      We specify the final coordinates ( they will also be the initial ones at the next iteration of the animation ).
      */
      pony.style.left = X + 'px';
      pony.style.top = Y + 'px';
      /*
      По окончании анимации приводим к дефолтным значениям и отчищаем тэг "style" от мусора.
      At the end of the animation, we bring it to the default values and clean the "style" tag from garbage.
      */
      setTimeout(() => {pony.classList = 'pony animation--stand'; style.innerHTML = '';}, animationTime*200);
    }, 150);
  }

  return
}

// <!DOCTYPE Liky>

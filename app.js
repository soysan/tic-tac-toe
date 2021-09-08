const target = document.getElementById('target');
class Model {
  state = [["","",""],["","",""],["","",""]]
}
class View {
  initialView = () => {
    const div = document.createElement('div');
    div.classList.add('container')
    div.innerHTML +=
      `
      <h1>Tic Tac Toe Game</h1>
      <div class="sub">
        <h2>Player <span id='player'>1</span> turn</h2>
      </div>
      ${this.squareMaker()}
      `;
    target.append(div);
    return div;
  }

  squareMaker = () => {
    let squares = '<div class="square-container">'
    for (let i = 0; i < 9; i++) {
      const square =
        `
        <div id="sec${i}" class="square"></div>
        `;
      squares += square;
    }
    squares += '</div>'
    return squares;
  }
}
class Controller {
  static addMark = () => {
    for (let i = 0; i < 9; i++) {
      const curr = document.querySelectorAll(`#sec${i}`)[0];
      curr.addEventListener('click', () => {
        if (curr.childNodes.length === 1) return;

        const playerNum = document.querySelectorAll('#player')[0];
        const h1 = document.createElement('h1');
        h1.classList.add('mark');

        if (playerNum.innerText === '1') {
          h1.innerText = "◯";
          curr.append(h1);
        } else {
          h1.innerText = "×";
          curr.append(h1);
        }
        this.changePlayerNum(playerNum, h1.innerText);
      })
    }
  }

  static changePlayerNum = (playerNum, str) => {
    playerNum.innerText = str === '◯' ? "2" : "1";
  }

  static evaluateWin = () => {

  }

  static checkAllFill = () => {
    
  }
}

const start = new View()
start.initialView()
Controller.addMark();

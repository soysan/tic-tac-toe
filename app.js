const target = document.getElementById('target');
class Model {
  static state = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  static horizontalCheck = () => {
    for (let i = 0; i < this.state.length; i++){
      const currVal = this.state[i][0];
      for (let j = 1; j < this.state[i].length; j++){
        if (this.state[i][j] == null || currVal !== this.state[i][j]) break;
        if (j == 2) return true;
      }
    }
    return false;
  }

  static verticalCheck = () => {
    for (let i = 0; i < this.state.length; i++){
      const currVal = this.state[0][i];
      for (let j = 1; j < this.state.length; j++){
        if (this.state[j][i] == null || currVal !== this.state[j][i]) break;
        if (j == 2) return true;
      }
    }
    return false;
  }

  static diagonalCheck = () => {
    const rightUp = [this.state[2][0], this.state[1][1], this.state[0][2]];
    const rightDown = [this.state[0][0], this.state[1][1], this.state[2][2]];
    const upCheck = rightUp.every(val => val != null && val == rightUp[0]);
    const downCheck = rightDown.every(val => val != null && val == rightDown[0]);
    return upCheck || downCheck;
  }
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
    for (let i = 0; i < Model.state.length; i++) {
      for (let j = 0; j < Model.state[i].length; j++) {
        const square =
          `
          <div id="sec${i}${j}" class="square"></div>
          `;
        squares += square;
      }
    }
    squares += '</div>'
    return squares;
  }
}
class Controller {
  static addMarkAndEvaluateGame = () => {
    for (let i = 0; i < Model.state.length; i++) {
      for (let j = 0; j < Model.state[i].length; j++){
        const curr = document.querySelectorAll(`#sec${i}${j}`)[0];
        curr.addEventListener('click', () => {
          if (curr.childNodes.length === 1) return;

          const playerNum = document.querySelectorAll('#player')[0];
          const h1 = document.createElement('h1');
          h1.classList.add('mark');

          if (playerNum.innerText === '1') {
            h1.innerText = "◯";
          } else {
            h1.innerText = "×";
          }
          Model.state[i][j] = h1.innerText;
          curr.append(h1);

          if (this.evaluateWin()) alert(`Player ${playerNum.innerText} is win!`);
          else if (this.checkAllFill()) alert('Draw Game');

          this.changePlayerNum(playerNum, h1.innerText);
        })
      }
    }
  }

  static changePlayerNum = (playerNum, str) => {
    playerNum.innerText = str === '◯' ? "2" : "1";
  }

  static evaluateWin = () => {
    const horizontal = Model.horizontalCheck();
    const vertical = Model.verticalCheck();
    const diagonal = Model.diagonalCheck();
    return horizontal || vertical || diagonal;
  }

  static checkAllFill = () => {
    const state = Model.state;
    for (let i of state) {
      for (let j of i) {
        if (j === null) return false;
      }
    }
    return true;
  }

  static startNewGame = () => {
    const start = new View()
    start.initialView()
    Controller.addMarkAndEvaluateGame();
  }
}

Controller.startNewGame();

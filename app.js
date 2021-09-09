const config = {
  initial: document.getElementById('initial'),
  main: document.getElementById('main'),
}

class Model {
  constructor(num) {
    this.state = this.arrBuilder(num);
  }

  arrBuilder = (num) => {
    const inArr = Array.from({ length: num }, () => null);
    const resArr = Array.from({ length: num }, () => inArr);
    return resArr;
  }

  horizontalCheck = () => {
    for (let i = 0; i < this.state.length; i++){
      const currVal = this.state[i][0];
      for (let j = 1; j < this.state[i].length; j++){
        if (this.state[i][j] == null || currVal !== this.state[i][j]) break;
        if (j == 2) return true;
      }
    }
    return false;
  }

  verticalCheck = () => {
    for (let i = 0; i < this.state.length; i++){
      const currVal = this.state[0][i];
      for (let j = 1; j < this.state.length; j++){
        // console.log(this.state[j][i],this.state)
        if (this.state[j][i] == null || currVal !== this.state[j][i]) break;
        if (j == 2) return true;
      }
    }
    return false;
  }

  diagonalCheck = () => {
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
    div.classList.add('container');
    div.innerHTML +=
      `
      <h1>Tic Tac Toe Game</h1>
      <p>３以上の数で奇数の１列のマスの数を入力ください</p>
      <input class="inputVal" type="number" value="3" />
      <button type="button" id="btn">Game Start</button>
      `
    config.initial.append(div);
    document.getElementById('btn').addEventListener('click', () => {
      const inputNum = parseInt(document.querySelector('.inputVal').value);
      Controller.submitNumToMain(inputNum)
    })
  }

  static mainView = (model) => {
    const div = document.createElement('div');
    div.classList.add('container')
    div.innerHTML +=
      `
      <h1>Tic Tac Toe Game</h1>
      <div class="sub">
        <h2>Player <span id='player'>1</span> turn</h2>
      </div>
      ${this.squareMaker(model.state)}
      `;
    config.main.append(div);
    return div;
  }

  static squareMaker = (squares) => {
    let div = '<div class="square-container">'
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        const square =
          `
          <div id="sec${i}${j}" class="square"></div>
          `;
        div += square;
      }
    }
    div += '</div>'
    return div;
  }
}
class Controller {

  static submitNumToMain = (num) => {
    if (num % 2 === 0) return alert('奇数を入力してください。');

    let squares = new Model(num);
    config.initial.classList.add('disableToSee');
    config.main.classList.remove('disableToSee');
    View.mainView(squares);
    this.addMarkAndEvaluateGame(squares);
  }

  static addMarkAndEvaluateGame = (squares) => {
    for (let i = 0; i < squares.state.length; i++) {
      for (let j = 0; j < squares.state[i].length; j++){
        const curr = document.querySelectorAll(`#sec${i}${j}`)[0];
        curr.addEventListener('click', () => {
          if (curr.childNodes.length === 1) return;

          const playerNum = document.querySelectorAll('#player')[0];
          const h1 = document.createElement('h1');
          h1.classList.add('mark');

          this.cycleOrCross(squares.state, curr, playerNum.innerText, h1, i , j)

          if (this.evaluateWin(squares)) alert(`Player ${playerNum.innerText} is win!`);
          else if (this.checkAllFill(squares.state)) alert('Draw Game');

          this.changePlayerNum(playerNum, h1.innerText);
        })
      }
    }
  }

  static cycleOrCross = (state, curr, playerNum, h1, i, j) => {
    if (playerNum === '1') {
      h1.innerText = "◯";
      h1.classList.add('cycle');
    } else {
      h1.innerText = "×";
      h1.classList.add('cross');
    }
    state[i][j] = h1.innerText;
    curr.append(h1);
  }

  static changePlayerNum = (playerNum, str) => {
    playerNum.innerText = str === '◯' ? "2" : "1";
  }

  static evaluateWin = (squares) => {
    const horizontal = squares.horizontalCheck();
    const vertical = squares.verticalCheck();
    const diagonal = squares.diagonalCheck();
    // console.log(horizontal, vertical, diagonal)
    return horizontal || vertical || diagonal;
  }

  static checkAllFill = (squares) => {
    for (let i of squares) {
      for (let j of i) {
        if (j === null) return false;
      }
    }
    return true;
  }

  static startNewGame = () => {
    const start = new View()
    start.initialView();
  }
}

Controller.startNewGame();

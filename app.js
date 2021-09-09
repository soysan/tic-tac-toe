const config = {
  initial: document.getElementById('initial'),
  main: document.getElementById('main'),
}

class Model {
  constructor(num) {
    this.state = this.arrBuilder(num);
  }

  arrBuilder = (num) => {
    let resArr = [];
    for (let i = 0; i < num; i++) {
      let temp = [];
      for (let j = 0; j < num; j++) {
        temp.push(null);
      }
      resArr.push(temp);
    }
    return resArr;
  }

  horizontalCheck = () => {
    for (let i = 0; i < this.state.length; i++) {
      const val = this.state[i][0];
      const lineAll = this.state[i].every(curr => curr != null && curr === val);
      if (lineAll) return true;
    }
    return false;
  }

  verticalCheck = () => {
    let j = 0;
    for (let i = 0; i < this.state.length; i++) {
      const val = this.state[j][i];
      while (j < this.state.length - 1) {
        const curr = this.state[++j][i];
        if (curr === null || curr !== val) break;
        if (j == this.state.length - 1) return true;
      }
      j = 0;
    }
    return false;
  }


  diagonalCheck = () => {
    const rightUp = this.rightUpCheck();
    const rightDown = this.rightDownCheck();
    return rightUp || rightDown;
  }

  rightUpCheck = () => {
    let j = 0;
    let i = this.state.length - 1;
    const val = this.state[this.state.length - 1][j];
    while (i > 0) {
      const curr = this.state[--i][++j];
      if (curr === null || val !== curr) return false;
    }
    return true;
  }

  rightDownCheck = () => {
    let j = 0;
    let i = 0;
    const val = this.state[i][j];
    while (i < this.state.length - 1) {
      const curr = this.state[++i][++j];
      if (curr === null || val !== curr) return false;
    }
    return true;
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
    this.rowByNum(num);
    this.addMarkAndEvaluateGame(squares);
  }

  static rowByNum = (num) => {
    const container = document.querySelector('.square-container');
    container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    const squares = document.querySelectorAll('.square');
    const aspect = num >= 7 ? 80 : 120;
    const font = aspect == 80 ? 2 : 3;
    for (let s of squares) {
      s.style.width = `${aspect}px`;
      s.style.height = `${aspect}px`;
      s.style.fontSize = `${font}em`;
    }
  }

  static addMarkAndEvaluateGame = (squares) => {
    for (let i = 0; i < squares.state.length; i++) {
      for (let j = 0; j < squares.state[i].length; j++) {
        const curr = document.querySelectorAll(`#sec${i}${j}`)[0];
        curr.addEventListener('click', () => {
          if (curr.childNodes.length === 1) return;

          const playerNum = document.querySelectorAll('#player')[0];
          const h1 = document.createElement('h1');
          // h1.classList.add('mark');

          this.cycleOrCross(squares.state, curr, playerNum.innerText, h1, i, j)

          if (this.evaluateWin(squares)) alert(`Player ${playerNum.innerText} is win!`);
          else if (this.checkAllFill(squares.state)) alert('Draw Game');

          this.changePlayerNum(playerNum, h1.innerText);
        })
      }
    }
  }

  static cycleOrCross = (state, curr, playerNum, h1, i, j) => {
    console.log(state)
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

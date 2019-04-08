let GameStaus = {
  Pause: 'pause',
  Play: 'play',
  Win: 'win',
  Standoff: 'standoff'
}

class Player {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  }
}

class Box {
  player;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Game {
  boxes = [];
  player1 = new Player('', 'X');
  player2 = new Player('', 'O');

  gameStatus;
  currentPlayer;
  winner;

  constructor() {
    this.init();
  }

  init() {
    console.log('hello');
    this.gameStatus = GameStaus.Pause;
    this.generateBoxes();
    document.getElementById('start-button')
      .addEventListener('click', () => {
        this.onStart();
      }); 
    document.getElementById('player1-input')
      .addEventListener('change', (e) => {
        this.player1.name = e.target.value;
        console.log(this.player1.name);
      });
    document.getElementById('player2-input')
      .addEventListener('change', (e) => {
        this.player2.name = e.target.value;
        console.log(this.player2.name);
      });
    for (let i = 1; i <= 9 ; i++) {

      document.getElementById(i.toString())
      .addEventListener('click', (e) => {
        const box = this.boxes[i-1];
        if (this.gameStatus === GameStaus.Play && !box.player) {
          e.target.innerText = this.currentPlayer.icon;
          this.onHit(box);
        }
        

      });
    }
    document.getElementById('status-line').innerText = this.getStatus();
  }

  generateBoxes() {
    this.boxes = [];
    for (let x = 1; x <= 3; x++) {
      for (let y = 1; y <= 3; y++) {
        this.boxes.push(new Box(x, y));
      }
    }
  }

  onHit(box) {
    if (this.gameStatus === GameStaus.Play && !box.player) {
      box.player = this.currentPlayer;
      if (this.isWin(this.currentPlayer)) {
        this.gameStatus = GameStaus.Win;
        this.winner = this.currentPlayer;
      } else if (!this.canPlay()) {
        this.gameStatus = GameStaus.Standoff;
      } else {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
      }
    }

    document.getElementById('status-line').innerText = this.getStatus();
  }

  onStart() {
    this.winner = null;
    this.currentPlayer = this.player1;
    this.boxes.forEach(x => x.player = null);
    for (let i = 1; i <=9 ; i++) {
      document.getElementById(i.toString()).innerText = '';
    }
    this.gameStatus = GameStaus.Play;
    document.getElementById('status-line').innerText = this.getStatus();
  }

  getStatus() {
    if (this.gameStatus === GameStaus.Pause) {
      return ' click start for play';
    } else if (this.gameStatus === GameStaus.Standoff) {
      return 'standoff. click start for play';
    } else if (this.gameStatus === GameStaus.Play) {
      const p = this.currentPlayer === this.player1 ? 'player1 ' : 'player2 ';
      return '(' + this.currentPlayer.icon + ') ' + p + this.currentPlayer.name;
    } else if (this.gameStatus === GameStaus.Win) {
      const p = this.winner === this.player1 ? 'player1 ' : 'player2 ';
      return p + this.winner.name + ' win. click start for play';
    }
  }

  canPlay() {
    const r = this.boxes.findIndex(x => !x.player) > -1;
    return r;
  }

  isWin(player) {

    for (let i = 1; i <= 3; i++) {
      const qX = this.boxes.filter(x => x.player === player && x.x === i).length;
      if (qX === 3) {
        return true;
      }
      const qY = this.boxes.filter(x => x.player === player && x.y === i).length;
      if (qY === 3) {
        return true;
      }
    }

    let q = this.boxes.filter(x => x.player === player && x.x === x.y).length;
    if (q === 3) {
      return true;
    }
    q = this.boxes.filter(x => x.player === player && x.x + x.y === 4).length;
    if (q === 3) {
      return true;
    }

    return false;
  }


}


let game;

window.onload = () => {
  game = new Game();
}

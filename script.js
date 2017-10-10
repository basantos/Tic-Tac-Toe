var playerOnesTurn = true;
var playerTwosTurn = false;
var cpuIsPlayer = false;
var cpuMark = null; // Will be set to either X or Y
var cpuTurn = null;
var board = { 'one': 'empty', 'two': 'empty', 'three': 'empty',
              'four': 'empty', 'five': 'empty', 'six': 'empty',
              'seven': 'empty', 'eight': 'empty', 'nine': 'empty'};

function assignMarkToCPU(mark){
  cpuMark = mark;
  setUpGame();
}

function changeCPUTurn(){
  if(cpuMark === 'X'){
    cpuTurn = playerOnesTurn;
  } else {
    cpuTurn = playerTwosTurn;
  }
}

function cpuMarksUnit(){
  debugger;
  if (cpuMark === 'X'){
    // Mark corner on first turn
    if(board.one + board.three + board.seven + board.nine === 'emptyemptyemptyempty'){
      var unitIds = ['one','three','seven','nine'];
      var randomIndex = Math.floor(Math.random() * 3);
      var unitId = unitIds[randomIndex];

      board[unitId] = 'X';
      var unit = document.getElementById(unitId);
      unit.innerHTML = 'X';
    } // Mark to win
              // Check rows
    else if(board.one + board.two + board.three === 'XemptyX' ||
              board.four + board.five + board.six === 'XemptyX' ||
              board.seven + board.eight + board.nine === 'XemptyX' ||
              // Check columns
              board.one + board.four + board.seven === 'XemptyX' ||
              board.two + board.five + board.eight === 'XemptyX' ||
              board.three + board.six + board.nine === 'XemptyX' ||
              // Check diagonals
              board.one + board.five + board.nine === 'XemptyX' ||
              board.three + board.five + board.seven === 'XemptyX'){
      var unitIds = ['one','two','three','four','five','six','seven','eight','nine'];
      for(var i = 0; i<3; i++){
        // Mark row
        if(board[unitIds[i]] === 'X' && board[unitIds[i+1]] === 'empty' && board[unitIds[i+2]] === 'X'){
          board[unitIds[i+1]] = 'X';
          var unit = document.getElementById(unitIds[i+1]);
          unit.innerHTML = 'X';
          break;
        } // Mark column
        else if(board[unitIds[i]] === 'X' && board[unitIds[i+3]] === 'empty' && board[unitIds[i+6]] === 'X'){
          board[unitIds[i+3]] = 'X';
          var unit = document.getElementById(unitIds[i+3]);
          unit.innerHTML = 'X';
          break;
        } // Mark downward diagonal
        else if(i+8 <= 8 && board[unitIds[i]] === 'X' && board[unitIds[i+4]] === 'empty' && board[unitIds[i+8]]){
          board[unitIds[i+4]] = 'X';
          var unit = document.getElementById(unitIds[i+4]);
          unit.innerHTML = 'X';
          break;
        } else if(board[unitIds[i]] === 'X' && board[unitIds[i+2]] === 'empty' && board[unitIds[i+4]] === 'X'){
          board[unitIds[i+2]] = 'X';
          var unit = document.getElementById(unitIds[i+2]);
          unit.innerHTML = 'X';
          break;
        }
      }
    } // Mark another corner if user's first move is not in the center
    else if(board.five !== 'O'){
      var unitIds = ['one','three','seven','nine'];
      unitIds = unitIds.filter(function(curr){
        return board[curr] === 'empty';
      });
      var randomIndex = Math.floor(Math.random() * 2);
      var unitId = unitIds[randomIndex];

      board[unitId] = 'X';
      var unit = document.getElementById(unitId);
      unit.innerHTML = 'X';
    }
  } else {

  }
  // CPU marks based on map
}

function askXOrY(){
  var mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = '<button id="x-button">X</button> or <button id="o-button">O</button>';
  var xButton = document.getElementById('x-button');
  var oButton = document.getElementById('o-button');
  xButton.addEventListener('click',function(){
    assignMarkToCPU('O');
  });
  oButton.addEventListener('click',function(){
    assignMarkToCPU('X');
    // CPU starts game and switches turn
    cpuMarksUnit();
    switchTurn();
  });
}

function setUpGame(){
  html = "<div><h2 id='show-which-players-turn'>Player One's Turn</h2></div>";
  html += '<div id="game-container">';
  html += '<div class="row"><div class="unit" id="one"></div><!----><div class="unit" id="two"></div><!----><div class="unit" id="three"></div><!----></div>';
  html += '<div class="row"><div class="unit" id="four"></div><!----><div class="unit" id="five"></div><!----><div class="unit" id="six"></div><!----></div>';
  html += '<div class="row"><div class="unit" id="seven"></div><!----><div class="unit" id="eight"></div><!----><div class="unit" id="nine"></div><!----></div></div>';

  var mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = html;
  initGameUnits();
}

function switchTurn(){
  playerOnesTurn = !playerOnesTurn;
  playerTwosTurn = !playerTwosTurn;

  var showWhichPlayersTurn = document.getElementById('show-which-players-turn');
  if (showWhichPlayersTurn.innerHTML === "Player One's Turn"){
    showWhichPlayersTurn.innerHTML = "Player Two's Turn";
  } else {
    showWhichPlayersTurn.innerHTML = "Player One's Turn";
  }

  changeCPUTurn();
  if(cpuIsPlayer && cpuTurn){
    cpuMarksUnit();
    checkWinCondition();
  }
}

function initPlayerButtons(){
  cpuIsPlayer = false;
  cpuMark = null;
  cpuTurn = null;
  // add buttons html
  var mainContent = document.getElementById('main-container');
  var htmlOfPromptButtons = '<button id="one-player-button">1 Player</button><button id="two-players-button">2 Players</button>';
  mainContent.innerHTML = htmlOfPromptButtons;
  // set up click events
  var onePlayerButton = document.getElementById('one-player-button');
  var twoPlayersButton = document.getElementById('two-players-button');
  onePlayerButton.addEventListener('click', function(){
    cpuIsPlayer = true;
    askXOrY();
  });
  twoPlayersButton.addEventListener('click', function(){
    setUpGame();
  });
};

function markUnit(unit,idNumber){
  debugger;
  if(board[idNumber] === 'empty'){
    if(playerOnesTurn){
      if(cpuTurn === playerOnesTurn){
        cpuMarksUnit();
      } else {
        unit.innerHTML = 'X';
        board[idNumber] = 'X';
      }
    } else {
      if(cpuTurn === playerTwosTurn){
        cpuMarksUnit();
      } else {
        unit.innerHTML = 'O';
        board[idNumber] = 'O';
      }
    }
    checkWinCondition();
  }
}

function initGameUnits(){
  var unitIds = ['one','two','three','four','five','six','seven','eight','nine'];
  for(let i=0; i<unitIds.length; i++){
    let unit = document.getElementById(unitIds[i]);
    unit.addEventListener('click',function(){
      markUnit(unit,unitIds[i]);
    });
  }
}

function checkWinCondition(){
  debugger;
      // Check rows
  if (board.one + board.two + board.three === 'XXX' || board.one + board.two + board.three === 'OOO' ||
      board.four + board.five + board.six === 'XXX' || board.four + board.five + board.six === 'OOO' ||
      board.seven + board.eight + board.nine === 'XXX' || board.seven + board.eight + board.nine === 'OOO' ||
      // Check columns
      board.one + board.four + board.seven === 'XXX' || board.one + board.four + board.seven === 'OOO'  ||
      board.two + board.five + board.eight === 'XXX' || board.two + board.five + board.eight === 'OOO' ||
      board.three + board.six + board.nine === 'XXX' || board.three + board.six + board.nine === 'OOO' ||
      // Check diagonals
      board.one + board.five + board.nine === 'XXX' || board.one + board.five + board.nine === 'OOO' ||
      board.three + board.five + board.seven === 'XXX' || board.three + board.five + board.seven === 'OOO'
    ){
    var winningPlayer = document.getElementById('show-which-players-turn').innerHTML.slice(0,10);
    var mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = winningPlayer + ' Win' + '<div><button id="new-game-button">New Game</button></div>';
    var newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', function(){
      board = { 'one': 'empty', 'two': 'empty', 'three': 'empty',
                    'four': 'empty', 'five': 'empty', 'six': 'empty',
                    'seven': 'empty', 'eight': 'empty', 'nine': 'empty'};
      initPlayerButtons();
    });
  } else {
    switchTurn(); // If game hasn't ended, switch players' turn
  }
}

initPlayerButtons();

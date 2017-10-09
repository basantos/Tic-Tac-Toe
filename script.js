var playerOnesTurn = true;
var playerTwosTurn = false;
var board = { 'one': 'empty', 'two': 'empty', 'three': 'empty',
              'four': 'empty', 'five': 'empty', 'six': 'empty',
              'seven': 'empty', 'eight': 'empty', 'nine': 'empty'};

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
}

function initPlayerButtons(){
  // add buttons html
  var mainContent = document.getElementById('main-container');
  var htmlOfPromptButtons = '<button id="one-player-button">1 Player</button><button id="two-players-button">2 Players</button>';
  mainContent.innerHTML = htmlOfPromptButtons;
  // set up click events
  var onePlayerButton = document.getElementById('one-player-button');
  var twoPlayersButton = document.getElementById('two-players-button');
  onePlayerButton.addEventListener('click', function(){
    setUpGame();
  });
  twoPlayersButton.addEventListener('click', function(){
    setUpGame();
  });
};

function markUnit(unit,idNumber){
  if(board[idNumber] === 'empty'){
    if(playerOnesTurn){
      unit.innerHTML = 'X';
      board[idNumber] = 'X';
    } else {
      unit.innerHTML = 'O';
      board[idNumber] = 'O';
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
      initPlayerButtons();
    });
  } else {
    switchTurn(); // If game hasn't ended, switch players' turn
  }
}

initPlayerButtons();

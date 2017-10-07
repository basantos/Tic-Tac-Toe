var playerOnesTurn = true;
var playerTwosTurn = false;

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
  var onePlayerButton = document.getElementById('one-player-button');
  var twoPlayersButton = document.getElementById('two-players-button');
  onePlayerButton.addEventListener('click', function(){
    setUpGame();
  });
  twoPlayersButton.addEventListener('click', function(){
    setUpGame();
  });
};

var board = { 'one': 'empty', 'two': 'empty', 'three': 'empty',
              'four': 'empty', 'five': 'empty', 'six': 'empty',
              'seven': 'empty', 'eight': 'empty', 'nine': 'empty'};

function markUnit(unit,idNumber){
  debugger;
  if(board[idNumber] === 'empty'){
    if(playerOnesTurn){
      unit.innerHTML = 'X';
      board[idNumber] = 'X';
    } else {
      unit.innerHTML = 'O';
      board[idNumber] = 'O';
    }
    switchTurn();
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

initPlayerButtons();

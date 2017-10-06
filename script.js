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

var initPlayerButtons = function(){
  var onePlayerButton = document.getElementById('one-player-button');
  var twoPlayersButton = document.getElementById('two-players-button');
  onePlayerButton.addEventListener('click', function(){
    setUpGame();
  });
  twoPlayersButton.addEventListener('click', function(){
    setUpGame();
  });
};

var initGameUnits = function(){
  var unitIds = ['one','two','three','four','five','six','seven','eight','nine'];
  for(var i=0; i<unitIds.length; i++){
    let unitId = document.getElementById(unitIds[i]);
    unitId.addEventListener('click',function(){
      if(playerOnesTurn){
        unitId.innerHTML = 'X';
        switchTurn();
      } else {
        unitId.innerHTML = 'O';
        switchTurn();
      }
    });
  }
}

initPlayerButtons();

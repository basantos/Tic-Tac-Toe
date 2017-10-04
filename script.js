function setUpGame(){
  html = '<div id="game-container">';
  html += '<div class="row"><div class="unit" id="one"></div><!----><div class="unit" id="two"></div><!----><div class="unit" id="three"></div><!----></div>';
  html += '<div class="row"><div class="unit" id="four"></div><!----><div class="unit" id="five"></div><!----><div class="unit" id="six"></div><!----></div>';
  html += '<div class="row"><div class="unit" id="seven"></div><!----><div class="unit" id="eight"></div><!----><div class="unit" id="nine"></div><!----></div></div>';

  var mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = html;
  initGameUnits();
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
      unitId.innerHTML = 'X';
    });
  }
}

initPlayerButtons();

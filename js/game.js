var game;
function startgame()
{

  game = new aGame();
  game.game(50,50,document.getElementById('game'));
  var player = new aGameElement({
    w: 25, h:10, x:10, y:20, color:"blue", container: document.getElementById('game'),
    handlesKeyDown: true, acceleration: true, speed: 10
  });
  var playerControl = new aKeyboardControler({
    gameObject: player
  });
  console.log(player);
  game.anim();
}

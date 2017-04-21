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
  player.handlesCollision = true;
  anotherGameElement = new aGameElement({
    w: 50, h:50, x:100, y:20, container: document.getElementById('game')
  });
  player.addCollider(anotherGameElement);
  player.handleCollision = function(aGameElement)
  {
    this.style.backgroundColor = "green";
  }
  console.log(player);
  game.anim();
}

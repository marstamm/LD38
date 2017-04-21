var game;
function startgame()
{

  game = new aGame();
  game.game(50,50,document.getElementById('game'));
  var player = new aGameElement({
    w: 25, h:10, x:10, y:20, color:"blue", container: document.getElementById('game'),
    handlesKeyDown: true, acceleration: true, speed: 10, types: ['player']
  });
  var playerControl = new aKeyboardControler({
    gameObject: player
  });
  player.handlesCollision = true;
  anotherGameElement = new aGameElement({
    w: 50, h:50, x:100, y:20, container: document.getElementById('game'), types: ['wall']
  });
  player.addCollider(anotherGameElement);
  player.handleCollision = function(aGameElement)
  {
    if(aGameElement.types.indexOf("wall") > -1)
    {
      this.canMove = false;
    }
    this.style.backgroundColor = "green";
  };

  var pgen = aParticleGenerator({x:50,y:100, r:10, duration: 1});
  console.log(player);
  game.anim();
}

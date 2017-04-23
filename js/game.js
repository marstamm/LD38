var game;
var player;
var acamera;

function startgame()
{

  game = new aGame();


  game.game(window.innerWidth,window.innerHeight,document.getElementById('game'));
  player = new aGameElement({
    w: 20, h:20, x:window.innerWidth/2, y:window.innerHeight/2, color:"transparent", container: document.getElementById('game'),
    handlesKeyDown: true, handlesMouseDown: true, acceleration: true, speed: 2, types: ['player'], accelerationSpeed: 1
  });
  player.counter = 0;
  player.style.backgroundRepeat = "no-repeat";
  player.style.backgroundImage = "url('pic/enemy01.png')";
  player.style.backgroundSize = "contain";
  player.style.backgroundImage = "url('pic/player.png')";
  var playerControl = new aKeyboardControler({
    gameObject: player
  });
  player.handlesCollision = true;
  /*for (var i = 0; i < 100; i++)
  {
    var plancton = new aGameElement({
      w:1, h:1, x: ~~(Math.random()*250 + 250), y: ~~(Math.random()*250 + 250),
      color:"black", container: document.getElementById('game'), types: ['collectible'],
      handlesCollision: true
    });
    plancton.value = 1;
    plancton.addCollider(player);
  }*/
  enemySpawnSpawen(1000);
  //enemie({});
  player.mouseDownAt = function(x,y)
  {
    shooting[Math.floor(Math.random()*shooting.length)].play();
    console.log(this.x);
    var tmp = new projectile({
      x:this.x+this.width/2, y: this.y+this.height/2, targetY: y, targetX: x
    });
  }
  //player.addCollider(anotherGameElement);
  var textBox = new aGameElement({
    w: window.innerWidth*0.33, h:window.innerHeight*0.33, x:window.innerWidth/2, y:window.innerHeight/2, container: document.getElementById('game'),
    color: "transparent"
  });
  textBox.style.display = 'none';

  player.handleCollision = function(someGameElement)
  {
    /*if(someGameElement.types.indexOf("collectible") > -1)
    {
      this.counter++;
      console.log(this.counter);
      someGameElement.remove();
    }

    if(this.counter == 10)
    {
      this.style.backgroundColor = "green";
      textBox.style.display = "";
      textBox.x = this.x;
      textBox.y = this.y;
      textBox.DOMElement.innerHTML = "You are now an multi-cellular thingy";
    }

    if(this.counter == 20)
    {
      this.style.backgroundColor = "green";
      textBox.style.display = "";
      textBox.x = this.x;
      textBox.y = this.y;
      textBox.DOMElement.innerHTML = "You evolved. You can now shoot stuff with LMB";

      player.handlesMouseDown = true;

    }*/
    //console.log("collsion");
    if(someGameElement.types.indexOf("enemy") > -1)
    {
      this.remove();
      //TODO: Game over screen
      console.log("game Over");
      gameOver(this.counter);
    }
    //this.style.backgroundColor = "green";
  };

  aCamera = new camera({
    center: player,
    follow: true,
    container: document.getElementById('game')
  });
  console.log(player);
  game.anim();
  //createPlancton();
}

function createPlancton()
{
  var plancton = new aGameElement({
    w:1, h:1, x: ~~(Math.random()*250 + 250), y: ~~(Math.random()*250 + 250),
    color:"black", container: document.getElementById('game'), types: ['collectible'],
    handlesCollision: true
  });
  plancton.value = 1;
  //console.log(player);
  plancton.addCollider(player);
  window.setTimeout(createPlancton, Math.random(500) + 500);
}

/*anotherGameElement = new aGameElement({
  w: 50, h:50, x:100, y:20, container: document.getElementById('game'), types: ['wall']
});*/

//var pgen = aParticleGenerator({x:50,y:100, r:10, duration: 1});

var game;
var player;
var acamera;

function startgame()
{

  game = new aGame();

  game.game(50,50,document.getElementById('game'));


  player = new aGameElement({
    w: 5, h:5, x:window.innerWidth/2, y:window.innerHeight/2, color:"blue", container: document.getElementById('game'),
    handlesKeyDown: true, handlesMouseDown: true, acceleration: true, speed: 2, types: ['player'], accelerationSpeed: 1
  });


  player.counter = 0;
  var playerControl = new aKeyboardControler({
    gameObject: player
  });
  player.handlesCollision = true;
  for (var i = 0; i < 100; i++)
  {
    var plancton = new aGameElement({
      w:1, h:1, x: ~~(Math.random()*250 + 250), y: ~~(Math.random()*250 + 250),
      color:"black", container: document.getElementById('game'), types: ['collectible'],
      handlesCollision: false
    });
    plancton.value = 1;
    plancton.addCollider(player);
  }

  player.mouseDownAt = function(x,y)
  {
    var tmp = new projectile({
      x:this.x, y: this.y, targetY: y, targetX: x
    });
  }
  //player.addCollider(anotherGameElement);
  var textBox = new aGameElement({
    w: window.innerWidth*0.33, h:window.innerHeight*0.33, x:window.innerWidth/2, y:window.innerHeight/2, container: document.getElementById('game'),
    color: "transparent"
  });
  textBox.style.display = 'none';
  spawnEnemie();
  player.handleCollision = function(someGameElement)
  {
    if(someGameElement.types.indexOf("collectible") > -1)
    {
      this.counter++;
      console.log(this.counter);
      someGameElement.remove();


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
        spawnEnemie();
      }
    }
    if(someGameElement.types.indexOf("enemie") > -1)
    {
      //TODO: Game over screen
      console.log("Game Over");
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
  createPlancton();
}

function createPlancton(x,y,r,n)
{
  if(n>0)
  {
    createPlancton(~~(Math.random()*r*2 - r), ~~(Math.random()*r*2 - r))
    window.setTimeout(function()
    {
      createPlancton(x,y,r,n--);
    }, Math.random(500) + 500);
  }
}

function createPlancton(x,y)
{
  var plancton = new aGameElement({
    w:1, h:1, x: x, y: y,
    color:"black", container: document.getElementById('game'), types: ['collectible', 'plancton'],
    handlesCollision: false
  });
  plancton.value = 1;
  //console.log(player);
  plancton.addCollider(player);
}

function spawnEnemie()
{
  new enemie({});
}

/*anotherGameElement = new aGameElement({
  w: 50, h:50, x:100, y:20, container: document.getElementById('game'), types: ['wall']
});*/

//var pgen = aParticleGenerator({x:50,y:100, r:10, duration: 1});

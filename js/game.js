var game;
var player;
var acamera;

function startgame()
{

  game = new aGame();

  game.game(window.innerWidth,window.innerHeight,document.getElementById('game'));


  player = new aGameElement({
    w: 10, h:10, x:window.innerWidth/2, y:window.innerHeight/2, color:"blue", container: document.getElementById('game'),
    handlesKeyDown: true, handlesMouseDown: true, acceleration: true, speed: 2, types: ['player'], accelerationSpeed: 1
  });

  player.volume = 10*10;
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
  player.counter = 10;

  player.mouseDownAt = function(x,y)
  {
    var tmp = new projectile({
      x:this.x+this.width/2, y: this.y+this.width/2, targetY: y, targetX: x
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
    if(someGameElement.types.indexOf("collectible") > -1)
    {
      this.counter+= someGameElement.value;
      this.volume += someGameElement.value;
      this.width = Math.sqrt(this.volume);
      this.height= Math.sqrt(this.volume);
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
        //spawnEnemie();
      }
    }
    if(someGameElement.types.indexOf("enemie") > -1)
    {
      if(this.width<someGameElement.width)
      {
        //TODO: Game over screen
        //console.log("Game Over");
      }
      else {
        this.width += Math.sqrt(someGameElement.width);
        someGameElement.remove();
      }

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
  enemySpawn();
  floatySpawn();
  createPlanctons(player.x,player.y, 500, Infinity, 1000, 1);
}

function createPlanctons(x,y,r,n,t,v)
{
  //console.log("Plankton", n);
  if(n>0)
  {
    createPlancton(~~(Math.random()*r*2 - r + x), ~~(Math.random()*r*2 - r + y),v)
    window.setTimeout(function()
    {
      createPlanctons(x,y,r,--n,t,v);
    }, Math.random(t) + t);
  }
}

function createPlancton(x,y,v)
{
  //console.log("Plankton created", x, v);
  var plancton = new aGameElement({
    w:1, h:1, x: x, y: y,
    color:"black", container: document.getElementById('game'), types: ['collectible', 'plancton'],
    handlesCollision: false
  });
  plancton.value = v;
  //console.log(player);
  plancton.addCollider(player);
}

/*anotherGameElement = new aGameElement({
  w: 50, h:50, x:100, y:20, container: document.getElementById('game'), types: ['wall']
});*/

//var pgen = aParticleGenerator({x:50,y:100, r:10, duration: 1});

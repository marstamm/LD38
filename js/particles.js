function aParticleGenerator(opts)
{
  this.radius = opts.radius || opts.r || 10;
  this.x      = opts.x || 0;
  this.y      = opts.y || 0;
  this.color  = opts.color || 'black';
  //console.log(opts);
  this.speed  = opts.speed || 10;
  this.duration = opts.duration * 60 || Infinity;
  this.numberOfParticles = opts.numberOfParticles || 100;

  this.gameElement = new aGameElement({
    x: this.x, y: this.y, w: this.radius, h: this.radius, color: "transparent"
  });

  var arrParticles = new Array(this.numberOfParticles);
  this.createParticle
  {
    var that = this;
    for (var i = 0; i < this.numberOfParticles; i++)
    {
      setTimeout(function() {
        this.arrParticles = new particle({
          x: that.x,
          y: that.y,
          color: that.color,
          radius: that.radius,
          duration: that.duration,
          speed: that.speed
        });
      }
      , Math.random()*500);
    }
  }
}

function particle(opts)
{

  this.x      = opts.x || 0;
  this.y      = opts.y || 0;
  this.duration = opts.duration || Infinity;
  this.radius = opts.radius || 10;
  this.startpos = [this.x, this.y];
  this.color  = opts.color || 'black';
  this.speed  = opts.speed || 10;
  this.direction  = opts.direction || [10,10];

  this.alive = true;
  var __this = this;
  this.gameElement = new aGameElement({
    x: this.x, y: this.y, w: 1, h: 1, color: this.color
  });
  this.reset = function()
  {
    //console.log("reset");
    if(this.gameElement.age > this.duration)
    {
      this.alive = false;
      this.gameElement.style.display = 'none';
      this.gameElement.DOMElement.parentNode.removeChild(this.gameElement.DOMElement);
    }
    this.x = this.startpos[0];
    this.y = this.startpos[1];
    this.gameElement.x = this.x;
    this.gameElement.y = this.y;
    this.direction = [
                  this.x + (Math.random()*this.radius*2 - this.radius),
                  this.y + (Math.random()*this.radius*2 - this.radius)
    ]
  };

  this.gameElement.move = function()
  {
    //context of the game-Element
    //console.log(this);
    if(__this.alive)
    {
      var dx = __this.direction[0] - __this.startpos[0];
      var dy = __this.direction[1] - __this.startpos[1];
      this.x += dx*__this.speed * .01;
      this.y += dy*__this.speed * .01;
      if((Math.abs(dy) + Math.abs(dx)) < (Math.abs(__this.startpos[0] - this.x) + Math.abs(__this.startpos[1] - this.y)))
      {
        __this.reset();
      }
    }
  }
  //console.log(this);
  this.reset();
}

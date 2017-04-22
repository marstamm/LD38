function enemie(opts)
{
  this.lvl = opts.lvl || 1;
  this.target = opts.target || player;
  this.hp = opts.hp || this.lvl*5;

  var distanceToPlayer = 100;
  var stdWidth = 10;
  this.element = new aGameElement({
    x: this.target.x + Math.random()*distanceToPlayer + distanceToPlayer,
    y: this.target.y + Math.random()*distanceToPlayer + distanceToPlayer,
    w: stdWidth * this.lvl,
    h: stdWidth * this.lvl,
    color: "red",
    handlesCollision: true,
    speed: this.lvl,
    types: ["enemie"]
  });
  var that = this;
  this.element.move            = function()
  {
    var dx = player.x+player.width/2 - this.x;
    var dy = player.y+player.height/2 - this.y;
    var tmp = Math.max(Math.abs(dx),Math.abs(dy));
    var angle = Math.atan(dy/dx);
    this.style.transform = "rotate(" + angle*180/Math.PI + "deg)";
    this.x += this.movementSpeed * dx/tmp;
    this.y += this.movementSpeed * dy/tmp;
  }
  this.element.handleCollision = function(anotherObject)
  {
    if(anotherObject.types.indexOf("projectile") > -1)
    {
      //Hit by an projectile
      console.log(that.hp);
      that.hp--;
      if(that.hp<1)
      {

        var part = new aParticleGenerator({
          x:this.x, y: this.y, numberOfParticles: that.lvl*10, duration: 1
        });
        console.log(part);
        this.remove();
      }
    }
  }
  return this;
}

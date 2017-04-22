function enemie(opts)
{
  this.lvl = opts.lvl || 1;
  this.target = opts.target || player;
  this.hp = opts.hp || 1;

  var distanceToPlayer = 100;
  var stdWidth = 1;
  this.element = new aGameElement({
    x: this.target.x + Math.random()*distanceToPlayer + distanceToPlayer,
    y: this.target.y + Math.random()*distanceToPlayer + distanceToPlayer,
    w: stdWidth * 20,
    h: stdWidth * 20/3,
    color: "cyan",
    handlesCollision: true,
    speed: 0.1,
    types: ["enemie"]
  });
  this.element.style.backgroundRepeat = "no-repeat";
  this.element.style.backgroundImage = "url('pic/enemy01.png')";
  this.element.style.backgroundSize = "contain";
  var that = this;
  this.element.move            = function()
  {
      if(that.hp>0)
      {
      var dx = player.x+player.width/2 - this.x+this.width/2;
      var dy = player.y+player.height/2 - this.y+this.height/2;
      var tmp = Math.max(Math.abs(dx),Math.abs(dy));
      var angle = Math.atan(dy/dx);
      var degree = angle*180/Math.PI+360;
      //console.log("arc", angle, degree);
      if(dx < 0)
      {
        this.style.transform = "rotate(" + (degree - 180) + "deg)";
      }
      else {
        this.style.transform = "rotate(" + degree + "deg)";
      }
      //console.log("arc", angle, degree, this.style.transform);
      this.x += this.movementSpeed * dx/tmp;
      this.y += this.movementSpeed * dy/tmp;
    }
  }
  this.element.handleCollision = function(anotherObject)
  {
    //console.log("hit");
    if(anotherObject.types.indexOf("projectile") > -1)
    {
      anotherObject.remove();
      //Hit by an projectile
      console.log(that.hp);
      that.hp--;
      if(that.hp<1)
      {
        var part = new aParticleGenerator({
          x:this.x, y: this.y, numberOfParticles: 10, duration: 1
        });
        console.log(part);
        this.remove();
      }
    }
  }
  return this;
}

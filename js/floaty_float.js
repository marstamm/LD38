function floaty(opts)
{
  this.x = opts.x || Math.random()*distanceToPlayer + distanceToPlayer;
  this.y = opts.y || Math.random()*distanceToPlayer + distanceToPlayer
  this.lvl = opts.lvl || 1;
  this.target = opts.target || player;
  this.hp = opts.hp || this.lvl;
  console.log(this.lvl);
  var distanceToPlayer = 100;
  var stdWidth = 1;
  this.element = new aGameElement({
    x: this.target.x + this.x,
    y: this.target.y + this.y,
    w: stdWidth * this.lvl,
    h: stdWidth/3 * this.lvl,
    color: "cyan",
    handlesCollision: true,
    speed: 1,
    types: ["enemie", "floaty"]
  });
  this.direction = [player.x, player.y];
  //this.element.style.backgroundImage = "url('./pic/pet.png')";
  this.element.style.transform = "rotate(" + Math.random()*2-1*180/Math.PI + "deg)";
  console.log(this);
  var that = this;
  this.element.move            = function()
  {
    if(that.hp>0)
    {

      var dx = that.direction[0] - this.x;
      var dy = that.direction[1] - this.y;

      //Player near self?
      if((Math.abs(dx)+Math.abs(dy) < player.width*10) || this.aggro)
      {
        this.aggro = true;
        var tmp = Math.max(Math.abs(dx),Math.abs(dy));
        var angle = Math.atan(dy/dx);
        if (dx <0)
        {
          angle+=Math.PI;
        }
        //console.log("angle",angle,angle*180/Math.PI);
        this.style.transform = "rotate(" + angle*180/Math.PI + "deg)";
        //console.log("angle",angle,angle*180/Math.PI);
        this.x += this.movementSpeed * dx/tmp;
        this.y += this.movementSpeed * dy/tmp;

      }


    }
  }
  this.element.handleCollision = function(anotherObject)
  {
    if(anotherObject.types.indexOf("projectile") > -1)
    {
      this.aggro = true;
      this.style.backgroundColor = "transparent";
      //Hit by an projectile
      console.log(that.hp);
      that.hp -= player.width/10;
      if(that.hp<1)
      {

        var part = new aParticleGenerator({
          x:this.x, y: this.y, numberOfParticles: that.lvl*10, duration: 1
        });
        console.log("enemy dead at", this.x);
        createPlanctons(this.x, this.y, 10, 10, 100/(that.lvl*10), that.lvl*10);
        console.log(part);
        this.remove();
      }
    }
  }
  return this;
}

function enemie(opts)
{
  var distanceToPlayer = player.width * 10;
  this.x = opts.x || Math.random()*distanceToPlayer + distanceToPlayer;
  this.y = opts.y || Math.random()*distanceToPlayer + distanceToPlayer
  this.lvl = opts.lvl || 1;
  this.target = opts.target || player;
  this.hp = opts.hp || 1;
  console.log(this.lvl);
  var distanceToPlayer = 100;
  var stdWidth = 5;
  this.element = new aGameElement({
    x: this.x,
    y: this.y,
    w: stdWidth * this.lvl,
    h: stdWidth/3 * this.lvl,
    color: "transparent",
    handlesCollision: true,
    speed: this.lvl*0.1,
    types: ["enemie"]
  });
  this.element.volume = this.element.width * this.element.height;
  this.element.style.backgroundImage = "url('./pic/enemy01.png')";
  this.element.style.transform = "rotate(" + (Math.random()*2-1)*180/Math.PI + "deg)";
  console.log(this);
  var that = this;
  this.element.move            = function()
  {
    if(that.hp>0)
    {

      var dx = (player.x+player.width/2) - (this.x+this.width/2);
      var dy = (player.y+player.height/2) - (this.y+this.height/2);

      //Player near self?
      //if((Math.abs(dx)+Math.abs(dy) < player.width*10) || this.aggro)
      //{
        this.aggro = true;
        var tmp = Math.max(Math.abs(dx),Math.abs(dy));
        var angle = Math.atan(dy/dx);
        if (dx <0)
        {
          angle+=Math.PI;
        }
        //console.log("angle",angle,angle*180/Math.PI);

        //if(that.lvl*stdWidth > player.width)
        //{
          this.style.transform = "rotate(" + angle*180/Math.PI + "deg)";
          //console.log("angle",angle,angle*180/Math.PI);
          this.x += this.movementSpeed * dx/tmp;
          this.y += this.movementSpeed * dy/tmp;
        /*}
        else
        {
          this.style.transform = "rotate(" + angle*180/Math.PI+180 + "deg)";
          //console.log("angle",angle,angle*180/Math.PI);
          this.x -= this.movementSpeed * dx/tmp;
          this.y -= this.movementSpeed * dy/tmp;
        }*/
      //}


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
        createPlanctons(this.x, this.y, 10, 10, Math.sqrt(this.volume), Math.sqrt(this.volume));
        console.log(part);
        this.remove();
      }
    }
  }
  return this;
}

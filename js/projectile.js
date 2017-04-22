function projectile(opts)
{
  opts.speed = opts.speed || 10;
  opts.w = opts.w || 10;
  opts.h = opts.h || 1;
  opts.color = opts.color ||"black",
  opts.container = opts.container || document.getElementById('game'),
  opts.types = opts.types || ['projectile'],
  opts.handlesCollision = opts.handlesCollision || true

  this.element = new aGameElement(opts);
  this.element.targetX = opts.targetX || 0;
  this.element.targetY = opts.targetY || 0;
  this.element.originalPos = [this.element.x, this.element.y];
  var that = this;
  this.element.move = function()
  {
    //console.log(this);
    //console.log(this.x);
    //throw new Error('möp');
    var dx = that.element.targetX - that.element.originalPos[0];
    var dy = that.element.targetY - that.element.originalPos[1];
    var tmp = Math.max(Math.abs(dx),Math.abs(dy));
    var angle = Math.atan(dy/dx);
    that.element.style.transform = "rotate(" + angle*180/Math.PI + "deg)";
    that.element.x += this.movementSpeed * dx/tmp;
    that.element.y += this.movementSpeed * dy/tmp;
  }
  return this;
}

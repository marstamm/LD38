function camera (opts)
{
  this.center = opts.center || null;
  this.follow = opts.follow || false;
  this.baseOffsetx = opts.offsetX || window.innerWidth/2;
  this.baseOffsety = opts.offsetY || window.innerHeight/2;
  this.relativePossition = [0,0]

  var tmp = 0;
  this.context = opts.context || document.getElementById('game');
  var that = this;
  this.getTranslation = function()
  {
    return {x: this.center.x - this.baseOffsetx,
            y: this.center.y - this.baseOffsety};
  }
  this.updateCamera = function()
  {
    //console.log("möp");
    var newCenter = [this.center.x, this.center.y];
    this.relativePossition[0] += newCenter[0];
    this.relativePossition[1] += newCenter[1];
    //console.log(this.context)
    this.context.style.transform = "translate(" + (-newCenter[0] + this.baseOffsetx )+ "px, " + (-newCenter[1] + this.baseOffsety) + "px)";

    tmp++;
    //if(tmp == 500)
      //console.log(this.context.style);
    /*this.context.childNodes.forEach(child)
    {
      child.style.x -= var newCenter[0];
      child.style.x -= var newCenter[1];
    }*/
  }
  this.update = function()
  {
    this.updateCamera();
  }
  game.registerGameElement(this);
}

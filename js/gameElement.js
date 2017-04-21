function aGameElement(opts)
{
  //console.log(this);
  //Set arguments
  this.actions = opts.actions || [];
  this.DOMElement = opts.DOMElement || document.createElement("div");
  this.style = this.DOMElement.style;

  this.DOMElement.style.position = "absolute";
  this.width = opts.width || opts.w || 10;
  this.height = opts.height || opts.h || 10;
  this.x      = opts.x || 0;
  this.y      = opts.y || 0;
  this.color  = opts.color || 'cyan';
  this.handlesKeyDown = opts.handlesKeyDown || false;
  this.container = opts.container || document.getElementById('game');
  this.keypressed = {};
  this.movementSpeed = opts.speed || 10;

  this.acceleration = opts.acceleration || false;
  this.accSpeed = opts.accelerationSpeed || 1;
  this._currentspeedx = 0;
  this._currentspeedy = 0;
  this.place = function()
  {
    //console.log("placed");
    this.DOMElement.style.left = this.x + this.DOMElement.parentNode.style.left + "px";
    this.DOMElement.style.top  = this.y + this.DOMElement.parentNode.style.top + "px";
  }

  this.collidesWith = function(anotherGameElement)
  {
    var thisBoundingBox = [ this.DOMElement.style.left, this.DOMElement.style.top,
                          this.DOMElement.style.left + this.DOMElement.style.width, this.DOMElement.style.top + this.DOMElement.style.height];
    var otherboundingBoc = [anotherGameElement.DOMElement.style.left, anotherGameElement.DOMElement.style.top,
                          anotherGameElement.DOMElement.style.left + anotherGameElement.DOMElement.style.width, anotherGameElement.DOMElement.style.top + anotherGameElement.DOMElement.style.height];
  }

  this.DOMElement.style.width = this.width;
  this.DOMElement.style.height = this.height;
  this.DOMElement.style.position = "absolute";
  this.DOMElement.style.backgroundColor = this.color;
  this.container.appendChild(this.DOMElement);
  this.place();
  _this = this;

  this.update = function()
  {
    if(this.handlesKeyDown)
    {
      this.move();
      this.place();
    }
  }
  /*this.init = function(width,height,x,y,container)
  {
    console.log("gameElement init");
    console.log(this);

    this.DOMElement.style.position = "absolute";
    container.appendChild(this.DOMElement);
    this.place(x,y);
    return this;
  }
  */
  game.registerGameElement(this);
}

aGameElement.prototype.move = function()
{
  //console.log(this);
  if(!this.acceleration)
  {
    this.y -= this.keypressed['up'] ? this.movementSpeed : 0;
    this.y += this.keypressed['down'] ? this.movementSpeed : 0;
    this.x -= this.keypressed['left'] ? this.movementSpeed : 0;
    this.x += this.keypressed['right'] ? this.movementSpeed : 0;
  }
  else {
    //accelerate if key is pressed
    this._currentspeedy -= this.keypressed['up'] ? this.accSpeed : 0;
    this._currentspeedy += this.keypressed['down'] ? this.accSpeed : 0;
    this._currentspeedx -= this.keypressed['left'] ? this.accSpeed : 0;
    this._currentspeedx += this.keypressed['right'] ? this.accSpeed : 0;

    //decelerate if no key is pressed
    var deccelerationSpeed = this.accSpeed/2;
    if(!(this.keypressed['up'] || this.keypressed['down']))
    {
      if(this._currentspeedy > 0)
      {
        this._currentspeedy = Math.max(0, this._currentspeedy - deccelerationSpeed);
      }
      if(this._currentspeedy < 0)
      {
        this._currentspeedy = Math.min(0, this._currentspeedy + deccelerationSpeed);
      }
    }
    if(!(this.keypressed['left'] || this.keypressed['right']))
    {
      if(this._currentspeedx > 0)
      {
        this._currentspeedx = Math.max(0, this._currentspeedx - deccelerationSpeed);
      }
      if(this._currentspeedx < 0)
      {
        this._currentspeedx = Math.min(0, this._currentspeedx + deccelerationSpeed);
      }
    }

    //Clamp speed
    this._currentspeedy = Math.max(-this.movementSpeed, Math.min(this._currentspeedy, this.movementSpeed))
    this._currentspeedx = Math.max(-this.movementSpeed, Math.min(this._currentspeedx, this.movementSpeed))

    //Acutally move
    this.y += this._currentspeedy;
    this.x += this._currentspeedx;
    console.log(this._currentspeedx)
  }

}

aGameElement.prototype.handleKeyDown = function(key)
//Handles 4-Way control
{
  if(!this.handlesKeyDown || key == undefined)
    return;

  this.keypressed[key] = true;
  //this.move(key);
  console.log(key);
}
aGameElement.prototype.handleKeyUp = function(key)
//Handles 4-Way control
{
  if(!this.handlesKeyDown || key == undefined)
    return;

  this.keypressed[key] = false;
  //this.move(key);
  console.log(key);
}
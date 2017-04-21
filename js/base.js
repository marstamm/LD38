function aGame()
{
  var init = false;
  this.gameElements = [];
  this.container = null;
  this.init = function()
  {
    init = true;
    return this;
  }
  this.game = function(x,y,container)
  {
    console.log(container);
    this.container = container;
    this.x = function(x)
      {
        this.container.style.width = x;
      }
    this.y = function(y)
      {
        this.container.style.height = y;
      }
    this.x(x);
    this.y(y);
    this.container.style.background = 'red';
    return this;
  };

  this.newGameElement = function(width,height,x,y)
  {
    var element = aGameElement;
    element.init(width,height,x,y,this.container);
    this.gameElements.push(element);
    return element;
  }

  this.registerGameElement = function(anElement)
  {
    console.log(this);

    this.gameElements.push(anElement);
  }
  globalgame = this;
  this.anim = function()
  //Gets called every frame and updates the DOM
  {
    //console.log(globalgame.gameElements);
    for (var e in globalgame.gameElements)
    {
      //gconsole.log(e);
      globalgame.gameElements[e].update();
    }
    //console.log("animation")
    //console.log(globalgame.anim);
    window.requestAnimationFrame(globalgame.anim);
  }
}

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
    this.y -= this.keypressed['up'] ? this.movementSpeed : 0;
    this.y += this.keypressed['down'] ? this.movementSpeed : 0;
    this.x -= this.keypressed['left'] ? this.movementSpeed : 0;
    this.x += this.keypressed['right'] ? this.movementSpeed : 0;
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

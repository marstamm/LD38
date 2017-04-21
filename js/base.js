var aGame = new function()
{
  var init = false;
  var gameElements = [];
  this.container = null;
  this.init = function()
  {
    if(!init)
      {
        refresh();
      }
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
    gameElements.push(element);
    return element;
  }

  var updateElement = function(element)
  {
    element.actions.forEach(function(e)
      {
        e(element);
      });
  }

  var refresh = function()
  //Gets called every frame and updates the DOM
  {
    gameElements.forEach(updateElement);
    window.requestAnimationFrame(refresh);
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
  this.container = opts.container || document.getElementById('game');



  this.place = function()
  {
    console.log("placed");
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

}

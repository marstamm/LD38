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
    this.container.style.background = 'transparent';
    //this.container.style.overflow ="hidden";
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
    //console.log(this);

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

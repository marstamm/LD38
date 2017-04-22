function aKeyboardControler(opts)
{
  this.up = opts.up || "w";
  this.down = opts.down || "s";
  this.left = opts.left || "a";
  this.right = opts.right ||"d";
  this.gameObject = opts.gameObject;

  this.lut = {};
  this.lut[this.up] = "up";
  this.lut[this.down] = "down";
  this.lut[this.left] = "left";
  this.lut[this.right] = "right";
  document.addEventListener('keydown', (event) =>
      {
        this.gameObject.handleKeyDown(this.lut[event.key]);
      });
  document.addEventListener('keyup', (event) =>
       {
         this.gameObject.handleKeyUp(this.lut[event.key]);
       });

  document.addEventListener('mousedown', (event) =>
      {
          this.gameObject.handleMouseDown(event);
      });
}

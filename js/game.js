function startgame()
{

  var game = a.init();
  game.game(50,50,document.getElementById('game'));
  var player = new aGameElement({
    w: 25, h:10, x:10, y:20, color:"blue", container: document.getElementById('game')
  });

  console.log(player);
  document.addEventListener('keydown', (event) =>
    {
      console.log(event.key);
    });
}

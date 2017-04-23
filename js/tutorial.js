var explosions = [];
var shooting = [];
function tutorial()
{
  //Load audio files
  explosions.push(new Audio('sfx/explosion01.wav'));
  explosions.push(new Audio('sfx/explosion02.wav'));
  explosions.push(new Audio('sfx/explosion03.wav'));
  explosions.push(new Audio('sfx/explosion04.wav'));
  shooting.push(new Audio('sfx/shoot01.wav'));
}
function tutorial02()
{
  document.getElementById("tutorial01").style.display = "none";
  document.getElementById("tutorial02").style.display = "";
}
function tutorial03()
{
  document.getElementById("tutorial02").style.display = "none";
  document.getElementById("container").style.display = "";
  document.body.style.backgroundImage = "url('pic/eye_cancer.png')";
  startgame();
}
function gameOver(finalScore)
{
  document.body.style.backgroundImage = "";
  document.getElementById("container").style.display = "none";
  document.getElementById("gameOver").innerHTML = 'Unfortunately, you died.<br> But you managed to take ' + finalScore + ' others with you.<br><button type="button" onclick="location.reload()">Try again?</button>';
  document.getElementById("gameOver").style.display = "";
}

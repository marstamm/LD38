function tutorial()
{

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

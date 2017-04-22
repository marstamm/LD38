function enemySpawn(time)
{
  enemySpawnSpawen(time);
}

function enemySpawnSpawen(time)
{
  console.log("enemy spawned");
  var lvl = Math.round((Math.random()*(20))+1);
  var x = (Math.random()*100+player.width*10)*(Math.sign(Math.random()-0.5));
  var y = (Math.random()*100+player.height*10)*(Math.sign(Math.random()-0.5));
  console.log("Enemy:", lvl, x, y);
  new enemie({
    x: player.x + x,
    y: player.y + y,
    lvl: lvl
  });

  window.setTimeout(function()
  {
    enemySpawn(time*0.8);
  }, Math.random()*5000 + 5000);
}

function floatySpawn()
{
  floatySpawnSpawen();
}

function floatySpawnSpawen()
{
  console.log("floaty spawned");
  var lvl = Math.round((Math.random()*(player.width+2))+player.width/2);
  var x = (Math.random()*100+player.width*1.5)*(Math.sign(Math.random()-0.5));
  var y = (Math.random()*100+player.height*1.5)*(Math.sign(Math.random()-0.5));
  console.log("Enemy:", lvl, x, y);
  new floaty({
    x: player.x + x,
    y: player.y + y,
    lvl: lvl
  });

  window.setTimeout(function()
  {
    floatySpawn();
  }, Math.random()*5000 + 5000);
}

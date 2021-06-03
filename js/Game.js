class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      player.getCount();

      form = new Form()
      form.display();
      spaceship1 = createSprite(100, 10);
      spaceship2 = createSprite(500, 200);

      alienBoss = createSprite(displayWidth/2, 50);
     // alienBoss.velocityX =5;
      



      c = [spaceship1, spaceship2];
      npc = [alien, asteroid, spaceStation, alienBoss];

      spaceship1.addImage(spaceship1Img);
      spaceship1.scale = 0.8;
      //spaceship1.velocityY = -4;
      spaceship2.addImage(spaceship2Img);
      spaceship2.scale = 0.8;
      //spaceship2.velocityY = -4;

      //spaceStation.addImage(spaceStationImg);
      laser1 = createSprite(spaceship1 + 50, 10);
      laser1.width = 100;
      laser1.height = 5;
      laser1.shapeColor = "red";

      laser2 = createSprite(spaceship2 + 50, 10);
      laser2.width = 100;
      laser2.height = 5;
      laser2.shapeColor = "red";
    }

  }
  updateState() {
    database.ref("/").update({ gameState: data });
  }

  play() {
    background("brown");
    image(bgImg, 0, -displayHeight * 10, displayWidth, displayHeight * 11);
    form.hide();

    Player.getPlayerInfo();
    player.getAlivePlayers();

    if (allPlayers !== undefined) {
      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop


        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        console.log(x);
        y = displayHeight - allPlayers[plr].distance;
        c[index].x = x;
        c[index].y = y;
        if (index === 0) {
          laser1.x = c[index].x + 50;
          laser1.y = c[index].y + 25;


        } if (index === 1) {
          laser2.x = c[index].x + 50;
          laser2.y = c[index].y + 25;
        }
        index = index + 1;
        //console.log(objects.x);

        if (index === player.index) {
          c[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = c[index - 1].y
          rectMode(CENTER);
          fill("red");
          textSize(20);
          text(allPlayers[plr].name, c[index - 1].x - 20, c[index - 1].y + 150);
          ellipse(c[index - 1].x, c[index - 1].y, 60, 60);
          if (index == 0 && keyIsDown("SPACE")) {
            laser1.velocityY = -4;
          }
          if (index == 1 && keyIsDown("SPACE")) {
            laser2.velocityY = -4;
          } else {
            laser1.velocityY = 0;
            laser1.y = spaceship1.y;

            laser2.velocityY = 0;
            laser2.y = spaceship2.y;
          }

          if( player.playerState===false   &&(c[index - 1].isTouching(alienGroup)||c[index - 1].isTouching(asteroidGroup)|| c[index - 1].isTouching(alienBoss)|| c[index - 1].isTouching(blackHoleGroup))){
              player.playerState=true;
              player.count=0;
              Player.updateAlivePlayer(player.count)
            
          }


        }
        else {
          fill("black")
          textSize(20);
          text(allPlayers[plr].name, c[index - 1].x - 10, c[index - 1].y + 150);
        }


        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null&& player.playerState===false) {
      player.distance = player.distance + 30;
      player.distance = player.distance + 30;
      player.update();
    }
    if (keyIsDown(DOWN_ARROW) && player.index !== null&& player.playerState===false) {
      player.distance = player.distance - 30;
      player.distance = player.distance - 30;
      player.update();
    }

    

    if (frameCount % 100 === 0) {
      this.alien();
    }
    if(frameCount%170===0){
      this.astroid();
    }
    if(frameCount%500===0){
      this.blackHole();
    }
    if(player.state===true){
      this.end();
    }
   // alienBoss.bounceOff(edges);

    drawSprites();
  }

  alien() {
    alien = createSprite(100, alienBoss.y);
    alien.addImage(alienImg);
    alien.scale = 0.5;
    alien.velocityY = 5;
    alien.x= alienBoss.x;
    alienGroup.add(alien);


  }
  astroid() {
    asteroid = createSprite(0, random(100,displayHeight-50));
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.5;
    asteroid.velocityX = 5;
    asteroidGroup.add(asteroid);
   
  }
  blackHole(){

  }
  end() {

    background("yellow");
    form.hide();
    fill("red");
    textSize(20);
    text("Thank you for playing the HyperSpace! Hope you enjoyed", displayWidth / 2 - 200, 300);
    background("black");
      fill("red");
      textSize(40);
      text("Game Over 🤪🤪🤪🤪🤪🤪😳🥵", displayWidth/2-100,displayHeight/2);
    

  }

}

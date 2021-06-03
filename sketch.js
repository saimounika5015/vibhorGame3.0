var canvas, backgroundImage;

var gameState = 0;
var playerCount = 0;
var allPlayers;
var distance = 0;
var database;
var i;
var spaceship1, spaceship2;
var c = [];
var bgImg;
var alien;
var alienBoss;
var form, player, game;
var npc = [];
var alienGroup, asteroidGroup;

var spaceship1, spaceship2
var spaceship1Img, spaceship2Img, alienImg, alienBossImg;
var spaceStation, spaceStationImg;
var asteroid, asteroidImg;
var blackHole, blackHoleImg,blackHoleGroup;
var laser1;
var laser2;
var edges;
function preload() {

  i = createImg("images/formbg.gif");
  spaceship1Img = loadImage("images/spaceship.png");
  spaceship2Img = loadImage("images/spaceship.png");
  bgImg = loadImage("images/spacebg.jpg");
  alienImg = loadImage("images/alien.png");
  alienBossImg = loadImage("images/alien.png");
  asteroidImg = loadImage("images/asteroidImg.png");
  spaceStationImg = loadImage("images/spacestation.png");
  blackHoleImg = loadImage("images/blackholeImg.jpg");
  //laserImg=loadImage("images/laser.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  //game.update(2);
  //console.log(database);
  //edges = createEdgeSprites();
  alienGroup = new Group();
  asteroidGroup =new Group();
  blackHoleGroup =new Group();


}


function draw() {
  if (playerCount === 2) {
    game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play();
  }
  if (gameState === 2) {
    game.update(2);
  }
  //console.log(gameState);
  //console.log(playerCount);

}

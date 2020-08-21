var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var canvas;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImage = loadImage("restart.png");
  gameoverImage = loadImage("gameOver.png");
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
   
  trex = createSprite(0,700,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,700,80000,5);
  //ground.visible = false;
   //ground.addImage("ground",groundImage);
  // ground.x = ground.width /2;
  //ground.velocityX = -4;
  
  invisibleGround = createSprite(200,700,8800,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  restart = createSprite(trex.x +500 , 140, 20, 20);
  gameOver = createSprite(trex.x + 500, 100, 20, 20);
  console.log(restart.x);
  console.log(trex.x);
  
  restart.addImage(restartImage);
  gameOver.addImage(gameoverImage);
  
  restart.visible = false;
  gameOver.visible= false;
  restart.scale = 0.5;
  gameOver.scale = 0.5;
}

function draw() {
  background(150);
  fill("red");
  text("Score: "+ score, trex.x+300,50);
  
  if(gameState === PLAY){
  score = score + Math.round(getFrameRate()/60);
  ground.velocityX = 0;
    
    if(keyDown("b")) {
    trex.velocityY = -10;
  }
    
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
    //ground.x = ground.width/2;
  }
  
    if(keyDown(UP_ARROW)){
      trex.x = trex.x + 4.5;
    }  
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  
    camera.position.y = displayHeight/2;
    camera.position.x = trex.x;

  
  spawnClouds();
  spawnObstacles();
  
  }   
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  
  if(mousePressedOver(restart)) {
    reset();
  }
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(trex.x + 10,120,40,10);
    cloud.y = Math.round(random(80,690));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(trex.x +500,685,10,40);
    obstacle.velocityX = 0;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
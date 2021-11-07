var bow,arrow,bowSound, background;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage, redB,blueB,greenB,pinkB, arrowGroup;
var Fline;
var WIN = 2
var PLAY = 1
var END = 0
var gameState=1
function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  bowSound = loadSound("soundperfect-bow-arrow-hits-target-no-copyright-soundssound-effecthd (4).mp3");
  winSound= loadSound("winSound.mp3");
  deathSound=loadSound("deathSound.mp3");
} 



function setup() {
  createCanvas(windowWidth, windowHeight);
 frameRate(60);
  //crea el fondo
  scene = createSprite(500,50,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 4
  //scene.x = scene.width/5;
  //crea el arco para disparar las flechas
  bow = createSprite(width-50,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1.3;
   
 score=0;
  balloonsG=new Group();
  arrowGroup=new Group();
  redB=new Group();
  blueB=new Group();
  greenB=new Group();
  pinkB=new Group();
  redC=new Group();
  blueC=new Group();
  greenC=new Group();
  pinkC=new Group();
  colliderR=new Group();
  colliderB=new Group();
  colliderG=new Group();
  colliderP=new Group();
  colliderA=new Group();
  Fline=createSprite(width,200,1,400);
  Fline.visible=false;
}

function draw() {
 
 background(20);
 if (scene.x < 0){
   scene.x = scene.width/4;
  
  }
  
  if (gameState===PLAY){
    scene.velocityX = -4;
   bow.y = World.mouseY;
  if (keyDown("space")) {
   createArrow();
  }
    if (World.frameCount % 200 === 0) {   
      redBalloon();                    
  }
  if (World.frameCount % 260 === 0) {   
      blueBalloon();                    
  }
  if (World.frameCount % 320 === 0) {   
      greenBalloon();                    
  }
  if (World.frameCount % 380 === 0) {   
      pinkBalloon();                    
  }
  if (colliderA.isTouching(colliderR)){
    redB.destroyEach();
    colliderR.destroyEach();
    arrowGroup.destroyEach();
    colliderA.destroyEach();
    score=score+3;
    bowSound.play();
  }
  if (colliderA.isTouching(colliderB)){
    blueB.destroyEach();
    colliderB.destroyEach();
    arrowGroup.destroyEach();
    colliderA.destroyEach();
    score=score+1;
    bowSound.play();
  }
  if (colliderA.isTouching(colliderG)){
    greenB.destroyEach();
    colliderG.destroyEach();
    arrowGroup.destroyEach();
    colliderA.destroyEach();
    score=score+1;
    bowSound.play();
  }
  if (colliderA.isTouching(colliderP)){
    pinkB.destroyEach();
    colliderP.destroyEach();
    arrowGroup.destroyEach();
    colliderA.destroyEach();
    score=score+2;
    bowSound.play();
    }
if(colliderR.isTouching(Fline)||colliderB.isTouching(Fline)||colliderG.isTouching(Fline)||colliderP.isTouching(Fline)){
   score=score-5;
  
  }
  if (score<-10){
    gameState=END;
  }
  if (score>150){
    gameState=WIN;
  }
  }
  else if(gameState===END){
    frameRate(60);
    if(World.frameCount % 280 === 0){
      deathSound.play();
    }
   scene.visible=false;
   bow.visible=false;
   score.visible=false;
  fill("red");
  textSize(40);
  text("GAME OVER",width/2,220);
  DeathSound();
  }
  else if (gameState===WIN){
    frameRate(60);
      if(World.frameCount % 280 === 0){
      winSound.play();
    }
   scene.visible=false;
   bow.visible=false;
   score.visible=false;
  fill("green");
  textSize(40);
  text("YOU WIN!!!",108,220);
  WinSound();
  }
  
  
  drawSprites();
  textSize(25);
 fill("orange");
 text("SCORE: "+ score,20,50);

}


//crea las flechas para el arco
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  var arrowC=createSprite(0,0,10,10);
  arrow.addImage(arrowImage);
  arrow.x = width-55;
  arrow.y=bow.y;
  arrow.velocityX = -5;
  arrow.lifetime = 200;
  arrow.scale = 0.25;
  arrowC.x=width-78;
  arrowC.y=arrow.y-2;
  arrowC.velocityX=-5;
  arrowC.lifetime=200;
  arrowC.visible=false;
  arrowGroup.add(arrow);
  colliderA.add(arrowC);
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 5, 5);
  var redC=createSprite(0,Math.round(random(20,370)),1,50);
  red.addImage(red_balloonImage);
  red.velocityX = 10;
  redC.x=red.x+3;
  redC.y=red.y-12;
  redC.velocityX=10;
  redC.lifetime=200;
  red.lifetime = 200;
  red.scale = 0.1;
  redC.visible=false;
  colliderR.add(redC);
  redB.add(red);
}

function blueBalloon() {
 var blue = createSprite(0,Math.round(random(20, 370)), 5, 5);
 var blueC=createSprite(0,0,1,45);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 6;
  blueC.x=blue.x+3;
  blueC.y=blue.y-5;
  blueC.velocityX=6;
  blueC.lifetime=260;
  blue.lifetime = 260;
  blue.scale = 0.1;
  blueC.visible=false;
  colliderB.add(blueC);
  blueB.add(blue);
}

function greenBalloon() {
 var green = createSprite(0,Math.round(random(20, 370)), 5, 5);
 var greenC=createSprite(0,0,1,54);
  green.addImage(green_balloonImage);
  green.velocityX = 6;
  greenC.x=green.x+3;
  greenC.velocityX=6;
  greenC.y=green.y-12;
  greenC.lifetime=260;
  green.lifetime = 260;
  green.scale = 0.1;
 greenC.visible=false;
 colliderG.add(greenC);
  greenB.add(green);
}

function pinkBalloon() {
 var pink = createSprite(0,Math.round(random(20, 370)), 5, 5);
 var pinkC= createSprite(0,0,1,50);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 8;
  pinkC.x=pink.x+4;
  pinkC.velocityX = 8;
  pinkC.y=pink.y-10;
  pinkC.lifetime=200;
  pink.lifetime = 200;
  pink.scale = 1.2;
  pinkC.visible=false;
  colliderP.add(pinkC)
  pinkB.add(pink)
}
function DeathSound(){
  var barrita1 = createSprite(width/2,175,5,5);
  var barrita2 = createSprite(width/2,175,5,5);
  var barrita3 = createSprite(width/2,200,5,5);
  var barrita4 = createSprite(width/2,200,5,5);
  
  barrita1.lifetime=300;
  barrita2.lifetime=300;
  barrita3.lifetime=300;
  barrita4.lifetime=300;
  
  barrita1.velocityX=1;
  barrita2.velocityX=-1;
  barrita3.velocityY=1;
  barrita4.velocityY=-1;
}
function WinSound(){
  var barrita11 = createSprite(width/2,0,5,5);
  var barrita22 = createSprite(width/2,400,5,5);
  var barrita33 = createSprite(0,175,5,5);
  var barrita44 = createSprite(width,175,5,5);
  
  barrita11.lifetime=300;
  barrita22.lifetime=300;
  barrita33.lifetime=300;
  barrita44.lifetime=300;
  
  barrita11.velocityY=1;
  barrita22.velocityY=-1;
  barrita33.velocityX=1;
  barrita44.velocityX=-1;
}
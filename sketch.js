  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  windImg=loadImage("wind.jpg");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  windGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background(0);
  
  if (gameState === "play") {
    
    if(keyDown("left")){
      ghost.x=ghost.x-6
      // escreva o código para mover para a esquerda quando a seta para a esquerda for pressionada
    }
    if(keyDown("right")){
      ghost.x=ghost.x+6
    
      // escreva o código para mover para a esquerda quando a seta para a direita for pressionada
      
    }
    if(keyDown("space")){
      ghost.velocityY=-10
   
     if (tower.y>400){
      tower.y=300
     } 
      
    }
  
   ghost.velocityY = ghost.velocityY + 0.8;
   
   
      //escreva uma condição para a torre de rolagem infinita
      spawnDoors();
     if (climbersGroup.isTouching(ghost)){
     ghost.velocityY=0
     }
     if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
     ghost.destroy();
     gameState="end"
     }
      //escrever um código para fazer o climbersGroup (grupo de escaladores) colidir com o fantasma alterar a velocidade do fantasma  
//escreva um código para fazer o invisibleBlockGroup (grupo de bloco invisível) colidir com o fantasma, destruir o fantasma e mudar o estado de jogo para end.
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  ghost.debug=true;
  ghost.setCollider("circle",-5,8,120);
}

function spawnDoors(){
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //adicione a função aleatória
    door.x=Math.round(random(120, 400))
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    door.y=door.y-5
    climber.x=door.x;
    invisibleBlock.x=climber.x;

    //mude a profundidade do fantasma e da porta
    ghost.depth=door.depth;
    ghost.depth+=1;
     
    door.lifetime=800;
    invisibleBlock.lifetime=800;
    climber.lifetime=800;
    
    doorsGroup.add(door);
    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.add(climber);
    invisibleBlock.debug=true;
  }
}


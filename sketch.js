var towerImg,tower;
var doorImg,door,doorGroup;
var climberImg,climber,climberGroup;
var ghostImg,ghost
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
towerImg = loadImage("tower.png");
doorImg = loadImage("door.png");
climberImg = loadImage("climber.png");
ghostImg = loadImage("ghost-standing.png");
}


function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,20,20);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  
  climberGroup = new Group();
  
  invisibleBlockGroup = new Group();
}




function draw(){
  background(255);
  
  if(gameState==="play"){
  
if(tower.y>600){
  tower.y=300;
}
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy(); gameState = "end" }
  
  spawnDoor();
  }
  
  if(gameState==="end"){
    background(0);
    text("gameover",230,250);
    
      
    
  }
  
  
  drawSprites();
}

function spawnDoor(){
  if(frameCount % 260===0){
    door = createSprite(80,-50,20,20);
    door.addImage("door",doorImg);
    
    climber = createSprite(80,20,20,20);
    climber.addImage("climber",climberImg);
    
    invisibleBlock = createSprite(80,30,20,20);         invisibleBlock.width = climber.width;               invisibleBlock.height = 2;
    
    door.x=Math.round(random(150,450));
    door.velocityY = 2;
    
    climber.x = door.x;
    climber.velocityY = 2;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;

    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    door.lifetime = 300;
    climber.lifetime = 300;
    invisibleBlock.lifetime = 300;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}





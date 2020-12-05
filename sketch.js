
var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,restart,ground,restart,restartimage,fruitscollected;

function preload()
{
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  restartimage=loadImage("auto-restart.png")
}



function setup()
{
  createCanvas(600,400);
  
  score=0;
  fruitscollected=0;
  
  monkey=createSprite(30,350,20,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  
  restart=createSprite(300,250,200,200);
  restart.addImage("resrsdc",restartimage)
  restart.scale=0.5;
  
  ground=createSprite(300,384,1200,10);
  ground.x=ground.width/2;
  
  obstacleGroup=createGroup();
  foodGroup=createGroup();
}


function draw() 
{
  background("lightcyan");
  
  
  if(gameState===PLAY)
    {
    
      
      text("score:"+score,10,20)
  text("fruits collected:"+fruitscollected,480,20)
      restart.visible=false;
      
      score = score + Math.round(getFrameRate()/60);
      
      if(monkey.isTouching(foodGroup))
        {
          fruitscollected=fruitscollected+1;
          foodGroup.destroyEach();
        }
      
      
      
      if(keyDown("space")&&monkey.y>340)
       {
         monkey.velocityY=-10;
       }
       monkey.velocityY=monkey.velocityY+0.3
       monkey.collide(ground);
      
       ground.velocity.x=-4;      
     if(ground.x<0)
      {    
        ground.x=ground.width/2
      }
      
      if(monkey.isTouching(obstacleGroup))
        {
          gameState=END;
        }
       
      spawnfruits();
      spawnobstacles();
    }
  if(gameState===END)
    {
      textSize=190;
      text("game over",200,100)
      restart.visible=true;
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      if(mousePressedOver(restart))
        {
          reset();
        }
      ground.velocityX = 0;
      monkey.velocityY = 0
    }
  

  drawSprites();  
}


function spawnfruits()
{
  if(frameCount%80===0)
  {
    banana=createSprite(600,Math.round(random(180,310)),10,15);
    banana.addImage("banana",bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
     banana.lifetime=150; 
    foodGroup.add(banana);
  }
  
}


function spawnobstacles()
{
  if(frameCount%300===0)
  {
    obstacle=createSprite(600,360,10,15);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
     obstacle.lifetime=150; 
    obstacleGroup.add(obstacle);
  }
  
}

function reset()
{
  gameState=  PLAY;
  score=0;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  fruitscollected=0;
  
}


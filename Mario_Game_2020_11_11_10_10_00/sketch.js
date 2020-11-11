var mario,mario_run,mario_collide,ground,ground_image,brick,brick_image,brick_group,enemy,enemy_image1,enemy_image2,enemy_image3,enemy_image4,enemy_group,mario_collided,gameOver,gameOver_image,restart,restart_image;

var play = 1
var end  = 0 
var gameState= play

function preload(){
  mario_run= loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png")
 mario_collided=loadAnimation("mario00.png")
  ground_image= loadImage("ground2.png")
  brick_image=loadImage("brick.png")
  enemy_image1=loadImage("obstacle1.png");
  enemy_image2=loadImage("obstacle2.png");
  enemy_image3=loadImage("obstacle3.png");
  enemy_image4=loadImage("obstacle4.png");
  gameOver_image=loadImage("gameOver.png");
  restart_image=loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 350);
  mario=createSprite(50,270,10,10);
  mario.addAnimation("mario",mario_run);
  mario.addAnimation("mariofall",mario_collided)
  ground=createSprite(300,330,600,20);
  ground.addImage(ground_image);
  ground.x=ground.width/2
  brick_group=new Group();
  enemy_group=new Group();
  gameOver=createSprite(300,100,600,20)
  restart=createSprite(300,200,600,20)
  gameOver.addImage(gameOver_image);
  restart.addImage(restart_image);
}

function draw() {
 
  background('grey');
  
  if ( gameState===play){ 
    if (keyDown("space")&&mario.y>=271)
  { mario.velocityY=-8}
  mario.velocityY=mario.velocityY+0.4
    
    //Moving and resetting ground
   ground.velocityX=-4
  if (ground.x<0 ){
    ground.x=ground.width/2
  } 
   //spawning obstacles and bricks
    spawn_bricks();
    spawn_obstacles();
    
    if (enemy_group.isTouching(mario)){
        gameState=end
        }
    gameOver.visible=false
    restart.visible=false
    
    
      }
  
  if (gameState===end){
     ground.visible=true;
     mario.visible=true;
     mario.visible=true;
     enemy_group.setVisibleEach(true);
     brick_group.setVisibleEach(true);
     gameOver.visible=true
    restart.visible=true
  
  }
  if (mousePressedOver(restart)){
    reset();
      }
  mario.collide(ground)
  

drawSprites() ;
}

function spawn_bricks(){
 if (frameCount%80===0) {
   brick=createSprite(600,200,10,10);
   brick.addImage(brick_image);
   brick.y=Math.round(random(180,220));
   brick.velocityX= -3;
   brick_group.add(brick);
 }
}

function spawn_obstacles(){
 if (frameCount%100===0) {
   enemy=createSprite(600,270,10,10);
   var num =Math.round(random(1,4))
   switch(num){
     case 1 : enemy.addImage(enemy_image1)
       break;
     case 2 : enemy.addImage(enemy_image2)
       break;
       case 3 : enemy.addImage(enemy_image3)
       break;
       case 4 : enemy.addImage(enemy_image4)
       break;
       default:break;
   }
   enemy.velocityX= -3;
   enemy_group.add(enemy);
   
     } 
}

function reset (){
  gameState=play;
}































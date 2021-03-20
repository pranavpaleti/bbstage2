var gameState="SERVE";
var ballImage,paddleImage;
var edges;
var brick,brickGroup;
var flag=1;
var life=3;
var score=0;
var bg,gameover
function preload(){
  ballImage=loadImage("ball.png");
  paddleImage=loadImage("paddlle.png");
  bg=loadImage("bg.jpg");
  gameover=loadImage("gameover.jpg");
}
function setup() {
  createCanvas(1200,600);
  edges=createEdgeSprites();
  flag=1;

  ball=createSprite(575,530,20,20);
  ball.velocityX=0;
  ball.velocityY=0;
  ball.addImage(ballImage)
  ball.scale=0.2
 // ball.debug=true
  ball.setCollider("circle",0,0,20)
  paddle=createSprite(575,580,100,20);
  paddle.addImage(paddleImage);
  paddle.scale=0.5
 // paddle.debug=true
  paddle.setCollider("rectangle",0,0,200,30);
  brickGroup=new Group();

  for(i=150;i<1050;i=i+50){
   
      brick=createSprite(i,50,40,10);
    brickGroup.add(brick)

  }
  for(i=250;i<950;i=i+50){
    brick=createSprite(i,100,40,10);
    brickGroup.add(brick)
  }
  for(i=350;i<850;i=i+50){
    brick=createSprite(i,150,40,10);
    brickGroup.add(brick)
  }
  for(i=450;i<750;i=i+50){
    brick=createSprite(i,200,40,10);
    brickGroup.add(brick)
  }
  for(i=550;i<650;i=i+50){
    brick=createSprite(i,250,40,10);
    brickGroup.add(brick)
  }
  brick=createSprite(575,300,40,10);
  brickGroup.add(brick);
  for(var i=0;i<brickGroup.length;i++){
 brickGroup.get(i).shapeColor=color(random(0,255),random(0,0),random(0,255));
  }
}
function draw() {
  background(bg); 
  //text(mouseX+","+mouseY,mouseX,mouseY);
   
   
  
   if(keyDown("space")&&gameState==="SERVE"){
     
     gameState="PLAY"
     flag=1;
   }

   if(gameState==="PLAY"){
   flag=flag+1;
    paddle.x=World.mouseX;
    ball.bounceOff(edges[0]);
   ball.bounceOff(edges[1]);
   ball.bounceOff(edges[2]);
   ball.bounceOff(edges[3]);
   ball.bounceOff(paddle);
   for(var i=0;i<brickGroup.length;i++){
    if(ball.isTouching(brickGroup.get(i))){
      ball.bounceOff(brickGroup.get(i))
      brickGroup.get(i).destroy();
      score=score+10;
    }
  }
  if(flag===2){
    ball.velocityX=5;
    ball.velocityY=8;
  }
  if(ball.y>580){
    gameState="SERVE"
    ball.velocityX=0;
    ball.velocityY=0;
    ball.x=575;
    ball.y=530;
    paddle.x=575;
    paddle.y=580;
    life=life-1;
  }
  if(life<1){
    gameState="END"
  }
   }
if(gameState==="END"){
  background(gameover)
  push()
  fill("red")
 textSize(100)
  text("score:"+score,400,500);
  pop()
  brickGroup.destroyEach();

}

  drawSprites();
  text("life:"+life,30,578);
}
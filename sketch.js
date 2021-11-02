const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;
var sound1,cutsound,eating,sad2,air;
var bollon
var mute
var button1
var button2
var rope1,r
var rope2
var fruit_con1
var fruit_con2
var greystar
var star7
var star1
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  greystar = loadImage('g_star1.png')
  star7 = loadImage('star.png')
  star1 = loadImage('stars.png')
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  sound1 = loadSound("sound1.mp3")
  cutsound = loadSound("rope_cut.mp3")
  eating = loadSound("eating_sound.mp3")
  sad2 = loadSound("sad.wav")
  air = loadSound("air.wav")
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(windowWidth-200,50);
  button.size(50,50);
  button.mouseClicked(drop);

  button1 = createImg('cut_btn.png');
  button1.position(windowWidth/2,150);
  button1.size(50,50);
  button1.mouseClicked(drop1);

  button2 = createImg('cut_btn.png');
  button2.position(50,100);
  button2.size(50,50);
  button2.mouseClicked(drop2);


  bollon = createImg('balloon.png');
  bollon.position(50,250);
  bollon.size(100,100);
  bollon.mouseClicked(fruitblow);

  mute = createImg('mute.png');
  mute.position(440,10);
  mute.size(50,50);
  mute.mouseClicked(mutebutton);
sound1.play()
sound1.setVolume(0.5)
  rope = new Rope(15,{x:windowWidth-200,y:59});
  rope1 = new Rope(5,{x:windowWidth/2,y:150});
  rope2 = new Rope(15,{x:50,y:100});
 
  ground = new Ground(windowWidth/2,windowHeight-20,windowWidth,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(windowWidth/2,windowHeight-110,100,100);
  bunny.scale = 0.3;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

 fruit_con = new Link(rope,fruit);
 fruit_con1 = new Link(rope1,fruit);
 fruit_con2 = new Link(rope2,fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  imageMode(CENTER)

star1 = createSprite(30,30,10,10)
star = createSprite(1250,350,100,100)
star1.addImage("sta",greystar)
star1.scale = 0.07
star.addImage("sat",star7)
star.scale = 0.03
}

function draw() 
{
  background(51)
  imageMode(CENTER)
  image(bg_img,windowWidth/2,windowHeight/2,windowWidth,windowHeight);

if(collide(fruit,star)==true){
  console.log("v")
  star.visible = false
}

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope1.show();
  rope2.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny,80)==true)
  {
    eating.play()
    bunny.changeAnimation('eating');
  fruit = null
  World.remove(world,fruit)
  }
   
  //if(collide(fruit,ground.body,70)==true )
  //{
    //sad2.play()
     //bunny.changeAnimation('crying');
   //}
if(fruit != null && fruit.position.y>=950){
  sad2.play()
     bunny.changeAnimation('crying');
     sound1.stop()
     fruit = null
}
   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  cutsound.play()
}

function drop1()
{
  rope1.break();
  fruit_con1.dettach();
  fruit_con1 = null; 
  cutsound.play()
}

function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 
  cutsound.play()
}
function collide(body,sprite,x)
{
  
  if(body!=null)
        {

         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              //World.remove(engine.world,fruit);
               //fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
function fruitblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.1,y:0})
  air.play()
  air.setVolume(0.3)

}
function mutebutton(){
  if(sound1.isPlaying()){
    sound1.stop()
    
  }
else(sound1.play())

if(sad2.isPlaying()){
  sad2.stop()
  
}
else(sad2.play())

}
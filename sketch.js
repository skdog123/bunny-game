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

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubbleImg=loadImage("bubble.png")

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(750,windowHeight-25);
 
  frameRate(80);

  //bk_song.play();
  //bk_song.setVolume(1);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(200,390);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("cut_btn.png")
  button2.position(380,365);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  

  mute_btn = createImg('mute.png');
  mute_btn.position(650,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(3,{x:200,y:390},);
  rope2 = new Rope2(4,{x:400,y:365},);
  
  ground = new Ground(485,265,100,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(455,195,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  bubble = createSprite(440,550,100,100);
  bubble.addImage(bubbleImg)
  bubble.scale=0.2
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link2(rope2,fruit);
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

 

  var render = Matter.Render.create({ element:document.body, engine:engine, options: { width:800, height:600, wireframes:false } }); Matter.Render.run(render);
}

function draw() 
{
  background(bg_img);
  //image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    bunny.changeAnimation('eating');
    bubble.visible=false
    eating_sound.play();
    World.remove(engine.world,fruit);
    fruit = null;
  }

  if(collide(fruit,bubble,50)==true)
  {
   bubble.position.x=fruit.position.x,bubble.position.y=fruit.position.y
   Body.applyForce(fruit,fruit.position,{x:0,y:-0.0025})
  // engine.world.gravity.y=-0.2
  
  }

  if(fruit!=null && fruit.position.y>=height-40)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}

function collide(body,sprite,u)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=u)
            {
             
               
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var box6,box7,box8,box9,box10,box11,box12,box13;

var pig4;
var gameState = "onSling";
var bg = 'sprites/bg.png'
var score = 0;

function preload() {
    getbackgroundImage();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(600,320,70,70);
    box2 = new Box(820,320,70,70);
    pig1 = new Pig(710, 350);
    log1 = new Log(710,260,300, PI/2);

    box3 = new Box(600,240,70,70);
    box4 = new Box(820,240,70,70);
    pig3 = new Pig(710, 220);
    pig4 = new Pig(1050,380);
    log3 =  new Log(710,180,300, PI/2);

    box5 = new Box(710,160,70,70);
    log4 = new Log(650,120,150, PI/7);
    log5 = new Log(810,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

    box6 = new Box(940,320,70,70);
    box7 = new Box(940,250,70,70);
    box8 = new Box(1160,320,70,70);
    box9 = new Box(1160,250,70,70);
    
    box10 = new Box(940,240,40,40);
    box11 = new Box(1160,240,40,40);
    box12 = new Box(940,220,20,20);
    box13 = new Box(1160,220,20,20)
}

function draw(){
    if (backgroundImg)
    background(backgroundImg);

noStroke()
textSize(35);
fill('white')
text('score '+score,width-300,50)

    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();
pig4.display();
    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    

    box6.display();
box7.display();
box8.display();
box9.display();
box10.display();
box11.display();
box12.display();
box13.display();

}

function mouseDragged(){                                                   
   // if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
   // }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 1 ){   
        bird.trajectory = []
        slingshot.attach(bird.body);
        Matter.Body.setPosition(bird.body,{x:200,y:50})
    }
}
 async function getbackgroundImage(){
    var response = await fetch('http://worldtimeapi.org/api/timezone/Asia/kolkata')
    var responseJSON = await (response.json())
    var datetime = responseJSON.datetime
    var hour = datetime.slice(11,13)
    if (hour>= 06  &&hour<=19){
        bg = 'sprites/bg.png'
    }
    else {bg = "sprites/bg2.jpg"}
    backgroundImg = loadImage(bg)

}
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board=[];
var board1, board2;
  var numberOfArrows=10;
  var score=0;


function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );

  board1= new Board(width-300,230,50,200);
  board2 =  new Board(width-550,height-350,50,200);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();
  board1.display();
  board2.display();

  for (var i = 0; i < playerArrows.length; i++) {
  showArrows(playerArrows[i], i);
  handleCollision(i);
}

if(numberOfArrows==0){
gameOver();
}


  //handleCollision();

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
  textSize(30)
text(`Remaining Arrows:${numberOfArrows}`, width - 200, 50)
text(`Score:${score}`,width-1300, 50)
}


function handleCollision(index){
  for(var i = 0; i < playerArrows.length; i++){
    if(playerArrows[i]!== undefined && board[index]!==undefined){
playerArrows[i].display();
    
    var board1Collision= Matter.SAT.collides(
      board1.body,
      playerArrows[i].body
    )

    var board2Collision= Matter.SAT.collides(
      board2.body,
      playerArrows[i].body
    )

    if(board1Collision.collided /*|| board2Collision.collided*/){
      score+= 5;
      console.log("Collided")
    }
  }}

  }



function keyPressed() {
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;
    //console.log(angle);

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);
  arrow.trajectory= [];
    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}


function showArrows(playerArrow, index) {
  if (playerArrow) {
    playerArrow.display();
    if(playerArrow.body.position.x>= width || playerArrow.body.position.y>= height-50 ){
      playerArrow.remove(index);
    }
  }
}





function keyReleased() {
  if (keyCode === 32) {
    if (numberOfArrows>0) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
      numberOfArrows= numberOfArrows-1;
    }
  }


}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://www.pngitem.com/pimgs/m/17-170163_bow-and-arrow-drawing-bow-and-arrow-animated.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}



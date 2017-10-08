var bird;
var pipes = [];
var mic;
var clapping = false;
var points = 0;
var showonce = false;
var menu;
var replay;
var greeting;
var start;


function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());

  greeting = createElement('h2', 'GAME OVER');
  greeting.addClass('greeting');
  greeting.position(windowWidth*0.35, windowHeight*0.30);
  greeting.hide();
  
  replay = createButton("PLAY AGAIN");
  replay.addClass('replayButton');
  replay.addClass('hvr-pulse-grow');
  replay.mousePressed(resetSketch);
  replay.position(windowWidth*0.45, windowHeight*0.55);
  replay.size(200, 50);
  replay.hide();

  menu = createButton("MAIN MENU");
  menu.addClass('menuButton');
  menu.addClass('hvr-pulse-grow');
  menu.mousePressed(mainMenu); // back to main menu ID
  menu.position(windowWidth*0.45, windowHeight*0.62);
  menu.size(200, 50);
  menu.hide();

  noLoop();
  $(".canvas-row").css("visibility", "hidden");

}


function resetSketch () {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
  points = 0;
  pipes = [];
  showonce = false;
  greeting.hide();
  menu.hide();
  replay.hide();
  // $("#sketch-holder").css("opacity", "1");
  $("#points").css("visibility", "hidden");
  $("#result").css("visibility", "hidden");

}

function startGame() {
  loop();
  $(".canvas-row").css("visibility", "visible");
  resetSketch();
  // start.hide();
}

function mainMenu() {
  noLoop();
  $(".home-page").show();
  $(".game-page").hide();
  $(".greeting").css("visibility", "hidden");
  $(".replayButton").css("visibility", "hidden");
  $(".menuButton").css("visibility", "hidden");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pipes = [];
}

var c = 0; // Frame Rate in Draw
var onepoint = false;

function draw() {
  background(0);

  var vol = mic.getLevel();

  var dead = false;
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    
    
    if (pipes[i].hits(bird)) {
      console.log("HIT");
      dead = true;

      if (showonce == false)
      {
        showonce = true;
        greeting.show();
        menu.show();
        replay.show();
        // $("#sketch-holder").css("opacity", "0.5");
        $("#result").css("visibility", "visible");
        $("#points").css("visibility", "hidden");
        $(".greeting").css("visibility", "visible");
        $(".replayButton").css("visibility", "visible");
        $(".menuButton").css("visibility", "visible");
      }

    }
    
    if (dead == false) {
      pipes[i].update(false)
    }
    else
    {
      for (var j in pipes)
       {
        pipes[j].speed = 0;
       }
    }
    
    if (pipes[i].points() && dead == false)
    {
      if (onepoint == false)
      {
        points++;
        onepoint = true;
        $("#points").css("visibility", "visible");
      }
      
    }

    c++;
    if (c > 50)
    {
      onepoint = false;
      c = 0;
    }

    if (points >= 11 && points <= 20) {
      pipes[i].speed = 5;
    } 

    if (points >= 21 && points <= 30) {
      pipes[i].speed = 6;
    } 

    if (points >= 31 ) {
      pipes[i].speed = 7;
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

    $("#points").html(points);
    $("#result").html('YOUR SCORE: ' + points);
  }

  if (dead == false)
  bird.update();
  bird.show();

  if (dead == false && frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }


}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}

var bird;
var pipes = [];
var mic;
var sliderTop;
var sliderBottom;
var clapping = false;
var points = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pipes = [];
}

function draw() {
  background(0);

  var vol = mic.getLevel();

  var dead = false;
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    
   
    if (pipes[i].hits(bird)) {
      console.log("HIT");
      dead = true;
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

    if (pipes[i].points())
    {
      points++;
      // pipes[i].speed = 5;
      console.log(points);
    }

      // if (points > 5 && points <= 10) {
      //   pipes[i].speed = 5;
      // } else if (points > 10 && points <= 15) {
      //   pipes[i].speed = 7;
      // }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

    $("#points").html(points);
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

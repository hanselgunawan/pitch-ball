
function Bird() {
// ball positions and down force
  this.y = height / 2;
  this.x = 0.09*width;
  this.gravity = 1.3;
  this.lift = -30;
  this.velocity = 0;

// this will keep on loop
  this.show = function() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 32, 32);
  }
// the velocity to make the ball up
  this.up = function() {
    this.velocity += this.lift;
  }
// velocity and gravity calculation to set the amount of down force to keep ball on frame
  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}

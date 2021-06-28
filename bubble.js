class Bubble {
  constructor(minRadius, maxRadius) {
    this.pos = createVector(random(2*maxRadius, width - 2*maxRadius), random(2*maxRadius, height - 2*maxRadius));
    this.vel = p5.Vector.random2D();
    this.rad = floor(random(minRadius, maxRadius));

    this.color = random(360);
    this.maxSpeed = random(10, 20) / (this.rad / 2);
    
    this.vel.setMag(this.maxSpeed);
  }

  show() {
    colorMode(HSB);
    fill(this.color, 150, 150, 0.5);
    stroke(this.color, 255, 255);
    strokeWeight(2);
    circle(this.pos.x, this.pos.y, this.rad*2);
  }

  update(bubbleTree) {
    let range = new Circle(this.pos.x, this.pos.y, 50);
    let neighbours = bubbleTree.query(range);

    if (this.edges()) {
      this.color = floor(random(360));
    }

    this.collide(neighbours);
    this.pos.add(this.vel);

    this.vel.setMag(this.maxSpeed);
  }


  collide(neighbours) {
    //LET'S DO SOME ELASTIC COLLISIONS!
    //
    //Ok I worked on this for so long, and almost got it, but
    //then I found this implementation on the p5.js website and yoinked it.
    //https://p5js.org/examples/motion-bouncy-bubbles.html
    //
    for (let other of neighbours) {
      let dx = other.pos.x - this.pos.x;
      let dy = other.pos.y - this.pos.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = other.rad + this.rad;

      if (distance < minDist) {
        let angle = atan2(dy, dx);
        let targetX = this.pos.x + cos(angle) * minDist;
        let targetY = this.pos.y + sin(angle) * minDist;
        let ax = (targetX - other.pos.x);
        let ay = (targetY - other.pos.y);
        this.vel.x -= ax;
        this.vel.y -= ay;
        other.vel.x += ax;
      }
    }
  }

  edges() {
    if (this.pos.x + this.rad >= width) {
      this.vel.x *= -1;
      return true;
    }
    if (this.pos.x - this.rad < 0) {
      this.vel.x *= -1;
      return true;
    }
    if (this.pos.y + this.rad > height) {
      this.vel.y *= -1;
      return true;
    }
    if (this.pos.y - this.rad < 0) {
      this.vel.y *= -1;
      return true;
    }
  }
}
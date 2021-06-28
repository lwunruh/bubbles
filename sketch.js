let bubbles;
const population = 100;
const minRadius = 10;
const maxRadius = 25;

let showTree = false;

function setup() {
  createCanvas(windowWidth, windowHeight-50);
  resetSketch();

  let treeCheck = createCheckbox("Show Tree", false);
  treeCheck.changed(showTreeCheck);
  treeCheck.position();
  
  let resetButton = createButton("Reset");
  resetButton.mouseClicked(resetSketch);
  resetButton.position(100, height);
}

function resetSketch() {
  bubbles = [];
  for (let i = 0; i < population; i++) {
    bubbles.push(new Bubble(minRadius, maxRadius));
  }
}

function draw() {
  clear();
  background("rgb(16, 16, 16)");

  bubbleTree = new QuadTree(new Rectangle(width/2, height/2, width, height), 1);
  for(let b of bubbles){
    bubbleTree.insert(new Point(b.pos.x, b.pos.y, b));
    b.show();
  }
  
  if(showTree){
    bubbleTree.show();
  }
  
  for(let b of bubbles){
    b.update(bubbleTree);
  }

  //noLoop();
}

function showTreeCheck(){
  if (this.checked()) {
    showTree = true;
  } else {
    showTree = false;
  }
}
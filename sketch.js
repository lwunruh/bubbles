let bubbles;
let population = 50;
const minRadius = 10;
const maxRadius = 25;

let showTree = false;
let popSlider;

function setup() {
  createCanvas(windowWidth, windowHeight-50);
  resetSketch();

  let treeCheck = createCheckbox("Show Tree", false);
  treeCheck.changed(showTreeCheck);
  treeCheck.position();
  
  let resetButton = createButton("Reset");
  resetButton.mouseClicked(resetSketchButton);
  resetButton.position(100, height);

  popSlider = createSlider(1, 500, 50);
  popSlider.position(15, height - 25)
  popSlider.changed(changePop);
}

function changePop(){
  population = popSlider.value();
  resetSketch();
}

function resetSketchButton() {
  population = 50;
  popSlider.value(50);
  resetSketch();
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
  textSize(20);
  stroke("white");
  fill("white");
  text(popSlider.value() + " bubbles", popSlider.x + popSlider.width+10, height-5);

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
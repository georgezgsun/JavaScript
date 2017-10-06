function setup() {
	creatCanvas(600,400);

}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    file(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}

function Node(value){
this.value = value;
this.edges = [];
this.searched = false;
this.parent = null;
this.movie = false;


  // Nodes have physics now!
  this.pos = createVector(random(width),random(height));
  this.vel = createVector();

  // And a color
  this.col = color(0);

  this.nodeclicked = function(){
    var d = dist(this.pos.x, this.pos.y, mouseX, mouseY)
    var radius = textWidth(this.value) / 2;
    if(d < radius)
    {
      return this;
    }
  }
}

Node.prototype.addEdge = function (neighbour) {
this.edges.push(neighbour);
neighbour.edges.push(this)
}



// Is this node connected to another node?
Node.prototype.isConnected = function(neighbor) {
  var index = this.edges.indexOf(neighbor);
  if (index >= 0) {
    return true;
  } else {
    return false;
  }
}


// Draw!
Node.prototype.show = function() {
  textAlign(CENTER);
  var w = textWidth(this.value);
  stroke(255);
  fill(this.col);
  ellipse(this.pos.x, this.pos.y, w * 1, w *1);
  fill(255);
  noStroke();
  text(this.value, this.pos.x, this.pos.y);
}

// Highlight!
Node.prototype.highlight = function() {
  this.col = color(0, 150, 0);
}

// Draw connections as lines
Node.prototype.showEdges = function() {
  noFill();
  stroke(255);
  for (var i = 0; i < this.edges.length; i++) {
    line(this.pos.x, this.pos.y, this.edges[i].pos.x, this.edges[i].pos.y);
  }
}

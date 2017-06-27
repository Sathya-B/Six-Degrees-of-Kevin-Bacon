function Graph() {
  this.nodes = [];
  this.graph = {};

  // Start and end
  this.start = null;
  this.end = null;

  // Now a "rest distance" between nodes
  this.springLength = 125;
}

Graph.prototype.addNode = function (node) {
  this.nodes.push(node);
  var title = node.value;
  this.graph[title] = node;
}

Graph.prototype.getNode = function (actor) {
  var n = this.graph[actor];
  return n;
}



// Set start
Graph.prototype.setStart = function (node) {
  this.start = node;
}

// Set end
Graph.prototype.setEnd = function (node) {
  this.end = node;
}

// Draw everything
Graph.prototype.show = function () {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].showEdges();
  }
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].show();
  }
}

// Simulate some physics!
Graph.prototype.simulate = function () {

  // First node always in center
  this.nodes[0].pos.set(width / 2, height / 2);

  // Look at every node against every other node
  for (var i = 1; i < this.nodes.length; i++) {
    var node1 = this.nodes[i];
    for (var j = 0; j < this.nodes.length; j++) {
      // Nodes don't interact with themselves!
      if (i == j) continue;
      var node2 = this.nodes[j];

      // A vector that points between the nodes
      var force = p5.Vector.sub(node1.pos, node2.pos);
      var dist = force.mag();

      // What is spring force?
      var spring = 0;
      var k = 0.15;
      // If they are connected calculate
      if (node1.isConnected(node2) || node2.isConnected(node1)) {
        spring = k * (this.springLength - dist);
      }
      // All nodes need their own space even if not connected
      var separate = 1 / (dist * k);
      // Apply the force!
      force.setMag(spring + separate)
      node1.vel.add(force);
      // Slow down velocity so that it dampens over time
      node1.vel.mult(0.95);
    }
  }

  // Add velocity to position for all nodes
  var locationw = .15;
  var locationh = .25;
  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    if (node.movie == true) {
      node.pos.set(width / (1 + locationw), height / (1 + locationh));

      locationw = locationw + 1.75;
    }
    else {
      node.pos.add(node.vel);
    }
    if(locationw > 3)
    {
      locationw = .5;
      locationh = locationh + 1.25;
    }
  }
}
var data;
var graph = new Graph();
function preload(){
data = loadJSON('kevinbacon.json');
}

function setup(){
createCanvas(1000, 1000);

var movies = data.movies;

 
for (var i=0; i < movies.length; i++)
{   
    if(i==0)
    {
     graph.setStart(movies[i].title);
    }
    if (i == (movies.length -1))
    {
        graph.setEnd(movies[i].title)
    }
    var movie = movies[i].title;
    var cast = movies[i].cast;

    var movieNode = new Node(movie);
    movieNode.col = color(155, 55, 55);
    movieNode.movie = true;
    graph.addNode(movieNode);
    for(var j=0; j < cast.length; j++)
    {
        var actor = cast[j];

        var actorNode = graph.getNode(actor);
        if(actorNode == undefined)
        {
            actorNode = new Node(actor);
        }
        actorNode.col = color(96, 88, 158);
        graph.addNode(actorNode);
        movieNode.addEdge(actorNode);
    }
}

console.log(graph);

}
function draw() {
  background(51);
  graph.simulate();
  graph.show();
}
var node;
function mousePressed(){
    for(var i=0; i< graph.nodes.length; i++)
    {
     var clickednode =  graph.nodes[i].nodeclicked();
     if(clickednode != undefined)
     {
         node = clickednode;
     }
    }
}

function mouseReleased(){
    if(node != undefined)
    {
    node.pos = createVector(mouseX, mouseY);
    }
    node = undefined;
}
var data;
var graph = new Graph();
function preload(){
data = loadJSON('kevinbacon.json');
}

var dropdownactor1;
var dropdownactor2;
var textbox ;

function setup(){
dropdownactor1 = createSelect();;
dropdownactor2 = createSelect();;
dropdownactor1.changed(breadthFirstSearch);
dropdownactor2.changed(breadthFirstSearch);
textbox = createElement('h1',"");
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
            dropdownactor1.option(actor);
            dropdownactor2.option(actor);
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


function breadthFirstSearch(){

result = ''
graph.resetStartEnd();

var startNode = graph.setGraphStart(dropdownactor1.value());
var endNode = graph.setGraphEnd(dropdownactor2.value());


console.log(startNode);
console.log(endNode);

var queue = [];

startNode.searched = true;
queue.push(startNode);

while(queue.length > 0)
{   
    var currentNode = queue.shift();
    if(currentNode == endNode) {
        console.log("Found " + currentNode.value);
        break;
    }
    else{
        console.log("Not Found");
    }
    for(var i=0; i < currentNode.edges.length; i++)
    {
        var neighbor = currentNode.edges[i];      
        if(!neighbor.searched)
        {
            neighbor.searched = true;
            neighbor.parent = currentNode;
            queue.push(neighbor); 
        }
    }

}

var path = [];
path.push(endNode);
var next = endNode.parent;
while(next!=null){
  path.push(next);
  next = next.parent;
}

for(var i=0; i < path.length; i++)
{
    var node = path[path.length-(i+1)];
    node.col = color(98,0,78)
    result += node.value;
    if(i!= path.length -1)
    {
        result  += "-->";
    }
}

textbox.elt.textContent = result;
}

var result = '';



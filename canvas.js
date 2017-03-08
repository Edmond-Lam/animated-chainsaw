var svgImage = document.getElementById("svgImage");
var clear_button = document.getElementById("clear");
var mousex, mousey;

svgImage.addEventListener("mousemove", function(e) {
    mousex = String(e.offsetX);
    mousey = String(e.offsetY);
});

var circleClick = function(e) {
    console.log("Circle: " + e.target);
}

var addDot = function(e) {
    console.log("SVG: " + e.target)
    if (this == e.target) {
	var dot = makeDot(mousex, mousey);
    }
    document.getElementById("svgImage").appendChild(dot);
}

var makeDot = function(x, y){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    
    c.setAttribute("cx", x);
    
    c.setAttribute("cy", y);
    
    c.setAttribute("r", "20");
    
    c.setAttribute("fill", "black");

    return c;
}



var clear_screen = function(e){
    while (svgImage.hasChildNodes()){
	svgImage.removeChild(svgImage.lastChild);
    }
}


svgImage.addEventListener("click", addDot);


clear_button.addEventListener("click", clear_screen);

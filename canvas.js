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
    svgImage.appendChild(dot);
}

var change = function(e){
    if (this.getAttribute("fill") == "black"){
	this.setAttribute("fill", "red");
	console.log("color");
	e.stopPropagation();
    }
    else {
	this.parentNode.removeChild(this);
	e.stopPropagation();
	var dot = makeDot(String(Math.floor(Math.random() * 500)), String(Math.floor(Math.random() * 500)));
	svgImage.appendChild(dot);
    }
}
			    

var makeDot = function(x, y){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    
    c.setAttribute("cx", x);
    
    c.setAttribute("cy", y);
    
    c.setAttribute("r", "20");
    
    c.setAttribute("fill", "black");

    c.setAttribute("id", "dot");

    c.addEventListener("click", change);

    return c;
}

   



var clear_screen = function(e){
    while (svgImage.hasChildNodes()){
	svgImage.removeChild(svgImage.lastChild);
    }
}


svgImage.addEventListener("click", addDot);


clear_button.addEventListener("click", clear_screen);

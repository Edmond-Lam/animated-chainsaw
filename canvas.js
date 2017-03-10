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
	var dot = makeDot(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500));
	svgImage.appendChild(dot);
    }
}
			    

var makeDot = function(x, y){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    
    c.setAttribute("cx", x);
    
    c.setAttribute("cy", y);
    
    c.setAttribute("r", "20");
    
    c.setAttribute("fill", "black");

    c.setAttribute("class", "dot");

    c.setAttribute("data-incrementX", "1");

    c.setAttribute("data-incrementY", "1");

    c.addEventListener("click", change);

    return c;
}

   



var clear_screen = function(e){
    window.cancelAnimationFrame(rid);
    while (svgImage.hasChildNodes()){
	svgImage.removeChild(svgImage.lastChild);
    }
}


svgImage.addEventListener("click", addDot);


clear_button.addEventListener("click", clear_screen);

var rid;

var move = function(e){
    window.cancelAnimationFrame(rid);
    var animate = function(){
	var dots = document.getElementsByClassName("dot");
	for(i = 0; i < dots.length; i++){
	    var x = parseInt(dots[i].getAttribute("cx"));
	    var y = parseInt(dots[i].getAttribute("cy"));
	    var inc_x = parseInt(dots[i].getAttribute("data-incrementX"));
	    var inc_y = parseInt(dots[i].getAttribute("data-incrementY"));
			    
	    if(x == 20 || x == 480){
		inc_x = inc_x * -1;
		dots[i].setAttribute("data-incrementX", String(inc_x));
	    }
	    if(y == 20 || y == 480){
		inc_y = inc_y * -1;
		dots[i].setAttribute("data-incrementY", String(inc_y));
	    }
	    
	    
	    x = x + inc_x;
	    y = y + inc_y;
	    dots[i].setAttribute("cx", x);
	    dots[i].setAttribute("cy", y);
	    if(x == 250){
		divide(dots[i]);
	    }
	}
	rid  = window.requestAnimationFrame(animate);
    }
    animate();
}

var divide = function(dot){
    
    var r = parseInt(dot.getAttribute("r")) / 2;
    if(r >= 1){
	var dot2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	var x = parseInt(dot.getAttribute("cx"));
	var y = parseInt(dot.getAttribute("cy"));
	var inc_x = parseInt(dot.getAttribute("data-incrementX"));
	var inc_y = parseInt(dot.getAttribute("data-incrementY"));
	dot2.setAttribute("fill", "black");
	dot2.setAttribute("class", "dot");
	dot2.addEventListener("click", change);
	dot.setAttribute("r", r);
	dot2.setAttribute("r", r);
	dot2.setAttribute("cx", x);
	dot2.setAttribute("cy", y);
	dot2.setAttribute("data-incrementX", inc_x * -1);
	dot2.setAttribute("data-incrementY", inc_y * -1);
	svgImage.appendChild(dot2);
    }else{
	dot.parentNode.removeChild(dot);
    }
    
}

var move_button = document.getElementById("move");

move_button.addEventListener("click", move);

var stop = function(){
    window.cancelAnimationFrame(rid);
}

var stop_button = document.getElementById("stop");
stop_button.addEventListener("click", stop);

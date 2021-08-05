// console.log("r/place");


var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// // c stands for content
// // a super object
var c = canvas.getContext('2d');
// // c.fillRect(x, y, width, height);
// c.fillStyle = 'rgba(255, 0, 0, 0.3)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.3)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.3)';
// c.fillRect(300, 300, 100, 100);
// console.log(canvas);

// // Line
// c.beginPath(); // start a path
// // c.moveTo(x, y); where the path is going to start
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();


// // Arc / Circle
// // Takes quite a few arguments
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();


// for (var i = 0; i < 10; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = "dark blue";
//     c.stroke();
// }




/** Makes a circle bounce back and forth */
// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// // Get either positive or negative value
// var dx = (Math.random() - 0.5) * 15;
// var dy = (Math.random() - 0.5) * 15;
// var radius = 30;
// // Creates a function
// function animate() {
//     // requestAnimationFrame() takes another function as an argument
//     // creates a loop
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);
//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI * 2, false);
//     c.strokeStyle = "red";
//     c.stroke();

//     // Keeps bouncing
//     if (x + radius > innerWidth || x - radius < 0) {
//         dx = -dx;
//     }

//     if (y + radius > innerHeight || y - radius < 0) {
//         dy = -dy;
//     }
//     x += dx;
//     y += dy;

// }

// animate();








// ------------------------



// declare what type of event we want to monitor 
// we want to monitor our mouse's postion whenever we move it across the screen 
// Then need a function to call whenever this event occurs 
//      whenever we move our mouse across our canvas, the anonymous function is going to be called

// In order to get these circles to interact with our mouse whenever we are moving it,
// we need to take into consideration some geometry 
// get distance between mouse position and distance between each of these individual circles

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 50;
// var minRadius = 8;

var colorArray = [
    '#7B8081',
    '#EFF1F2',
    '#2C4B5D',
    '#99A9B2',
    '#1B2325'
];


window.addEventListener('mousemove',
    function (event) {
        // console.log(event);
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    })


window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

// Creates a javascript object
// Each time we create a new circle, we are goona pass a new x argument
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;  // each circle has its own min radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    // draw a circle whenever it is called
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = "red";
        // c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function () {
        // Keeps bouncing
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // for those circles that within 50 distance of the mouse, increase their size
        if (mouse.x - this.x < 100 && mouse.x - this.x > -100 &&
            mouse.y - this.y < 100 && mouse.y - this.y > -100) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }

        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }

}


var circleArray = [];
function init() {
    circleArray = [];

    for (var i = 0; i < 800; i++) {
        // var x = Math.random() * innerWidth;
        // var y = Math.random() * innerHeight;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;

        // Get either positive or negative value
        var dx = (Math.random() - 0.5) * 8;
        var dy = (Math.random() - 0.5) * 8;
        // var radius = 30;
        var radius = Math.random() * 3 + 1; // [1 to 4)
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }

    console.log(circleArray);
}


function animate() {
    // requestAnimationFrame() takes another function as an argument
    // creates a loop
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    // circle.update();

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();
init();

import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#B3A29B', '#6D4345', '#D9D9D9', '#9E7571', '#DACDC5']

var gravity = 1;
var fraction = 0.99;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', function () {
  init();
})


// Utility Functions
function randeomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}



// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx;
    this.dy = dy;
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    //c.stroke();
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * fraction;
    } else {
      // creates accerlation with gravity by adding a specific value to velocity
      this.dy += gravity;
      //console.log(this.dy);
    }

    if (this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}

// Implementation
let objects
var ball;
// will bc connecting all the balls 
var ballArray = [];

function init() {
  // ball = new Ball(canvas.width / 2,
  //   canvas.height / 2, 2, 30, '#F2B199');
  //console.log(ball);
  ballArray = [];


  for (var i = 0; i < 200; i++) {

    var radius = randeomIntFromRange(10, 30);
    var x = randeomIntFromRange(radius, canvas.width - radius);
    var y = randeomIntFromRange(0, canvas.height - radius);

    var dx = randeomIntFromRange(-2, 2);

    var color = randomColor(colors);
    var dy = randeomIntFromRange(-2, 2);
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }

  console.log(ballArray);

  // for (let i = 0; i < 400; i++) {
  //   // objects.push()
  // }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }


  // ball.update();
  //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()

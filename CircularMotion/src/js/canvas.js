import utils, { randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];


function randonIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

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





// Objects
class Particle {
  constructor(x, y, radius, color, radians) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    // Gives a random value from 0 to 2pi
    // Starts from anywhere along the standard circle path
    this.radians = Math.random() * Math.PI * 2;
    this.initialX = x;
    this.initialY = y;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120);
    this.lastMouse = { x: x, y: y };

  }

  draw(lastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }

  update() {
    // Gets where the particle was before editing
    const lastPoint = {
      x: this.x,
      y: this.y
    }


    // Move points over time 
    this.radians += this.velocity;

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // CircularMotion
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

    this.draw(lastPoint)
  }
}

// Implementation
// Store all the particles in an array
let particles;
function init() {
  particles = []

  for (let i = 0; i < 100; i++) {
    const radius = (Math.random() * 2) + 1;
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
  }

  console.log(particles);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  // Creates a rectangle to be drawn on top our circles each time the animate loop
  // for each frame we're drawing a new white rectangle on top of it
  // that rectangle has a very slight transparency which once we start layering each
  // of these transparencies on top of each other we start to get the expected trail effect
  c.fillStyle = 'rgba(255,255,255,0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  particles.forEach(particle => {
    particle.update()
  })
}

init()
animate()

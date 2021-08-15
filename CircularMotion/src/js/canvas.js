import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

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
    this.radians = 0
    this.initialX = x;
    this.initialY = y;
    this.velocity = 0.05;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    // Move points over time 
    this.radians += this.velocity;
    this.x = this.initialX + Math.cos(this.radians) * 100;
    this.y = this.initialY + Math.sin(this.radians) * 100;

    this.draw()
  }
}

// Implementation
// Store all the particles in an array
let particles;
function init() {
  particles = []

  for (let i = 0; i < 1; i++) {
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, 'blue'));
  }

  console.log(particles);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  particles.forEach(particle => {
    particle.update()
  })
}

init()
animate()

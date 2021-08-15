import utils from './utils'

/**
 * Basic Game Checklist:
 * Create a player
 * Shoot projectiles
 * Create enemies
 * Detect collision on enemy / projectile hit
 * Detect collision on enemy / player hit
 * Remove off screen projectiles
 * Colorize game
 * Shrink enemies on hit
 * Create partilce explosion on hit
 * Add score
 * Add game over UI
 * Add restart button
 * Add start game button
 */


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// console.log(canvas);
console.log(ctx);

/**
 * Create a player
 * What properties should a player has
 */

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, 'blue');
player.draw();
// console.log(player);

// const canvas = document.querySelector('canvas')
// const c = canvas.getContext('2d')

// canvas.width = innerWidth
// canvas.height = innerHeight

// const mouse = {
//   x: innerWidth / 2,
//   y: innerHeight / 2
// }

// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// // Event Listeners
// addEventListener('mousemove', (event) => {
//   mouse.x = event.clientX
//   mouse.y = event.clientY
// })

// addEventListener('resize', () => {
//   canvas.width = innerWidth
//   canvas.height = innerHeight

//   init()
// })

// // Objects
// class Object {
//   constructor(x, y, radius, color) {
//     this.x = x
//     this.y = y
//     this.radius = radius
//     this.color = color
//   }

//   draw() {
//     c.beginPath()
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//     c.fillStyle = this.color
//     c.fill()
//     c.closePath()
//   }

//   update() {
//     this.draw()
//   }
// }

// // Implementation
// let objects
// function init() {
//   objects = []

//   for (let i = 0; i < 400; i++) {
//     // objects.push()
//   }
// }

// // Animation Loop
// function animate() {
//   requestAnimationFrame(animate)
//   c.clearRect(0, 0, canvas.width, canvas.height)

//   c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
//   // objects.forEach(object => {
//   //  object.update()
//   // })
// }

// init()
// animate()

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
 * Define the Player class
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


/**
 * Define the Projectile class
 */
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

// Creates a player
const player = new Player(x, y, 30, 'blue');
console.log(player);




const projectile = new Projectile(
  canvas.width / 2,
  canvas.height / 2,
  5,
  'red',
  {
    x: 1,
    y: -1
  });
// Creates the projectils array that groups all the projectils draw and alter at the same time
const projectiles = [];




// Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.update();
  })
}


// Creates a projectile whenever clicks on the screen
addEventListener('click', (event) => {
  // console.log(event);
  // 1. get the angles from the center to wherever the mouse click is 
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  )
  console.log(angle);

  // 2. get the velocity (ratio) using the calculated angle
  const velocity = {
    // from -1 to 1
    x: Math.cos(angle),
    y: Math.sin(angle)
  }

  projectiles.push(new Projectile(
    canvas.width / 2,
    canvas.height / 2,
    5,
    'red',
    // sets velocities with the whiteboard math
    velocity
  ))

  // projectile.draw();
  // projectile.update();
})


animate();


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

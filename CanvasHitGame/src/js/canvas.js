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



/**
 * Define the Enemy class
 */
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
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
const projectiles = [];
const enemies = [];



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




// Spawns enemites from broders to the center 
function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 8) + 8;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    //const y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;

    const color = "orange";

    const angle = Math.atan2(
      canvas.height / 2 - y,
      canvas.width / 2 - x
    )

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }

    enemies.push(new Enemy(x, y, radius, color, velocity));
    // console.log(enemies);
  }, 1000)
}


let animationId

// Loop
function animate() {
  // By default, returns what frame you 're currently on
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  player.draw();

  projectiles.forEach((projectile, projectileIndex) => {
    projectile.update();

    // removes from edges of screen
    if (projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height) {
      setTimeout(() => {
        projectiles.splice(projectileIndex, 1)
      }, 0)
    }
  })

  enemies.forEach((enemy, index) => {
    enemy.update();
    // Calculates the distance between the enemy and the player
    const dist = Math.hypot(
      player.x - enemy.x,
      player.y - enemy.y)

    // Ends Game
    if (dist - enemy.radius - player.radius < 1) {
      // Pause the game
      cancelAnimationFrame(animationId);
    }



    // for each enemy inside the loop, 
    // we would like to test the distance between the enemy and the projectile
    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y)
      // once the projectile and enemy gets collaid, removes the enemy
      if (dist - enemy.radius - projectile.radius < 1) {
        // removes slash
        setTimeout(() => {
          // removes one enemy at this specific point 
          enemies.splice(index, 1)
          projectiles.splice(projectileIndex, 1)
        })
      }
    })
  })

}


// Creates a projectile whenever clicks on the screen
addEventListener('click', (event) => {
  // console.log(projectiles)
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
spawnEnemies();



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

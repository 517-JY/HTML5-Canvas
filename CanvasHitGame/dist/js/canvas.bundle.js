/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((module) => {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


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

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight; // console.log(canvas);

console.log(ctx);
/**
 * Define the Player class
 * What properties should a player has
 */

var Player = /*#__PURE__*/function () {
  function Player(x, y, radius, color) {
    _classCallCheck(this, Player);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }]);

  return Player;
}();
/**
 * Define the Projectile class
 */


var Projectile = /*#__PURE__*/function () {
  function Projectile(x, y, radius, color, velocity) {
    _classCallCheck(this, Projectile);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  _createClass(Projectile, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }]);

  return Projectile;
}();
/**
 * Define the Enemy class
 */


var Enemy = /*#__PURE__*/function () {
  function Enemy(x, y, radius, color, velocity) {
    _classCallCheck(this, Enemy);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  _createClass(Enemy, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }]);

  return Enemy;
}();

var x = canvas.width / 2;
var y = canvas.height / 2; // Creates a player

var player = new Player(x, y, 10, 'white');
console.log(player);
var projectiles = [];
var enemies = [];
var projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', {
  x: 1,
  y: -1
}); // Creates the projectils array that groups all the projectils draw and alter at the same time
// Spawns enemites from broders to the center 

function spawnEnemies() {
  setInterval(function () {
    var radius = Math.random() * (30 - 8) + 8;
    var x;
    var y;

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    } //const y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;


    var color = "hsl(".concat(Math.random() * 360, ", 50%, 50%)");
    var angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    var velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
    enemies.push(new Enemy(x, y, radius, color, velocity)); // console.log(enemies);
  }, 1000);
}

var animationId; // Loop

function animate() {
  // By default, returns what frame you 're currently on
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach(function (projectile, projectileIndex) {
    projectile.update(); // removes from edges of screen

    if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height) {
      setTimeout(function () {
        projectiles.splice(projectileIndex, 1);
      }, 0);
    }
  });
  enemies.forEach(function (enemy, index) {
    enemy.update(); // Calculates the distance between the enemy and the player

    var dist = Math.hypot(player.x - enemy.x, player.y - enemy.y); // Ends Game

    if (dist - enemy.radius - player.radius < 1) {
      // Pause the game
      cancelAnimationFrame(animationId);
    } // for each enemy inside the loop, 
    // we would like to test the distance between the enemy and the projectile


    projectiles.forEach(function (projectile, projectileIndex) {
      var dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y); // once the projectile and enemy gets collaid, removes the enemy

      if (dist - enemy.radius - projectile.radius < 1) {
        // removes slash
        setTimeout(function () {
          // removes one enemy at this specific point 
          enemies.splice(index, 1);
          projectiles.splice(projectileIndex, 1);
        });
      }
    });
  });
} // Creates a projectile whenever clicks on the screen


addEventListener('click', function (event) {
  // console.log(projectiles)
  // console.log(event);
  // 1. get the angles from the center to wherever the mouse click is 
  var angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2); // console.log(angle);
  // 2. get the velocity (ratio) using the calculated angle

  var velocity = {
    // from -1 to 1
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5
  };
  projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', // sets velocities with the whiteboard math
  velocity)); // projectile.draw();
  // projectile.update();
});
animate();
spawnEnemies(); // const mouse = {
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
})();

/******/ })()
;
//# sourceMappingURL=canvas.bundle.js.map
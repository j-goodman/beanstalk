/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Window.newGame = function () {
	  var initializeCanvas; var initializeKeyControls; var initializeWorld; var play;
	  // 1. REQUIRE DEPENDENCIES
	  var Guy; var Dirt; var Sky; var Tree; var Shovel; var objects;
	  Guy = __webpack_require__(1);
	  Dirt = __webpack_require__(5);
	  Sky = __webpack_require__(6);
	  Tree = __webpack_require__(7);
	  Shovel = __webpack_require__(11);
	  objects = __webpack_require__(10);
	
	  // 3. INITIALIZE CANVAS
	  initializeCanvas = function () {
	    window.onload = function () {
	      var canvas; var ctx;
	      canvas = document.getElementById("canvas");
	      ctx = canvas.getContext('2d');
	      this.canvas = canvas;
	      this.ctx = ctx;
	      ctx.clearRect(0, 0, canvas.width, canvas.height);
	    }.bind(this);
	  };
	
	  // 4. INITIALIZE KEY CONTROLS
	  initializeKeyControls = function (player) {
	    document.onkeydown = function (event) {
	      if (event.keyCode === 39) {
	        player.rightKeyDown();
	      } else if (event.keyCode === 37) {
	        player.leftKeyDown();
	      } else if (event.keyCode === 38) {
	        player.upKeyDown();
	      } else if (event.keyCode === 40) {
	        player.downKeyDown();
	      } else if (event.keyCode === 32) {
	        player.spaceKeyDown();
	      }
	    };
	    document.onkeyup = function (event) {
	      if (event.keyCode === 39) {
	        player.rightKeyUp();
	      } else if (event.keyCode === 37) {
	        player.leftKeyUp();
	      }
	    };
	  };
	
	  // 5. INITIALIZE WORLD
	  initializeWorld = function () {
	    var player; var aa; var slotMap;
	    player = new Guy (0, 200, 368);
	    initializeKeyControls(player);
	    objects.push(player);
	    initializeKeyControls(player);
	    for (aa=0 ; aa<27 ; aa++) {
	      objects.push(new Dirt (0, 32*aa, 448));
	    }
	    slotMap = {};
	    objects.push(new Tree (slotMap));
	    objects.push(new Shovel (objects.length, 64, 336, slotMap));
	  };
	
	  // 6. PLAY
	  play = function () {
	    var interval; var sky; var xx;
	    initializeWorld();
	    sky = new Sky ();
	    interval = setInterval(function () {
	      ctx.fillStyle = sky.color;
	      ctx.fillRect(0, 0, canvas.width, canvas.height);
	      for (xx=0 ; xx<objects.length ; xx++) {
	        if (objects[xx]) {
	          if (objects[xx].sprite) {
	            objects[xx].sprite.draw(ctx, objects[xx].pos);
	          }
	          if (objects[xx].move) {
	            objects[xx].move();
	          }
	        }
	      }
	    }, 32);
	  };
	  initializeCanvas();
	  play();
	};
	
	Window.newGame();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Jumpman; var Guy; var Util;
	// REQUIRE DEPENDENCIES
	Jumpman = __webpack_require__(2);
	Util = __webpack_require__(4);
	Guy = function (index, x, y) {
	  this.age = 0;
	  this.index = index;
	  this.spriteSize = 32;
	  this.handsFull = false;
	  this.pos = {
	    x: x,
	    y: y,
	  };
	  this.speed = {
	    x: 0,
	    y: 0,
	  };
	  this.facing = "right";
	  this.accel = {
	    x: 0,
	    y: 1,
	  };
	  this.spriteRoot = "guy";
	  this.setSprites(4);
	  this.sprite = this.sprites.standing_right;
	
	  // STATS
	  this.stats = {
	    runSpeed: 6,
	    jumpPower: 14,
	  };
	};
	
	Util.inherits(Guy, Jumpman);
	
	Guy.prototype.rightKeyDown = function () {
	  this.facing = 'right';
	  this.speed.x = this.stats.runSpeed;
	};
	
	Guy.prototype.leftKeyDown = function () {
	  this.facing = 'left';
	  this.speed.x = 0-this.stats.runSpeed;
	};
	
	Guy.prototype.upKeyDown = function () {
	  if (this.pos.y === this.groundLevel-this.spriteSize) {
	    this.speed.y = 0-this.stats.jumpPower;
	  }
	};
	
	Guy.prototype.downKeyDown = function () {
	  if (this.handsFull && this.handsFull.type === 'bean') {
	    this.throwBean();
	  } else if (this.handsFull && this.handsFull.type === 'shovel') {
	    this.throwShovel();
	  }
	};
	
	Guy.prototype.spaceKeyDown = function () {
	  if (this.handsFull && this.handsFull.type === 'bean') {
	    this.throwBean();
	  } else if (this.handsFull && this.handsFull.type === 'shovel') {
	    this.handsFull.dig();
	  }
	};
	
	Guy.prototype.rightKeyUp = function () {
	  if (this.speed.x > 0) {
	    this.speed.x = 0;
	  }
	};
	
	Guy.prototype.leftKeyUp = function () {
	  if (this.speed.x < 0) {
	    this.speed.x = 0;
	  }
	};
	
	Guy.prototype.throwBean = function () {
	  this.handsFull.carried = false;
	  this.handsFull.checkForCatch = function () {};
	  this.handsFull.pos.x = Math.floor(this.handsFull.pos.x/32)*32;
	  this.handsFull.speed.y = 9;
	  this.handsFull = false;
	};
	
	Guy.prototype.throwShovel = function () {
	  this.handsFull.carried = false;
	  this.handsFull.rest();
	  this.handsFull.speed.x = this.facing==='left' ? -16 : 16;
	  this.handsFull = false;
	};
	
	module.exports = Guy;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite; var Jumpman;
	// REQUIRE DEPENDENCIES
	Sprite = __webpack_require__(3);
	
	Jumpman = function () {};
	
	Jumpman.prototype.move = function () {
	  this.age++;
	  this.pos.x += this.speed.x;
	  this.pos.y += this.speed.y;
	  this.speed.x += this.accel.x;
	  this.speed.y += this.accel.y;
	  this.groundLevel = 448;
	  this.updateSprite();
	  this.checkCollisions();
	  this.wrap();
	};
	
	Jumpman.prototype.checkCollisions = function () {
	  this.land();
	};
	
	Jumpman.prototype.wrap = function () {
	  if (this.pos.x < 0-this.spriteSize) {
	    this.pos.x = 860+this.spriteSize;
	  } else if (this.pos.x > 860+this.spriteSize) {
	    this.pos.x = 0-this.spriteSize;
	  }
	};
	
	Jumpman.prototype.land = function () {
	  if (this.pos.y > this.groundLevel-this.spriteSize) {
	    this.pos.y = this.groundLevel-this.spriteSize;
	  }
	};
	
	Jumpman.prototype.setSprites = function (delay) {
	  this.sprites = {
	    standing_right: new Sprite(this.spriteSize, this.spriteSize, 0, [this.spriteRoot+"/right/standing.gif"]),
	    jumping_right: new Sprite(this.spriteSize, this.spriteSize, 0, [this.spriteRoot+"/right/jumping.gif"]),
	    standing_left: new Sprite(this.spriteSize, this.spriteSize, 0, [this.spriteRoot+"/left/standing.gif"]),
	    jumping_left: new Sprite(this.spriteSize, this.spriteSize, 0, [this.spriteRoot+"/left/jumping.gif"]),
	    running_right: new Sprite(this.spriteSize, this.spriteSize, delay, [
	      this.spriteRoot+"/right/running/0.gif",
	      this.spriteRoot+"/right/running/1.gif",
	      this.spriteRoot+"/right/running/2.gif",
	      this.spriteRoot+"/right/running/3.gif"
	    ]),
	    running_left: new Sprite(this.spriteSize, this.spriteSize, delay, [
	      this.spriteRoot+"/left/running/0.gif",
	      this.spriteRoot+"/left/running/1.gif",
	      this.spriteRoot+"/left/running/2.gif",
	      this.spriteRoot+"/left/running/3.gif"
	    ])
	  };
	  if (this.setExtraSprites) {
	    this.setExtraSprites();
	  }
	};
	
	Jumpman.prototype.spriteCenter = function () {
	  return {
	    x: this.pos.x + this.sprite.width/2,
	    y: this.pos.y + this.sprite.height/2
	  };
	};
	
	Jumpman.prototype.updateSprite = function () {
	  if (this.speed.x === 0) {
	    if (this.facing === "left") {
	      this.sprite = this.sprites.standing_left;
	    } else {
	      this.sprite = this.sprites.standing_right;
	    }
	  } else if (this.speed.x > 0) {
	    this.sprite = this.sprites.running_right;
	  } else if (this.speed.x < 0) {
	    this.sprite = this.sprites.running_left;
	  }
	};
	
	module.exports = Jumpman;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Sprite = function (width, height, frameDelay, sourcePathArray) {
	  this.frames = [];
	  this.width = width;
	  this.height = height;
	  this.frameDelay = 0;
	  this.frameDelayMax = frameDelay;
	  this.angle = 0;
	  sourcePathArray.forEach(function (path, index) {
	    this.frames[index] = new Image (width, height);
	    this.frames[index].src = "./sprites/"+path;
	  }.bind(this));
	  this.endCallback = null;
	};
	
	Sprite.prototype.frame = 0;
	
	Sprite.prototype.addAnimationEndCallback = function (callback) {
	  this.endCallback = function () {
	    callback();
	    this.endCallback = null;
	  }.bind(this);
	};
	
	Sprite.prototype.animate = function () {
	  if (this.frames.length > 1) {
	    if (this.frameDelay === 0) {
	        this.frame++;
	        if (this.frame === this.frames.length) {
	          this.frame = 0;
	          if (this.endCallback) {
	            this.endCallback();
	          }
	        }
	    }
	    this.frameDelay-=1;
	    if (this.frameDelay < 0) {
	      this.frameDelay = this.frameDelayMax;
	    }
	  }
	};
	
	Sprite.prototype.draw = function (ctx, pos, viewAnchor) {
	  if (!viewAnchor) { viewAnchor = {x: 0, y: 0,}; }
	  if (ctx) {
	    ctx.drawImage(
	      this.frames[this.frame],
	      pos.x-viewAnchor.x,
	      pos.y-viewAnchor.y,
	      this.width,
	      this.height
	    );
	    this.animate();
	  }
	};
	
	Sprite.prototype.depthDraw = function (ctx, pos, viewAnchor, depthFactor) {
	  //The depth factor should be a multiple of 0.5 between 1.5 and 5
	  if (ctx) {
	    ctx.drawImage(
	      this.frames[this.frame],
	      pos.x-(viewAnchor.x/depthFactor),
	      pos.y-(viewAnchor.y),
	      this.width,
	      this.height
	    );
	    this.animate();
	  }
	};
	
	module.exports = Sprite;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Util = {};
	
	Util.inherits = function (ChildClass, BaseClass) {
	  function Surrogate () { this.constructor = ChildClass; }
	  Surrogate.prototype = BaseClass.prototype;
	  ChildClass.prototype = new Surrogate();
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Dirt;
	// REQUIRE DEPENDENCIES
	var Sprite;
	Sprite = __webpack_require__(3);
	
	Dirt = function (index, x, y) {
	  this.age = 0;
	  this.index = index;
	  this.spriteSize = 32;
	  this.pos = {
	    x: x,
	    y: y,
	  };
	  this.sprite = new Sprite(this.spriteSize, this.spriteSize, 0, ["dirt.gif"]);
	};
	
	module.exports = Dirt;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var sky;
	
	sky = function () {
	  this.palette = {
	    red: 158,
	    green: 202,
	    blue: 239,
	  };
	  this.day = {
	    red: 158,
	    green: 202,
	    blue: 239,
	  };
	  this.dusk = {
	    red: 240,
	    green: 172,
	    blue: 40,
	  };
	  this.night = {
	    red: 16,
	    green: 20,
	    blue: 45,
	  };
	  this.time = 0; this.hour = 0;
	  this.interval = setInterval(function () {
	    var progress;
	    this.time += 0.1;
	    this.hour = this.time%2400;
	    if (this.hour>=0 && this.hour<600) {
	    // SUNSET
	      progress = this.hour/500;
	      this.palette.red = Math.floor((this.day.red*(1-progress) + this.dusk.red*(progress)));
	      this.palette.green = Math.floor((this.day.green*(1-progress) + this.dusk.green*(progress)));
	      this.palette.blue = Math.floor((this.day.blue*(1-progress) + this.dusk.blue*(progress)));
	    } else if (this.hour>=600 && this.hour<1200) {
	    // DUSK
	      progress = (this.hour-600)/600;
	      this.palette.red = Math.floor((this.dusk.red*(1-progress) + this.night.red*(progress)));
	      this.palette.green = Math.floor((this.dusk.green*(1-progress) + this.night.green*(progress)));
	      this.palette.blue = Math.floor((this.dusk.blue*(1-progress) + this.night.blue*(progress)));
	    } else if (this.hour>=1200 && this.hour<1800) {
	    // SUNRISE
	      progress = (this.hour-1200)/600;
	      this.palette.red = Math.floor((this.night.red*(1-progress) + this.dusk.red*(progress)));
	      this.palette.green = Math.floor((this.night.green*(1-progress) + this.dusk.green*(progress)));
	      this.palette.blue = Math.floor((this.night.blue*(1-progress) + this.dusk.blue*(progress)));
	    } else if (this.hour>=1800 && this.hour<2400) {
	    // SUNRISE
	      progress = (this.hour-1800)/600;
	      this.palette.red = Math.floor((this.dusk.red*(1-progress) + this.day.red*(progress)));
	      this.palette.green = Math.floor((this.dusk.green*(1-progress) + this.day.green*(progress)));
	      this.palette.blue = Math.floor((this.dusk.blue*(1-progress) + this.day.blue*(progress)));
	    }
	    this.color = '#'+
	      this.palette.red.toString(16)+
	      this.palette.green.toString(16)+
	      this.palette.blue.toString(16);
	  }.bind(this), 32);
	};
	
	module.exports = sky;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Tree;
	// REQUIRE DEPENDENCIES
	var Bean; var objects;
	Bean = __webpack_require__(8);
	objects = __webpack_require__(10);
	
	Tree = function (slotMap) {
	  this.age = 0;
	  this.slotMap = slotMap;
	};
	
	Tree.prototype.move = function () {
	  var dropSpot;
	  this.age++;
	  if (!Math.floor(Math.random()*270) || [20, 100, 200].includes(this.age)) {
	    dropSpot = Math.round(Math.random()*27)*32;
	    objects.push(new Bean (objects.length, dropSpot, -32, this.slotMap));
	  }
	};
	
	module.exports = Tree;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Bean;
	// REQUIRE DEPENDENCIES
	var Sprite; var Mound; var objects;
	Sprite = __webpack_require__(3);
	Mound = __webpack_require__(9);
	objects = __webpack_require__(10);
	
	Bean = function (index, x, y, slotMap) {
	  this.type = 'bean';
	  this.age = 0;
	  this.index = index;
	  this.spriteSize = 32;
	  this.carried = false;
	  this.player = objects[0];
	  this.slotMap = slotMap;
	  this.pos = {
	    x: x,
	    y: y,
	  };
	  this.speed = {
	    x: 0,
	    y: 3,
	  };
	  this.groundLevel = 448;
	  this.sprite = new Sprite(this.spriteSize, this.spriteSize, 0, ["healthy.gif"]);
	};
	
	Bean.prototype.checkForCatch = function () {
	  if ( !this.player.handsFull &&
	      Math.abs(this.pos.x-this.player.pos.x) < 32 &&
	      Math.abs(this.pos.y-this.player.pos.y) < 32) {
	    this.speed.x = 0;
	    this.speed.y = 0;
	    this.player.handsFull = this;
	    this.carried = true;
	  }
	};
	
	Bean.prototype.destroy = function () {
	  delete objects[this.index];
	};
	
	Bean.prototype.move = function () {
	  this.age++;
	  this.pos.x += this.speed.x;
	  this.pos.y += this.speed.y;
	  if (this.pos.y > this.groundLevel-this.spriteSize+4) {
	    this.plant();
	  }
	  if (this.carried) {
	    this.pos.x = this.player.pos.x;
	    this.pos.y = this.player.pos.y-32;
	  }
	  if (this.pos.y > this.groundLevel+320) {
	    this.destroy();
	  }
	  this.checkForCatch();
	};
	
	Bean.prototype.plant = function () {
	  var mound;
	  if (!this.slotMap[this.pos.x]) {
	    mound = new Mound (objects.length, this.pos.x, this.groundLevel-this.spriteSize+4);
	    objects.push(mound);
	    this.slotMap[this.pos.x] = mound;
	    this.destroy();
	  }
	};
	
	module.exports = Bean;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Mound;
	// REQUIRE DEPENDENCIES
	var Sprite; var objects;
	Sprite = __webpack_require__(3);
	objects = __webpack_require__(10);
	
	Mound = function (index, x, y) {
	  this.age = 0;
	  this.index = index;
	  this.spriteSize = 32;
	  this.pos = {
	    x: x,
	    y: y,
	  };
	  this.sprites = {
	    plant: new Sprite(this.spriteSize, this.spriteSize, 0, ["mound.gif"]),
	    highlight: new Sprite(this.spriteSize, this.spriteSize, 0, ["mound_highlight.gif"]),
	    pluck: new Sprite(this.spriteSize, this.spriteSize, 1, [
	      "mound_pluck/0.gif",
	      "mound_pluck/1.gif",
	      "mound_pluck/2.gif",
	      "mound_pluck/3.gif",
	    ]),
	  };
	  this.sprite = this.sprites.plant;
	};
	
	Mound.prototype.destroy = function () {
	  delete objects[this.index];
	};
	
	Mound.prototype.move = function () {
	  this.age++;
	};
	
	Mound.prototype.highlight = function () {
	  if (!this.plucking) {
	    this.sprite = this.sprites.highlight;
	    setTimeout(function () {
	      if (!this.plucking) {
	        this.sprite = this.sprites.plant;
	      }
	    }.bind(this), 200);
	  }
	};
	
	Mound.prototype.pluck = function () {
	  this.plucking = true;
	  this.sprite = this.sprites.pluck;
	  this.sprite.addAnimationEndCallback(function () {
	    this.destroy();
	  }.bind(this));
	};
	
	module.exports = Mound;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var objects = [];
	module.exports = objects;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Shovel;
	// REQUIRE DEPENDENCIES
	var Sprite; var Mound; var objects;
	Sprite = __webpack_require__(3);
	Mound = __webpack_require__(9);
	objects = __webpack_require__(10);
	
	Shovel = function (index, x, y, slotMap) {
	  this.type = 'shovel';
	  this.age = 0;
	  this.index = index;
	  this.spriteSize = 32;
	  this.carried = false;
	  this.player = objects[0];
	  this.slotMap = slotMap;
	  this.pos = {
	    x: x,
	    y: y,
	  };
	  this.speed = {
	    x: 0,
	    y: 3,
	  };
	  this.accel = {
	    x: 0,
	    y: objects[0].accel.y,
	  };
	  this.friction = {
	    x: 0.1,
	    y: 0,
	  };
	  this.groundLevel = 448;
	  this.sprites = {
	    rest: new Sprite(this.spriteSize, this.spriteSize, 0, ["shovel.gif"]),
	    hold: new Sprite(this.spriteSize, this.spriteSize, 0, ["shovel_hold.gif"]),
	    use: new Sprite(this.spriteSize, this.spriteSize, 0, ["shovel_use.gif"]),
	  };
	  this.sprite = this.sprites.rest;
	};
	
	Shovel.prototype.checkForCatch = function () {
	  if ( !this.player.handsFull && !this.resting &&
	      Math.abs(this.pos.x-this.player.pos.x) < 32 &&
	      Math.abs(this.pos.y-this.player.pos.y) < 32) {
	    this.speed.x = 0;
	    this.speed.y = 0;
	    this.player.handsFull = this;
	    this.carried = true;
	  }
	};
	
	Shovel.prototype.destroy = function () {
	  delete objects[this.index];
	};
	
	Shovel.prototype.dig = function () {
	  this.inUse = true;
	  if (this.slotMap[Math.floor((this.pos.x+16)/32)*32]) {
	    this.slotMap[Math.floor((this.pos.x+16)/32)*32].pluck();
	  }
	  setTimeout(function () {
	    this.inUse = false;
	  }.bind(this), 180);
	};
	
	Shovel.prototype.highlightTarget = function () {
	  if (this.slotMap[Math.floor((this.pos.x+16)/32)*32]) {
	    this.slotMap[Math.floor((this.pos.x+16)/32)*32].highlight();
	  }
	};
	
	Shovel.prototype.land = function () {
	  if (this.pos.y > this.groundLevel-this.spriteSize) {
	    this.pos.y = this.groundLevel-this.spriteSize;
	  }
	};
	
	Shovel.prototype.move = function () {
	  this.age++;
	  this.pos.x += this.speed.x;
	  this.pos.y += this.speed.y;
	  this.speed.x += this.accel.x;
	  this.speed.y += this.accel.y;
	  this.speed.x *= 1-this.friction.x;
	  this.speed.y *= 1-this.friction.y;
	  this.land();
	  this.updateSprites();
	  if (this.carried) {
	    this.pos.x = this.player.pos.x;
	    this.pos.y = this.player.pos.y;
	    this.highlightTarget();
	  }
	  if (this.pos.y > this.groundLevel+320) {
	    this.destroy();
	  }
	  this.checkForCatch();
	};
	
	Shovel.prototype.rest = function () {
	  this.resting = true;
	  setTimeout(function () {
	    this.resting = false;
	  }.bind(this), 400);
	};
	
	Shovel.prototype.updateSprites = function () {
	  if (this.inUse) {
	    this.sprite = this.sprites.use;
	  } else {
	    this.sprite = this.carried ? this.sprites.hold : this.sprites.rest;
	  }
	};
	
	module.exports = Shovel;


/***/ }
/******/ ]);
//# sourceMappingURL=bean.js.map
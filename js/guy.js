var Jumpman; var Guy; var Util;
// REQUIRE DEPENDENCIES
Jumpman = require('./jumpman.js');
Util = require('./util.js');
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

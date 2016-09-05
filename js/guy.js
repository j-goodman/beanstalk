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
  if (this.handsFull) {
    this.handsFull.carried = false;
    this.handsFull.checkForCatch = function () {};
    this.handsFull.pos.x = Math.round(this.handsFull.pos.x/32)*32;
    this.handsFull.speed.y = 9;
    this.handsFull = false;
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

module.exports = Guy;

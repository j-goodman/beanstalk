var Shovel;
// REQUIRE DEPENDENCIES
var Sprite; var Mound; var objects;
Sprite = require('./sprite.js');
Mound = require('./mound.js');
objects = require('./objects.js');

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

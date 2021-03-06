var Bean;
// REQUIRE DEPENDENCIES
var Sprite; var Mound; var objects;
Sprite = require('./sprite.js');
Mound = require('./mound.js');
objects = require('./objects.js');

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

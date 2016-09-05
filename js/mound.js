var Mound;
// REQUIRE DEPENDENCIES
var Sprite;
Sprite = require('./sprite.js');

Mound = function (index, x, y) {
  this.age = 0;
  this.index = index;
  this.spriteSize = 32;
  this.pos = {
    x: x,
    y: y,
  };
  this.sprite = new Sprite(this.spriteSize, this.spriteSize, 0, ["mound.gif"]);
};

Mound.prototype.move = function () {
  this.age++;
};

module.exports = Mound;

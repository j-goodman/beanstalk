var Dirt;
// REQUIRE DEPENDENCIES
var Sprite;
Sprite = require('./sprite.js');

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

var Mound;
// REQUIRE DEPENDENCIES
var Sprite; var objects;
Sprite = require('./sprite.js');
objects = require('./objects.js');

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

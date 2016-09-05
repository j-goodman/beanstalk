var Sprite; var Jumpman;
// REQUIRE DEPENDENCIES
Sprite = require('./sprite.js');

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

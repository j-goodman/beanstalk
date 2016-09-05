var Tree;
// REQUIRE DEPENDENCIES
var Bean; var objects;
Bean = require('./bean.js');
objects = require('./objects.js');

Tree = function () {
  this.age = 0;
  this.usedSlots = {};
};

Tree.prototype.move = function () {
  var dropSpot;
  this.age++;
  if (!Math.floor(Math.random()*320) || this.age === 20) {
    dropSpot = Math.round(Math.random()*27)*32;
    objects.push(new Bean (objects.length, dropSpot, -32, this.usedSlots));
  }
};

module.exports = Tree;

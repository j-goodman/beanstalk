var Tree;
// REQUIRE DEPENDENCIES
var Bean; var objects;
Bean = require('./bean.js');
objects = require('./objects.js');

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

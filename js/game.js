Window.newGame = function () {
  var initializeCanvas; var initializeKeyControls; var initializeWorld; var play;
  // 1. REQUIRE DEPENDENCIES
  var Guy; var Dirt; var Sky; var Tree; var Shovel; var objects;
  Guy = require('./guy.js');
  Dirt = require('./dirt.js');
  Sky = require('./sky.js');
  Tree = require('./tree.js');
  Shovel = require('./shovel.js');
  objects = require('./objects.js');

  // 3. INITIALIZE CANVAS
  initializeCanvas = function () {
    window.onload = function () {
      var canvas; var ctx;
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.ctx = ctx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }.bind(this);
  };

  // 4. INITIALIZE KEY CONTROLS
  initializeKeyControls = function (player) {
    document.onkeydown = function (event) {
      if (event.keyCode === 39) {
        player.rightKeyDown();
      } else if (event.keyCode === 37) {
        player.leftKeyDown();
      } else if (event.keyCode === 38) {
        player.upKeyDown();
      } else if (event.keyCode === 40) {
        player.downKeyDown();
      } else if (event.keyCode === 32) {
        player.spaceKeyDown();
      }
    };
    document.onkeyup = function (event) {
      if (event.keyCode === 39) {
        player.rightKeyUp();
      } else if (event.keyCode === 37) {
        player.leftKeyUp();
      }
    };
  };

  // 5. INITIALIZE WORLD
  initializeWorld = function () {
    var player; var aa; var slotMap;
    player = new Guy (0, 200, 368);
    initializeKeyControls(player);
    objects.push(player);
    initializeKeyControls(player);
    for (aa=0 ; aa<27 ; aa++) {
      objects.push(new Dirt (0, 32*aa, 448));
    }
    slotMap = {};
    objects.push(new Tree (slotMap));
    objects.push(new Shovel (objects.length, 64, 336, slotMap));
  };

  // 6. PLAY
  play = function () {
    var interval; var sky; var xx;
    initializeWorld();
    sky = new Sky ();
    interval = setInterval(function () {
      ctx.fillStyle = sky.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (xx=0 ; xx<objects.length ; xx++) {
        if (objects[xx]) {
          if (objects[xx].sprite) {
            objects[xx].sprite.draw(ctx, objects[xx].pos);
          }
          if (objects[xx].move) {
            objects[xx].move();
          }
        }
      }
    }, 32);
  };
  initializeCanvas();
  play();
};

Window.newGame();

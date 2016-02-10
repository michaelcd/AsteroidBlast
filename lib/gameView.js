(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
    this.ship = this.game.addShip();
    this.lastTime = 0;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var gameview = this;
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));

    // window.setInterval(function () {
    //   gameview.game.step();
    //   gameview.game.draw(this.ctx);
    // }, 20);

  };

  GameView.prototype.animate = function (time) {
    var timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gameview = this;
    key('up', function () {gameview.ship.power([0,-1])});
    key('down', function () {gameview.ship.power([0,1])});
    key('left', function () {gameview.ship.power([-1,0])});
    key('right', function () {gameview.ship.power([1,0])});
    key('space', function () {gameview.ship.fireBullet()});
  };



})();

(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var gameview = this;
    window.setInterval(function () {
      gameview.game.step();
      gameview.game.draw(this.ctx);
    }, 20);
    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gameview = this;
    console.log(gameview.game.ship);
    key('up', function () {gameview.game.ship.power([0,-1])});
    key('down', function () {gameview.game.ship.power([0,1])});
    key('left', function () {gameview.game.ship.power([-1,0])});
    key('right', function () {gameview.game.ship.power([1,0])});
    key('space', function () {gameview.game.ship.fireBullet()});
  };



})();

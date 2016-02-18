(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, ctx2) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.lastTime = 0;
  };

  GameView.prototype.start = function () {
    // debugger;
    $(".game-over-screen").attr('style', 'display: none;');
    $(".start-screen").attr('style', 'display: none;');
    this.ship = this.game.addShip();
    this.bindKeyHandlers();
    this.game.resetScore();
    this.game.num_asteroids = 3;
    // this.game.addStars();
    this.game.addAsteroids();
    this.game.paused = false;
    var gameview = this;
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function (time) {
    var timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx, this.ctx2);
    this.lastTime = time;

    if (this.game.paused === false) {
      requestAnimationFrame(this.animate.bind(this));
    }
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gameview = this;

    key('up', function () {gameview.ship.power(0,-4);});
    key('down', function () {gameview.ship.power(0,4);});
    key('left', function () {gameview.ship.power(-4,0);});
    key('right', function () {gameview.ship.power(4,0);});
    key('w', function () {gameview.ship.power(0,-4);});
    key('s', function () {gameview.ship.power(0,4);});
    key('a', function () {gameview.ship.power(-4,0);});
    key('d', function () {gameview.ship.power(4,0);});
    key('space', function () {gameview.ship.fireBullet();});
  };




})();

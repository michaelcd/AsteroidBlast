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
  };




})();

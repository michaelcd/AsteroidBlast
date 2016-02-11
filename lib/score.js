(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Score = Asteroids.Score = function (properties) {
    this.game = properties.game;
  };

  Score.prototype.draw = function (ctx, ctx2) {
    // ctx.clearRect(0, 0, 100, 50);
    // ctx.fillStyle="";
    // ctx.fillRect(0, 0, 100, 50);
    ctx.font = '18px "Press Start 2P"';
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Current score: " + this.game.score, 50, 50);
    ctx.fillText("High score: " + this.game.hiscore, 50, 70);
  };

})();

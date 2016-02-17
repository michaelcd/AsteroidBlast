(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Star = Asteroids.Star = function (properties) {
    properties.radius = Star.RADIUS;
    properties.color = properties.color || Star.COLOR;
    properties.vel = properties.vel || Asteroids.Util.starVec(0,-20,-8);
    properties.pos = properties.pos || properties.game.randomPosition();
    Asteroids.MovingObject.call(this, properties);
  };

  Star.RADIUS = 1;
  Star.SPEED = 15;
  Star.COLOR = "#ffffff";

  Asteroids.Util.inherits(Star, Asteroids.MovingObject);
  Star.prototype.collideWith = function (otherObject) {};
  Star.prototype.isWrappable = true;

  Star.prototype.draw = function (ctx, ctx2) {
    ctx2.fillStyle = this.color;
    ctx2.beginPath();

    ctx2.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx2.fill();
  };

})();

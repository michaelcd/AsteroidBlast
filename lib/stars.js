(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Star = Asteroids.Star = function (properties) {
    properties.radius = Star.RADIUS;
    properties.color = properties.color || Star.COLOR;
    properties.vel = properties.vel || Asteroids.Util.starVec();
    properties.pos = properties.pos || properties.game.randomPosition();
    Asteroids.MovingObject.call(this, properties);
  };

  Star.RADIUS = 1;
  Star.SPEED = 15;
  Star.COLOR = "#ffffff";

  Asteroids.Util.inherits(Star, Asteroids.MovingObject);
  Star.prototype.collideWith = function (otherObject) {};
  Star.prototype.isWrappable = true;

})();

(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Asteroids = window.Asteroids;

  var Bullet = Asteroids.Bullet = function (properties) {
    properties.radius = Bullet.RADIUS;
    properties.color = properties.color || Bullet.COLOR;
    Asteroids.MovingObject.call(this, properties);
  };

  Bullet.RADIUS = 3;
  Bullet.COLOR = "#000000";

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.relocate();
    }
  };



})();

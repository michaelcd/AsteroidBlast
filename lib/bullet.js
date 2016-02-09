(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (properties) {
    properties.radius = Bullet.RADIUS;
    properties.color = properties.color || Bullet.COLOR;
    Asteroids.MovingObject.call(this, properties);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;
  Bullet.COLOR = "#ffffff";

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      otherObject.remove();
      this.remove();
    }
  };

  Bullet.prototype.isWrappable = false;

})();

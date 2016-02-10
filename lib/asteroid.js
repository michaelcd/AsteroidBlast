(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (properties) {
    properties.vel = properties.vel || Asteroids.Util.starVec();
    properties.pos = properties.pos || properties.game.randomPosition();
    properties.pos[0] = properties.game.DIM_X;
    properties.color = Asteroid.COLOR;
    properties.radius = Asteroid.RADIUS;

    Asteroids.MovingObject.call(this, properties);
  };

  Asteroid.COLOR = "#ffffff";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      // this.game.remove(this);
      // this.game.remove(otherObject);
    }
  };

  Asteroid.prototype.isWrappable = false;


})();

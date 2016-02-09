(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (properties) {
    properties.pos = properties.pos || properties.game.randomPosition();
    properties.color = Asteroid.COLOR;
    properties.radius = Asteroid.RADIUS;
    properties.vel = properties.vel || Asteroids.Util.randomVec();

    Asteroids.MovingObject.call(this, properties);
  };

  Asteroid.COLOR = "#00FF00";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else {
      // this.game.remove(this);
      // this.game.remove(otherObject);
    }
  };

})();

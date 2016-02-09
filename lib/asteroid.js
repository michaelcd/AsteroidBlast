(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (properties) {
    Asteroids.MovingObject.call(this,
      { game: properties.game, pos: properties.pos, color: "#00FF00", radius: 10,
      vel: Asteroids.Util.randomVec()}
    ); // need velocity
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);



})();

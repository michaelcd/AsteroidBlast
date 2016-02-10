(function () {

  if (typeof window.Asteroids.Util === "undefined") {
    window.Asteroids.Util = {};
  }

  var Util = Asteroids.Util = {};

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  Asteroids.Util.randomVec = function (length) {
    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return [getRandomIntInclusive(-4, -1), getRandomIntInclusive(-4, 4)];
  };

  Asteroids.Util.starVec = function (length) {
    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return [getRandomIntInclusive(-10, -1), 0];
  };

  Asteroids.Util.randomPos = function (dim_x, dim_y) {
    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return [getRandomIntInclusive(0, dim_x), getRandomIntInclusive(0, dim_y)];
  };
})();

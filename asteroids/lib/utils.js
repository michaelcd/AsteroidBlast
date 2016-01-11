(function () {

if (typeof window.Asteroids.Util === "undefined") {
  window.Asteroids.Util = {};
}

Asteroids.Util.inherits = function (ChildClass, ParentClass) {
  function Surrogate () {}
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};

Asteroids.Util.randomVec = function (length) {
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return [getRandomIntInclusive(-4, 4), getRandomIntInclusive(-4, 4)];
};

Asteroids.Util.randomPos = function (dim_x, dim_y) {
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return [getRandomIntInclusive(0, dim_x), getRandomIntInclusive(0, dim_y)];
};
})();

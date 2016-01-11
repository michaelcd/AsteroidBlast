Function.prototype.inherits = function (SuperClass) {
  function Surrogate () {}
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject () {}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

Asteroid.prototype.hitsAPlanet = function () { console.log("Armageddon Movie!"); };

// ship = new Ship();
// ship.hitsAPlanet();
// asteroid = new Asteroid();
// asteroid.hitsAPlanet();
// movingobject = new MovingObject();
// movingobject.hitsAPlanet();

(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (properties) {
    properties.radius = Ship.RADIUS;
    properties.vel = properties.vel || [0,0];
    properties.color = properties.color || Ship.COLOR;
    Asteroids.MovingObject.call(this, properties);
  };

  Ship.RADIUS = 10;
  Ship.COLOR = "#ffffff";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.fireBullet = function () {
    // debugger

    var bullet = new Asteroids.Bullet ({
      vel: this.vel.slice(0),
      pos: this.game.randomPosition(),
      game: this.game
    });

    bullet.add();
  };

})();

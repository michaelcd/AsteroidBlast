(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (properties) {
    properties.radius = Ship.RADIUS;
    properties.vel = properties.vel || [0, 0];
    properties.color = properties.color || Ship.COLOR;
    Asteroids.MovingObject.call(this, properties);
    this.img = new Image ();
    this.img.src = './lib/starship.png';
  };

  Ship.RADIUS = 10;
  Ship.COLOR = "#ffffff";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.vel[0] = impulse[0] * 4;
    this.vel[1] = impulse[1] * 4;
  };

  Ship.prototype.relocate = function () {
    this.pos = [(this.game.DIM_X / 4), (this.game.DIM_Y / 2)];
    this.vel = [0,0];
  };
  //
  Ship.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, this.pos[0], this.pos[1]);
  };

  Ship.prototype.fireBullet = function () {
    var relVel = this.vel.slice(0);
    relVel = [relVel[0] * 4, relVel[1] * 4];

    var shipPos = this.pos.slice(0);
    var bullet = new Asteroids.Bullet ({
      vel: [8,0],
      pos: shipPos,
      game: this.game
    });
    bullet.add();
  };

  Ship.prototype.isWrappable = false;
  Ship.prototype.isBound = true;


})();

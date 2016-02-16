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

  Ship.RADIUS = 14;
  Ship.COLOR = "#ffffff";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (x, y) {
    if (x !== 0) {this.vel[0] = (this.vel[0] === -x) ? 0 : x;}
    if (y !== 0) {this.vel[1] = (this.vel[1] === -y) ? 0 : y;}
  };

  Ship.prototype.relocate = function () {
    this.pos = [(this.game.DIM_X / 4), (this.game.DIM_Y / 2)];
    this.vel = [0,0];
    this.remove();
    // this.img.src = './lib/ship_explosion.png';
    // setTimeout(function () {
    // }.bind(this), 2000);
  };
  //
  Ship.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, (this.pos[0] - (43/2)), (this.pos[1] - (29/2)));

    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    //
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    //
    // ctx.fill();
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
    if (this.game.ships[0] === this) {
      bullet.add();
    }
  };

  Ship.prototype.move = function (delta) {
    delta = delta || 1;

    this.pos[0] += (this.vel[0] * delta/20);
    this.pos[1] += (this.vel[1] * delta/20);

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable === true) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.pos = this.game.dontWrap(this.pos);
      }
    }
  };

  Ship.prototype.isWrappable = false;
  Ship.prototype.isBound = true;


})();

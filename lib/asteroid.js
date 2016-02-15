(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (properties) {
    properties.vel = properties.vel || Asteroids.Util.starVec();
    properties.pos = properties.pos || properties.game.randomPosition();
    properties.pos[0] = properties.game.DIM_X;
    properties.color = Asteroid.COLOR;
    var size = Asteroids.Util.randomNum(0,5);
    properties.radius = Asteroid.RADII[3];
    Asteroids.MovingObject.call(this, properties);
    this.health = Asteroid.HEALTH[2];
    this.img = new Image ();
    this.img.src = './lib/asteroid1-.png';
  };

  Asteroid.RADII = [13, 18, 25, 28];
  Asteroid.HEALTH = [1, 2, 3, 4];
  Asteroid.COLOR = "#ffffff";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, (this.pos[0] - (65/2)), (this.pos[1] - (65/2)));

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

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
      this.game.break();
    } else if (otherObject instanceof Asteroids.Bullet) {
      this.health -= 1;
      if (this.health <= 0) {
        this.game.remove(this);
        this.game.score += this.radius;
      }
      this.game.remove(otherObject);
    }
  };

  Asteroid.prototype.isWrappable = false;


})();

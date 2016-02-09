(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Asteroids = window.Asteroids;

  var MovingObject = Asteroids.MovingObject = function (properties) {
    this.game = properties.game;
    this.pos = properties.pos;
    this.vel = properties.vel;
    this.radius = properties.radius;
    this.color = properties.color;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this.pos);
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dist_x = Math.abs(this.pos[0] - otherObject.pos[0]);
    var dist_y = Math.abs(this.pos[1] - otherObject.pos[1]);
    var distance = Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y, 2));
    var combined_radii = this.radius + otherObject.radius;

    if (distance - combined_radii <= 0) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function (otherObject) {};

})();

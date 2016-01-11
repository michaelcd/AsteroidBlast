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



})();

// window: {
//   key1: "whatever",
//   Asteroids: {
//     MovingObject: function () {}
//   }
// }

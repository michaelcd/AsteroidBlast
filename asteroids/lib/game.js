(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Asteroids = window.Asteroids;

  var Game = Asteroids.Game =  function () {
    this.DIM_X = canvasEl.width;
    this.DIM_Y = canvasEl.height;
    this.NUM_ASTEROIDS = 80;
    this.asteroids = [];
    this.addAsteroids(this.NUM_ASTEROIDS);
  };

  Game.prototype.addAsteroids = function (NUM_ASTEROIDS) {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(
        {game: this, pos: Asteroids.Util.randomPos(this.DIM_X, this.DIM_Y)})
      );
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    this.asteroids.forEach( function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach( function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var wrapped_pos = pos;
    if (pos[0] < 0) {
      wrapped_pos[0] += this.DIM_X;
    }
    if (pos[0] > this.DIM_X) {
      wrapped_pos[0] -= this.DIM_X;
    }
    if (pos[1] < 0) {
      wrapped_pos[1] += this.DIM_Y;
    }
    if (pos[1] > this.DIM_Y) {
      wrapped_pos[1] -= this.DIM_Y;
    }

    return wrapped_pos;
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length - 1; i++){
      for (var j = i + 1; j < this.asteroids.length; j++) {
        var collision = this.asteroids[i].isCollidedWith(this.asteroids[j]);
        if (collision) {
          alert("Collision!");
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {

  };

})();

(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Asteroids = window.Asteroids;

  var Game = Asteroids.Game =  function () {
    this.DIM_X = canvasEl.width;
    this.DIM_Y = canvasEl.height;
    this.NUM_ASTEROIDS = 5;
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(this.NUM_ASTEROIDS);
    this.ship = new Asteroids.Ship({game: this, pos: this.randomPosition()});
  };

  Game.prototype.addAsteroids = function (NUM_ASTEROIDS) {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(
        {game: this, pos: Asteroids.Util.randomPos(this.DIM_X, this.DIM_Y)})
      );
    }
  };

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {

    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids.splice(idx, 1);
    } else if (object instanceof Asteroids.Bullet) {
      var idx = this.bullets.indexOf(object);
      this.bullets.splice(idx, 1);
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    // this.asteroids.forEach( function (asteroid) {
    //   asteroid.draw(ctx);
    // });
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
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

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  },


  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length - 1; i++){
      for (var j = i + 1; j < this.allObjects().length; j++) {
        var collision = this.allObjects()[i].isCollidedWith(this.allObjects()[j]);
        if (collision) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.randomPosition = function () {
    return Asteroids.Util.randomPos(this.DIM_X, this.DIM_Y);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };



})();

(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game =  function () {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.DIM_X = canvasEl.width;
    this.DIM_Y = canvasEl.height;
    this.addAsteroids();
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 7;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid(
        {game: this})
      );
    }
  };

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      game: this,
      pos: this.randomPosition()
    });

    this.add(ship);
    return ship;
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
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    var outOfBounds = false;
    if (pos[0] < 0) {
      outOfBounds = true;
    }
    if (pos[0] > this.DIM_X) {
      outOfBounds = true;
    }
    if (pos[1] < 0) {
      outOfBounds = true;
    }
    if (pos[1] > this.DIM_Y) {
      outOfBounds = true;
    }

    return outOfBounds;
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
    return this.asteroids.concat(this.bullets).concat(this.ships);
  },


  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          // don't allow self-collision
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };


  Game.prototype.randomPosition = function () {
    return Asteroids.Util.randomPos(this.DIM_X, this.DIM_Y);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };



})();

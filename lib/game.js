(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game =  function () {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.stars = [];
    this.score = 0;
    this.hiscore = 0;
    this.num_asteroids = 3;
    this.paused = true;
    this.DIM_X = canvasEl.width;
    this.DIM_Y = canvasEl.height;
    this.addAsteroids();
    this.addStars();
    this.scoreScreen = new Asteroids.Score({game: this});
  };

  Game.BG_COLOR = "#000000";
  // Game.DIM_X = 1000;
  // Game.DIM_Y = 600;
  // Game.FPS = 32;
  // Game.NUM_ASTEROIDS = 5;
  Game.NUM_STARS = 45;
  Game.ASTEROIDS_X = Game.DIM_X - 40;

  Game.prototype.break = function () {
    this.ships = [];
    this.num_asteroids = 3;
    this.unBind();
    setTimeout(function () {
      $(".game-over-screen").attr('style', 'display: block;');
      this.resetScore();
      this.paused = true;
      this.asteroids = [];
      this.bullets = [];
      this.stars = [];
      // this.addAsteroids();
      this.addStars();
    }.bind(this), 2000);
  };

  Game.prototype.unBind = function () {
    key.unbind('up');
    key.unbind('down');
    key.unbind('left');
    key.unbind('right');
    key.unbind('w');
    key.unbind('s');
    key.unbind('a');
    key.unbind('d');
    key.unbind('space');
  };

  Game.prototype.addStars = function () {
    for (var i = this.stars.length; i < Game.NUM_STARS; i++) {
      this.add(new Asteroids.Star(
        {game: this})
      );
    }
  };

  Game.prototype.resetScore = function () {
    // if most recent score is higher than high score, set hiscore to score
    // set current score to zero
    if (this.score > this.hiscore) {
      this.hiscore = this.score;
    }

    this.score = 0;
  };

  Game.prototype.addAsteroids = function () {
    for (var i = this.asteroids.length; i < this.num_asteroids; i++) {
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
    } else if (object instanceof Asteroids.Star) {
      this.stars.push(object);
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      game: this,
      pos: [(this.DIM_X / 4), (this.DIM_Y / 2)]
    });

    this.add(ship);
    return ship;
  };

  Game.prototype.remove = function (object) {
    var idx;
    if (object instanceof Asteroids.Asteroid) {
      idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = new Asteroids.Asteroid({game:this});
    } else if (object instanceof Asteroids.Bullet) {
      idx = this.bullets.indexOf(object);
      this.bullets.splice(idx, 1);
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    // ctx.fillStyle="black";
    // ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    ctx2.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx2.fillStyle="black";
    ctx2.fillRect(0, 0, canvasEl.width, canvasEl.height);

    this.scoreScreen.draw(ctx, ctx2);
    this.allObjects().forEach(function (object) {
      object.draw(ctx, ctx2);
    });
  };

  Game.prototype.moveObjects = function (delta) {
    this.allObjects().forEach(function (object) {
      object.move(delta);
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

  Game.prototype.dontWrap = function (pos) {
    var new_pos = pos;
    if (pos[0] < 0) {
      new_pos[0] = 0;
    }
    if (pos[0] > this.DIM_X) {
      new_pos[0] = this.DIM_X;
    }
    if (pos[1] < 0) {
      new_pos[1] = 0;
    }
    if (pos[1] > this.DIM_Y) {
      new_pos[1] = this.DIM_Y;
    }

    return new_pos;
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat(this.stars).concat(this.ships);
  };

  Game.prototype.addScore = function (num) {
    return this.asteroids.concat(this.bullets).concat(this.stars).concat(this.ships);
  };


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

  Game.prototype.difficultyCheck = function () {
    if (this.score > 900) {
      this.num_asteroids = 10;
    } else if (this.score > 650) {
      this.num_asteroids = 7;
    } else if (this.score > 400) {
      this.num_asteroids = 5;
    } else if (this.score > 300) {
      this.num_asteroids = 4;
    }
  };

  Game.prototype.step = function (delta) {
    this.moveObjects(delta);
    this.checkCollisions();
    this.difficultyCheck();
    this.addAsteroids();
  };



})();

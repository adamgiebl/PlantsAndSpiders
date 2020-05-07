// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/shared/canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canvasCenter = exports.groundY = exports.groundHeight = exports.groundPositionX = exports.maskCtx = exports.mask = exports.ctx = exports.canvas = void 0;
const canvas = document.querySelector('canvas');
exports.canvas = canvas;
const ctx = canvas.getContext('2d');
exports.ctx = ctx;
ctx.font = '30px Anton';
canvas.width = innerWidth;
canvas.height = innerHeight;
const mask = document.createElement('canvas');
exports.mask = mask;
const maskCtx = mask.getContext('2d');
exports.maskCtx = maskCtx;
mask.width = innerWidth;
mask.height = innerHeight;
const groundPositionX = 0;
exports.groundPositionX = groundPositionX;
const groundHeight = 15;
exports.groundHeight = groundHeight;
let groundY = canvas.height - groundHeight;
exports.groundY = groundY;

const resizeCanvas = () => {
  window.location.reload();
  /*canvas.width = innerWidth
  canvas.height = innerHeight
  mask.width = innerWidth
  mask.height = innerHeight
  groundY = canvas.height - groundHeight*/
};

const canvasCenter = {
  x: canvas.width / 2,
  y: canvas.height / 2
};
exports.canvasCenter = canvasCenter;
window.addEventListener('resize', resizeCanvas);
},{}],"src/KeyboardHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class KeyboardHandler {
  constructor() {
    // Holds the current state of a given key
    this.keyStates = new Map(); // Holds the callback functions for a key code

    this.keyMap = new Map();
  }

  addMapping(code, callback) {
    this.keyMap.set(code, callback);
  }

  handleEvent(event) {
    const {
      code
    } = event;

    if (!this.keyMap.has(code)) {
      return;
    }

    event.preventDefault();
    const keyState = event.type === 'keydown' ? true : false;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);
    this.keyMap.get(code)(keyState);
  }

  listenTo(window) {
    ;
    ['keydown', 'keyup'].forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event);
      });
    });
  }

}

exports.default = KeyboardHandler;
},{}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUpMouse = exports.setUpKeyboard = void 0;

var _KeyboardHandler = _interopRequireDefault(require("./KeyboardHandler"));

var _canvas = require("/src/shared/canvas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setUpKeyboard = character => {
  const keyboard = new _KeyboardHandler.default();
  keyboard.addMapping('KeyD', keyState => {
    character.direction.right = keyState;
  });
  keyboard.addMapping('KeyA', keyState => {
    character.direction.left = keyState;
  });
  keyboard.addMapping('Space', keyState => {
    character.direction.jumping = keyState;
  });
  keyboard.listenTo(window);
};

exports.setUpKeyboard = setUpKeyboard;

const setUpMouse = character => {
  _canvas.canvas.addEventListener('mousemove', ({
    clientX,
    clientY
  }) => {
    character.rotate(clientX, clientY);
  });

  _canvas.canvas.addEventListener('click', e => {
    character.onClick();
  });
};

exports.setUpMouse = setUpMouse;
},{"./KeyboardHandler":"src/KeyboardHandler.js","/src/shared/canvas":"src/shared/canvas.js"}],"static/sounds/ShotgunQuieter.mp3":[function(require,module,exports) {
module.exports = "/ShotgunQuieter.079f6f7f.mp3";
},{}],"static/sounds/Splash.mp3":[function(require,module,exports) {
module.exports = "/Splash.8180e980.mp3";
},{}],"static/sounds/glass.mp3":[function(require,module,exports) {
module.exports = "/glass.10f2154d.mp3";
},{}],"static/sounds/reggae.mp3":[function(require,module,exports) {
module.exports = "/reggae.e0ce420b.mp3";
},{}],"static/sounds/seed.mp3":[function(require,module,exports) {
module.exports = "/seed.a0228a2a.mp3";
},{}],"static/sounds/plant.mp3":[function(require,module,exports) {
module.exports = "/plant.4c5b0996.mp3";
},{}],"static/sounds/spiderBite.mp3":[function(require,module,exports) {
module.exports = "/spiderBite.9db2d915.mp3";
},{}],"src/AudioPlayer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audioPlayer = exports.AudioPlayer = void 0;

var _ShotgunQuieter = _interopRequireDefault(require("/static/sounds/ShotgunQuieter.mp3"));

var _Splash = _interopRequireDefault(require("/static/sounds/Splash.mp3"));

var _glass = _interopRequireDefault(require("/static/sounds/glass.mp3"));

var _reggae = _interopRequireDefault(require("/static/sounds/reggae.mp3"));

var _seed = _interopRequireDefault(require("/static/sounds/seed.mp3"));

var _plant = _interopRequireDefault(require("/static/sounds/plant.mp3"));

var _spiderBite = _interopRequireDefault(require("/static/sounds/spiderBite.mp3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AudioPlayer {
  constructor() {
    this.audioContext = new AudioContext();
    this.audioBuffers = new Map();
    this.muted = false;
    this.gainNodeFx = this.audioContext.createGain();
    this.gainNodeMusic = this.audioContext.createGain();
  }

  loadAudio(src) {
    return fetch(src).then(response => response.arrayBuffer()).then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer));
  }

  addAudio(name, buffer) {
    this.audioBuffers.set(name, buffer);
  }

  playAudio(name) {
    const source = this.audioContext.createBufferSource();
    source.connect(this.gainNodeFx);
    this.gainNodeFx.connect(this.audioContext.destination);
    source.buffer = this.audioBuffers.get(name);
    source.start(0);
  }

  playMusic(name) {
    const source = this.audioContext.createBufferSource();
    source.connect(this.gainNodeMusic);
    this.gainNodeMusic.connect(this.audioContext.destination);
    source.buffer = this.audioBuffers.get(name);
    source.loop = true;
    source.start(0);
  }

  changeVolume(type, value) {
    if (type === 'MUSIC') {
      this.gainNodeMusic.gain.value = value;
    } else if (type === 'FX') {
      this.gainNodeFx.gain.value = value;
    }
  }

  async loadAllSounds() {
    await Promise.all([audioPlayer.loadAudio(_ShotgunQuieter.default), audioPlayer.loadAudio(_Splash.default), audioPlayer.loadAudio(_glass.default), audioPlayer.loadAudio(_reggae.default), audioPlayer.loadAudio(_seed.default), audioPlayer.loadAudio(_plant.default), audioPlayer.loadAudio(_spiderBite.default)]).then(([gunshot, splash, glass, music, seed, plant, spiderBite]) => {
      audioPlayer.addAudio('gunshot', gunshot);
      audioPlayer.addAudio('splash', splash);
      audioPlayer.addAudio('glass', glass);
      audioPlayer.addAudio('music', music);
      audioPlayer.addAudio('seed', seed);
      audioPlayer.addAudio('plant', plant);
      audioPlayer.addAudio('spiderBite', spiderBite);
    });
  }

}

exports.AudioPlayer = AudioPlayer;
const audioPlayer = new AudioPlayer();
exports.audioPlayer = audioPlayer;
},{"/static/sounds/ShotgunQuieter.mp3":"static/sounds/ShotgunQuieter.mp3","/static/sounds/Splash.mp3":"static/sounds/Splash.mp3","/static/sounds/glass.mp3":"static/sounds/glass.mp3","/static/sounds/reggae.mp3":"static/sounds/reggae.mp3","/static/sounds/seed.mp3":"static/sounds/seed.mp3","/static/sounds/plant.mp3":"static/sounds/plant.mp3","/static/sounds/spiderBite.mp3":"static/sounds/spiderBite.mp3"}],"src/classes/loaders.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImage = loadImage;
exports.loadManifest = loadManifest;
exports.loadAnimations = loadAnimations;

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

function loadManifest(name) {
  return fetch(`./manifests/${name}.json`).then(res => res.json());
}

function loadAnimations(animations) {
  const animationsMap = new Map();
  animations.forEach(animation => {
    const spriteMap = new Map();
    animation.frames.forEach(frame => {
      spriteMap.set(frame.name, frame.rect);
    });
    animationsMap.set(animation.name, spriteMap);
  });
  return animationsMap;
}
},{}],"src/classes/character.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCharacter = exports.Character = void 0;

var _canvas = require("/src/shared/canvas");

var _input = require("../input");

var _AudioPlayer = require("../AudioPlayer");

var _loaders = require("./loaders");

class Character {
  constructor(manifest) {
    this.manifest = manifest;
    this.direction = {
      left: false,
      right: false,
      jumping: false
    };
    this.isOnGround = true;
    this.deltaX = 0;
    this.deltaY = 0;
    this.angle = 0;
    this.velocityX = 6;
    this.velocityY = 0;
    this.gravity = 0.6;
    this.flip = false;
    this.shot = false;
    this.distance = 0;
    this.ready = true;
    this.streak = 0;
    this.highestStreak = 0;
    this.lowerBody = { ...this.manifest.lowerBody,
      runningAnimation: this.manifest.animations.get('running'),
      jumpingAnimation: this.manifest.animations.get('jumping')
    };
    this.upperBody = { ...this.manifest.upperBody,
      x: this.x - 30,
      y: this.y - this.lowerBody.height + 70
    };
    this.x = 0;
    this.y = _canvas.canvas.height - _canvas.groundHeight - this.lowerBody.height + 5;
    this.flashAnimation = {
      active: false,
      duration: 3,
      frame: 0,
      image: this.manifest.flashImage
    };
    this.shootingAnimation = {
      active: false,
      duration: 4,
      frame: 0,
      size: 5
    };
    this.setUp();
  }

  draw(ctx) {
    this.upperBody = { ...this.upperBody,
      rotationPoint: {
        x: this.x + this.lowerBody.width / 2,
        y: this.y + 25
      },
      x: this.x - 25,
      y: this.y - this.lowerBody.height + (this.flip ? 160 : 100)
    };
    ctx.strokeStyle = 'red'; //ctx.strokeRect(this.x, this.y, this.lowerBody.width, this.lowerBody.height)

    this.getFrame(ctx, `walk-${Math.floor(this.distance / 20) % this.lowerBody.runningAnimation.size}`); //this.getFrame(ctx, 'walk-1')

    ctx.translate(this.upperBody.rotationPoint.x, this.upperBody.rotationPoint.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.upperBody.rotationPoint.x, -this.upperBody.rotationPoint.y);
    ctx.strokeStyle = 'limegreen';
    this.runShootingAnimation();
    ctx.drawImage(this.flip ? this.upperBody.imageFlipped : this.upperBody.image, this.upperBody.x, this.upperBody.y, this.upperBody.width, this.upperBody.height); //ctx.strokeRect(this.upperBody.x, this.upperBody.y, this.upperBody.width, this.upperBody.height)

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'blue'; //d ctx.fillRect(this.upperBody.rotationPoint.x - 5, this.upperBody.rotationPoint.y - 5, 10, 10)
  }

  move() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y + this.lowerBody.height >= _canvas.groundY) {
      this.y = _canvas.groundY - this.lowerBody.height;
      this.isOnGround = true;
      this.velocityY = 0.0;
    }

    if (this.direction.left) {
      if (this.x > 0) {
        this.x -= this.velocityX;
        this.distance += this.velocityX;
      }
    } else if (this.direction.right) {
      if (this.x < _canvas.canvas.width - this.upperBody.width) {
        this.x += this.velocityX;
        this.distance += this.velocityX;
      }
    } else {
      if (this.ready) this.distance = 0;
    }

    if (this.direction.jumping) {
      if (this.isOnGround) {
        this.velocityY = -12.0;
        this.isOnGround = false;
      }
    }
  }

  getFrame(ctx, name) {
    if (this.isOnGround) {
      const frame = this.lowerBody.runningAnimation.get(name);

      if (frame) {
        ctx.drawImage(this.lowerBody.spriteSheet, frame.x, this.flip ? frame.y + frame.height : frame.y, frame.width, frame.height, this.x, this.y, this.lowerBody.width, this.lowerBody.height);
      } else {
        ctx.drawImage(this.lowerBody.spriteSheet, frame.x, this.flip ? frame.y + frame.height : frame.y, frame.width, frame.height, this.x, this.y, this.lowerBody.width, this.lowerBody.height);
      }
    } else {
      const frame = this.lowerBody.jumpingAnimation.get('jump-0');
      ctx.drawImage(this.lowerBody.spriteSheet, frame.x, this.flip ? frame.y + frame.height : frame.y, frame.width, frame.height, this.x, this.y, this.lowerBody.width, this.lowerBody.height);
    }
  }

  drawFlash(maskCtx) {
    if (this.flashAnimation.active == true) {
      if (this.flashAnimation.frame >= this.flashAnimation.duration) {
        this.flashAnimation.frame = 0;
        this.flashAnimation.active = false;
      } else {
        this.flashAnimation.frame++;
        maskCtx.fillStyle = 'rgba(249, 191, 0, 0.1)';
        maskCtx.fillRect(0, 0, _canvas.canvas.width, _canvas.canvas.height);
        maskCtx.translate(this.upperBody.rotationPoint.x, this.upperBody.rotationPoint.y);
        maskCtx.rotate(this.angle);
        maskCtx.translate(-this.upperBody.rotationPoint.x, -this.upperBody.rotationPoint.y);
        maskCtx.strokeStyle = 'limegreen'; //ctx.strokeRect(this.upperBody.x, this.upperBody.y, this.upperBody.width, this.upperBody.height)

        maskCtx.drawImage(this.flashAnimation.image, this.upperBody.x + this.upperBody.width, this.upperBody.y + (this.flip ? 0 : 100), this.upperBody.width, this.upperBody.height / 2);
        maskCtx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  }

  runShootingAnimation() {
    if (this.shootingAnimation.active) {
      if (this.shootingAnimation.frame >= this.shootingAnimation.duration) {
        this.shootingAnimation.frame = 0;
        this.shootingAnimation.active = false;
      } else {
        this.shootingAnimation.frame++;
        this.upperBody.x = this.upperBody.x - this.shootingAnimation.size * this.shootingAnimation.frame;
      }
    }
  }

  rotate(clientX, clientY) {
    //const deltaX = this.x + this.upperBody.width / 2 - clientX
    //const deltaY = this.y + this.upperBody.height / 2 - clientY
    this.angle = Math.atan2(this.y + this.upperBody.height / 2 - clientY, this.x + this.upperBody.width / 2 - clientX) + Math.PI;

    if (this.angle > 1.5 && this.angle < 4.7) {
      this.flip = true;
    } else {
      this.flip = false;
    }
  }

  onClick() {
    _AudioPlayer.audioPlayer.playAudio('gunshot');

    this.flashAnimation.active = true;
    this.shootingAnimation.active = true;
  }

  setUp() {
    (0, _input.setUpKeyboard)(this);
    (0, _input.setUpMouse)(this);
  }

}

exports.Character = Character;

const loadCharacter = async () => {
  const manifest = await (0, _loaders.loadManifest)('character');
  manifest.lowerBody = { ...manifest.lowerBody,
    spriteSheet: await (0, _loaders.loadImage)(manifest.lowerBody.spriteSheetURL)
  };
  manifest.upperBody = { ...manifest.upperBody,
    image: await (0, _loaders.loadImage)(manifest.upperBody.imageURL),
    imageFlipped: await (0, _loaders.loadImage)(manifest.upperBody.flippedImageURL)
  };
  manifest.flashImage = await (0, _loaders.loadImage)(manifest.flashImageURL);
  manifest.animations = (0, _loaders.loadAnimations)(manifest.animationsToBeLoaded);
  return new Character(manifest);
};

exports.loadCharacter = loadCharacter;
},{"/src/shared/canvas":"src/shared/canvas.js","../input":"src/input.js","../AudioPlayer":"src/AudioPlayer.js","./loaders":"src/classes/loaders.js"}],"src/classes/scene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadScene = exports.Scene = void 0;

var _canvas = require("/src/shared/canvas");

var _loaders = require("/src/classes/loaders");

class Scene {
  constructor(manifest) {
    this.manifest = manifest;
  }

  draw(ctx) {
    ctx.drawImage(this.manifest.image, 0, 0, _canvas.canvas.width, _canvas.canvas.height);
  }

}

exports.Scene = Scene;

const loadScene = async () => {
  const manifest = await (0, _loaders.loadManifest)('scene');
  manifest.image = await (0, _loaders.loadImage)(manifest.mainImageURL);
  return new Scene(manifest);
};

exports.loadScene = loadScene;
},{"/src/shared/canvas":"src/shared/canvas.js","/src/classes/loaders":"src/classes/loaders.js"}],"src/shared/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = getRandomInt;
exports.randomIntFromRange = randomIntFromRange;
exports.checkCollision = checkCollision;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkCollision(obj1, obj2) {
  if (obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y) {
    return true;
  } else {
    return false;
  }
}
},{}],"src/classes/spider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSpiderFactory = exports.SpiderFactory = exports.Spider = void 0;

var _canvas = require("/src/shared/canvas");

var _helpers = require("/src/shared/helpers");

var _AudioPlayer = require("../AudioPlayer");

var _loaders = require("./loaders");

class Spider {
  constructor(manifest) {
    const {
      destination,
      position,
      width,
      height,
      speed
    } = manifest;
    this.manifest = manifest;
    this.height = width;
    this.width = height;
    this.x = position.x;
    this.y = position.y;
    this.isShot = false;
    this.hasKilledAPlant = false;
    this.killer = {};
    this.deltaX = destination.x - this.x;
    this.deltaY = destination.y - this.y;
    this.angle = Math.atan2(this.deltaY, this.deltaX);
    this.splashAngle = 0;
    this.velocityX = Math.cos(this.angle) * 1.0;
    this.velocityY = Math.sin(this.angle) * 1.0;
    this.direction = this.angle - Math.PI / 2;
    this.distance = 0;
    this.speed = speed;
    this.points = {
      shown: false,
      value: Math.floor(1000 / this.width),
      y: this.y,
      speed: 2,
      multiplier: 1
    };
  }

  draw(ctx) {
    if (!this.isShot && !this.hasKilledAPlant) {
      this.distance += 2;
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(this.direction);
      ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
      this.getFrame(ctx, `spider-${Math.floor(this.distance / 20) % this.manifest.spriteMap.size}`);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.checkCollision();
    } else if (this.hasKilledAPlant) {} else {
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(-this.splashAngle + Math.PI);
      ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
      ctx.drawImage(this.manifest.splashImage, this.x - 10, this.y - this.height, this.width + 20, this.height * 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      if (this.points.shown) {
        this.drawPoints(ctx);
      }
    }
  }

  checkCollision() {
    this.manifest.plants.forEach(plant => {
      if (plant.plantBoundingRect.x < this.x + this.width && plant.plantBoundingRect.x + plant.plantBoundingRect.width > this.x && plant.plantBoundingRect.y < this.y + this.height && plant.plantBoundingRect.y + plant.plantBoundingRect.height > this.y) {
        plant.shrink();

        _AudioPlayer.audioPlayer.playAudio('spiderBite');

        this.hasKilledAPlant = true;
        window.game.state.spidersKilled += 1;

        if (window.game.state.spidersKilled === window.game.levels[window.game.state.level].numberOfSpiders) {
          window.game.state.level++;
        }

        const res = this.manifest.plants.reduce((acc, plant) => {
          return acc + plant.size;
        }, 0);

        if (res === this.manifest.plants.length * -1) {
          window.game.state.gameOver = true;
        }
      }
    });
  }

  drawPoints(ctx) {
    this.points.y -= this.points.speed;
    ctx.font = `${this.width - 10}px Anton`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(Math.floor(this.points.value * this.points.multiplier), this.x + this.width / 2, this.points.y);

    if (this.points.y < 0) {
      this.points.shown = false;
    }
  }

  getFrame(ctx, name) {
    const frame = this.manifest.spriteMap.get(name);

    if (frame) {
      ctx.drawImage(this.manifest.image, frame.x, frame.y, frame.width, frame.height, this.x += this.velocityX * this.speed, this.y += this.velocityY * this.speed, this.width, this.height);
    }
  }

  onClick() {
    window.game.state.streak += 1;
    window.game.state.spidersKilledTotal += 1;
    window.game.state.spidersKilled += 1;
    this.points.multiplier = 1 + window.game.state.streak * 0.1;
    window.game.state.score += Math.floor(this.points.value * this.points.multiplier);

    if (window.game.state.streak > window.game.state.biggestStreak) {
      window.game.state.biggestStreak = window.game.state.streak;
    }

    setTimeout(() => _AudioPlayer.audioPlayer.playAudio('splash'), 100);
    this.isShot = true;
    this.points.shown = true;
    this.points.y = this.y;
    this.killer = {
      x: this.manifest.character.upperBody.x,
      y: this.manifest.character.upperBody.y
    };
    const deltaX = this.x - (this.killer.x + this.manifest.character.upperBody.width / 2);
    const deltaY = this.y - (this.killer.y + 100);
    this.splashAngle = Math.atan2(deltaX, deltaY);

    if (window.game.state.spidersKilled === window.game.levels[window.game.state.level].numberOfSpiders) {
      window.game.state.level++;
    }
  }

}

exports.Spider = Spider;

class SpiderFactory {
  constructor(manifest) {
    this.manifest = manifest;
  }

  createSpiders(numberOfSpiders, character, plants) {
    this.manifest.character = character;
    this.manifest.plants = plants;
    this.manifest.speed = window.game.config.settings.spiders[window.game.difficulty].speed;
    let spiders = [];

    for (let i = 0; i < numberOfSpiders; i++) {
      this.manifest.position = {
        x: (0, _helpers.randomIntFromRange)(-200, _canvas.canvas.width + 200),
        y: (0, _helpers.randomIntFromRange)(-200, 0)
      };
      const size = (0, _helpers.randomIntFromRange)(25, 80);
      this.manifest.width = size;
      this.manifest.height = size; //spider will pick a random plant and attack it

      const plant = plants[(0, _helpers.randomIntFromRange)(0, plants.length - 1)];
      this.manifest.destination = {
        x: plant.x + plant.width / 2,
        y: plant.y
      };
      spiders.push(new Spider(this.manifest));
    }

    return spiders;
  }

}

exports.SpiderFactory = SpiderFactory;

const loadSpiderFactory = async () => {
  const manifest = await (0, _loaders.loadManifest)('spider');
  manifest.image = await (0, _loaders.loadImage)(manifest.mainImageURL);
  manifest.splashImage = await (0, _loaders.loadImage)(manifest.splashImageURL);
  const spriteMap = new Map();
  manifest.frames.forEach(frame => {
    spriteMap.set(frame.name, frame.rect);
  });
  manifest.spriteMap = spriteMap;
  return new SpiderFactory(manifest);
};

exports.loadSpiderFactory = loadSpiderFactory;
document.querySelectorAll('audio').forEach(function (audioElement) {
  if (audioElement.muted) {
    audioElement.muted = false;
  } else {
    audioElement.muted = true;
  }
});
},{"/src/shared/canvas":"src/shared/canvas.js","/src/shared/helpers":"src/shared/helpers.js","../AudioPlayer":"src/AudioPlayer.js","./loaders":"src/classes/loaders.js"}],"src/shared/UI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideLoadingScreen = exports.updateStreak = exports.updateScore = exports.updateLevel = exports.showGameOver = exports.addEventListeners = void 0;

var _AudioPlayer = require("../AudioPlayer");

// file for interaction between html elements and canvas
const addEventListeners = plants => {
  document.querySelector('#settings-button').addEventListener('click', () => {
    document.querySelector('#settings').classList.remove('hidden');
    window.game.state.paused = true;
  });
  document.querySelector('#close-modal').addEventListener('click', () => {
    document.querySelector('#settings').classList.add('hidden');
    window.game.state.paused = false;
  });
  document.querySelector('#fx-slider').addEventListener('change', e => {
    _AudioPlayer.audioPlayer.playAudio('gunshot');

    _AudioPlayer.audioPlayer.changeVolume('FX', e.target.value);
  });
  document.querySelector('#music-slider').addEventListener('input', e => {
    _AudioPlayer.audioPlayer.changeVolume('MUSIC', e.target.value);
  });
  document.querySelectorAll('#difficulty-setting .radio').forEach(input => {
    input.addEventListener('click', e => {
      window.game.difficulty = e.target.value;
      window.game.state.shouldRestart = true;
      window.game.state.paused = false;
    });
  });
};

exports.addEventListeners = addEventListeners;

const showGameOver = () => {
  document.querySelector('#gameOverScreen').classList.remove('hidden');
  const scorePlants = window.game.plants.reduce((acc, plant) => {
    return acc + plant.size * 1000;
  }, 0);

  if (scorePlants === -3000) {
    document.querySelector('#gameOverScreen .lost').classList.remove('hidden');
  } else {
    document.querySelector('#gameOverScreen .win').classList.remove('hidden');
    document.querySelector('#gameOverScreen #score').innerText = window.game.state.score + scorePlants;
    document.querySelector('#gameOverScreen #score-spiders').innerText = window.game.state.score;
    document.querySelector('#gameOverScreen #score-plants').innerText = scorePlants;
    document.querySelector('#gameOverScreen #score-streak').innerText = window.game.state.biggestStreak;
    document.querySelector('#gameOverScreen #score-difficulty').innerText = window.game.difficulty.toLowerCase();
    document.querySelector('#gameOverScreen #score-difficulty').dataset.diff = window.game.difficulty;
  }

  document.querySelector('#restart-button').addEventListener('click', () => {
    document.querySelector('#gameOverScreen').classList.add('hidden');
    window.game.state.shouldRestart = true;
    window.game.state.paused = false;
  });
};

exports.showGameOver = showGameOver;

const updateLevel = () => {
  if (window.game.state.level >= 0) {
    document.querySelector('#level').innerText = window.game.state.level + 1; //document.querySelector('#level').classList.remove('hidden')
  }
};

exports.updateLevel = updateLevel;

const updateScore = () => {
  document.querySelector('#score').innerText = window.game.state.score;
};

exports.updateScore = updateScore;

const updateStreak = () => {
  const streak = document.querySelector('#streak');
  const streakCont = document.querySelector('#streak-container');
  streak.innerText = Math.floor((1 + window.game.state.streak * 0.1) * 10) / 10;

  if (window.game.state.streak !== 0) {
    streakCont.classList.remove('hidden');
    streak.classList.remove('streak-animation');
    streak.offsetWidth;
    streak.classList.add('streak-animation'); //streak.style.color = '#' + (((1 << 24) * Math.random()) | 0).toString(16)
  } else {
    streakCont.classList.add('hidden');
  }
};

exports.updateStreak = updateStreak;

const hideLoadingScreen = () => {
  document.querySelector('#loadingScreen').classList.add('hidden');
};

exports.hideLoadingScreen = hideLoadingScreen;
},{"../AudioPlayer":"src/AudioPlayer.js"}],"src/classes/plant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPlantFactory = exports.Plant = exports.PlantFactory = void 0;

var _canvas = require("/src/shared/canvas");

var _UI = require("/src/shared/UI");

var _loaders = require("/src/classes/loaders");

var _AudioPlayer = require("../AudioPlayer");

class PlantFactory {
  constructor(manifest) {
    this.manifest = manifest;
  }

  createPlants(numberOfPlants) {
    const {
      width,
      height,
      image,
      loadedPlantImages,
      potMargin,
      plantSizes
    } = this.manifest;
    const plants = [];
    const widthSum = width * numberOfPlants + potMargin * (numberOfPlants - 1);
    const offset = (_canvas.canvas.width - widthSum) / 2; //plantSizes.reduce((acc, b) => acc + b.width, 0)

    for (let i = 0; i < numberOfPlants; i++) {
      plants.push(new Plant(offset + (width + (i === numberOfPlants ? 0 : potMargin)) * i, _canvas.groundY - height, plantSizes, image, loadedPlantImages, i));
    }

    (0, _UI.addEventListeners)(plants);
    return plants;
  }

}

exports.PlantFactory = PlantFactory;

class Plant {
  constructor(positionX, positionY, plantSizes, image, plantImages, id) {
    this.id = id;
    this.x = positionX;
    this.y = positionY - 15;
    this.size = 0;
    this.plantSizes = plantSizes;
    this.planted = false;
    this.showSeed = true;
    this.plantImages = plantImages;
    this.width = 170;
    this.height = 120;
    this.potCenter = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
    this.image = image;
    this.timeToShowSeedButton = 1;
    this.activePlant = plantSizes[this.size];
    this.activePlantImage = plantImages[this.size];
    this.plantBoundingRect = {
      x: this.potCenter.x - this.activePlant.width / 2,
      y: this.y - this.activePlant.height,
      width: this.activePlant.width,
      height: this.activePlant.height
    };
    this.createSeedButton();
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    if (this.planted) {
      ctx.drawImage(this.activePlantImage, this.plantBoundingRect.x, this.plantBoundingRect.y, this.plantBoundingRect.width, this.plantBoundingRect.height);
    }
  }

  grow() {
    _AudioPlayer.audioPlayer.playAudio('plant');

    if (this.size < this.plantImages.length - 1 && this.planted) {
      this.size++;
      this.activePlant = this.plantSizes[this.size];
      this.activePlantImage = this.plantImages[this.size];
      this.plantBoundingRect = {
        x: this.potCenter.x - this.activePlant.width / 2,
        y: this.y - this.activePlant.height,
        width: this.activePlant.width,
        height: this.activePlant.height
      };
    }
  }

  shrink() {
    if (this.size > 0 && this.planted) {
      this.size--;
      this.activePlant = this.plantSizes[this.size];
      this.activePlantImage = this.plantImages[this.size];
      this.plantBoundingRect = {
        x: this.potCenter.x - this.activePlant.width / 2,
        y: this.y - this.activePlant.height,
        width: this.activePlant.width,
        height: this.activePlant.height
      };
    } else {
      this.size = -1;
      this.planted = false;
    }
  }

  onClick() {//this.grow()
  }

  plantSeed() {
    _AudioPlayer.audioPlayer.playAudio('seed');

    window.game.state.seedsPlanted += 1;
    this.planted = true;
    document.querySelector(`.seedButton[data-id="${this.id}"]`).removeEventListener('click', this.plantSeed);
    document.querySelector(`.seedButton[data-id="${this.id}"]`).classList.remove('active');
  }

  showSeedButton() {
    document.querySelector(`.seedButton[data-id="${this.id}"]`).classList.add('active');
    document.querySelector(`.seedButton[data-id="${this.id}"]`).addEventListener('click', this.plantSeed.bind(this));
  }

  createSeedButton() {
    if (!document.querySelector(`.seedButton[data-id="${this.id}"]`)) {
      overlay.innerHTML += `
                <div 
                    class="seedButton"
                    data-id="${this.id}"
                    style="left: ${this.potCenter.x - 40}px; top: ${this.potCenter.y - 160}px;" 
                >
                    <div class="seedButton__image">
                    </div>
                </div>
            `;
    }
  }

}

exports.Plant = Plant;

const loadPlantFactory = async () => {
  const manifest = await (0, _loaders.loadManifest)('plant');
  manifest.image = await (0, _loaders.loadImage)(manifest.mainImageURL);
  manifest.loadedPlantImages = [];
  Promise.all([(0, _loaders.loadImage)(manifest.plantImages[0]), (0, _loaders.loadImage)(manifest.plantImages[1]), (0, _loaders.loadImage)(manifest.plantImages[2]), (0, _loaders.loadImage)(manifest.plantImages[3])]).then(async plants => {
    manifest.loadedPlantImages = await plants;
  });
  return new PlantFactory(manifest);
};

exports.loadPlantFactory = loadPlantFactory;
},{"/src/shared/canvas":"src/shared/canvas.js","/src/shared/UI":"src/shared/UI.js","/src/classes/loaders":"src/classes/loaders.js","../AudioPlayer":"src/AudioPlayer.js"}],"src/classes/light.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadLightFactory = exports.LightFactory = exports.Light = void 0;

var _canvas = require("/src/shared/canvas");

var _AudioPlayer = require("../AudioPlayer");

var _loaders = require("./loaders");

class Light {
  constructor(id, positionX, positionY, width, height, image, color, lightWidth, turnOn, numberOfLights) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.x = positionX;
    this.y = positionY;
    this.lampCenter = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
    this.turnedOn = false;
    this.color = color;
    this.lightWidth = lightWidth;
    this.image = image;
    this.offset = 10;
    this.isShot = false;
    this.perspective = 40;
    this.turnOn = turnOn;
    this.numberOfLights = numberOfLights;
  }

  drawLight(ctx) {
    if (this.turnedOn) {
      ctx.beginPath(); //top left

      ctx.moveTo(this.x + this.offset, this.y + this.height); //bottom left

      if (this.id == 0) {
        ctx.lineTo(this.x - this.lightWidth, _canvas.canvas.height - 65);
        ctx.lineTo(this.x - this.lightWidth - this.perspective, _canvas.canvas.height);
      } else {
        ctx.lineTo(this.x - this.lightWidth, _canvas.canvas.height);
      } //bottom right


      if (this.id == this.numberOfLights - 1) {
        ctx.lineTo(this.x + +this.width + this.lightWidth + this.perspective, _canvas.canvas.height);
        ctx.lineTo(this.x + this.width + this.lightWidth, _canvas.canvas.height - 65);
      } else {
        ctx.lineTo(this.x + this.width + this.lightWidth, _canvas.canvas.height);
      } //top right


      ctx.lineTo(this.x + this.width - this.offset, this.y + this.height);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  drawBody(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  draw(ctx) {
    this.drawBody(ctx);
    this.drawLight(_canvas.maskCtx);
  }

  onClick() {
    if (!this.isShot) {
      _AudioPlayer.audioPlayer.playAudio('glass');
    }

    this.isShot = true;
  }

}

exports.Light = Light;

class LightFactory {
  constructor(manifest) {
    this.manifest = manifest;
  }

  createLights(numberOfLights, delay) {
    const {
      width,
      height,
      image,
      color,
      lightWidth,
      lightMargin
    } = this.manifest;
    const lights = [];
    const widthSum = width * numberOfLights + lightMargin * (numberOfLights - 1);
    const offset = (_canvas.canvas.width - widthSum) / 2;

    for (let i = 0; i < numberOfLights; i++) {
      const turnOn = i + delay;
      const light = new Light(i, offset + (width + (i === numberOfLights ? 0 : lightMargin)) * i, 0, width, height, image, color, lightWidth, turnOn, numberOfLights);
      lights.push(light);
    }

    return lights;
  }

}

exports.LightFactory = LightFactory;

const loadLightFactory = async () => {
  const manifest = await (0, _loaders.loadManifest)('light');
  manifest.image = await (0, _loaders.loadImage)(manifest.mainImageURL);
  return new LightFactory(manifest);
};

exports.loadLightFactory = loadLightFactory;
},{"/src/shared/canvas":"src/shared/canvas.js","../AudioPlayer":"src/AudioPlayer.js","./loaders":"src/classes/loaders.js"}],"src/classes/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = void 0;

class Timer {
  constructor() {
    this.startTime = 0;
    this.timeElapsed = 0;
  }

  start() {
    this.startTime = new Date();
  }

  logTimeElapsed() {
    let timeDiff = (new Date() - this.startTime) / 1000;
    let seconds = Math.round(timeDiff);

    if (this.timeElapsed != seconds) {
      this.timeElapsed = seconds; //console.log(this.timeElapsed)
    }
  }

  getTimeElapsed() {
    return this.timeElapsed;
  }

}

exports.Timer = Timer;
},{}],"src/classes/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _character = require("./character");

Object.keys(_character).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _character[key];
    }
  });
});

var _scene = require("./scene");

Object.keys(_scene).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scene[key];
    }
  });
});

var _spider = require("./spider");

Object.keys(_spider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spider[key];
    }
  });
});

var _plant = require("./plant");

Object.keys(_plant).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _plant[key];
    }
  });
});

var _light = require("./light");

Object.keys(_light).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _light[key];
    }
  });
});

var _loaders = require("./loaders");

Object.keys(_loaders).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _loaders[key];
    }
  });
});

var _timer = require("./timer");

Object.keys(_timer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _timer[key];
    }
  });
});
},{"./character":"src/classes/character.js","./scene":"src/classes/scene.js","./spider":"src/classes/spider.js","./plant":"src/classes/plant.js","./light":"src/classes/light.js","./loaders":"src/classes/loaders.js","./timer":"src/classes/timer.js"}],"src/clickHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkTarget = void 0;

const checkTarget = ({
  clientX,
  clientY
}, targets, callback) => {
  callback(targets.find(target => !target.isShot && clientX > target.x && clientX < target.x + target.width && clientY > target.y && clientY < target.y + target.height));
};

exports.checkTarget = checkTarget;
},{}],"src/gameLoop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameLoop = void 0;

var _canvas = require("/src/shared/canvas");

var _classes = require("./classes");

var _helpers = require("/src/shared/helpers");

var _UI = require("/src/shared/UI");

var _AudioPlayer = require("./AudioPlayer");

var _clickHandler = require("/src/clickHandler");

const defaultState = {
  seedsPlanted: 0,
  seedsShown: false,
  spidersKilled: 0,
  spidersKilledTotal: 0,
  level: -1,
  currentLevel: -1,
  gameOver: false,
  levelUpdated: false,
  score: 0,
  streak: 0,
  biggestStreak: 0,
  shouldRestart: false
};
const defaultDifficulty = 'NORMAL';

const GameLoop = async config => {
  window.game = {
    config: config,
    state: JSON.parse(JSON.stringify(defaultState)),
    difficulty: defaultDifficulty,
    levels: config.levels[defaultDifficulty]
  };
  let timer = new _classes.Timer();
  const character = await (0, _classes.loadCharacter)();
  const scene = await (0, _classes.loadScene)();
  const plantFactory = await (0, _classes.loadPlantFactory)();
  const lightFactory = await (0, _classes.loadLightFactory)();
  const spiderFactory = await (0, _classes.loadSpiderFactory)();
  await _AudioPlayer.audioPlayer.loadAllSounds();

  _AudioPlayer.audioPlayer.playMusic('music');

  let plants = plantFactory.createPlants(config.settings.plants.numberOfPots);
  let lamps = lightFactory.createLights(config.settings.lights.numberOfLights, config.timing.startLights);
  let spiders = [];

  _canvas.canvas.addEventListener('mousedown', e => {
    (0, _clickHandler.checkTarget)(e, [...spiders], entity => {
      if (entity) entity.onClick();else {
        window.game.state.streak = 0;
      }
      (0, _UI.updateScore)();
      (0, _UI.updateStreak)(character.streak);
    });
    (0, _clickHandler.checkTarget)(e, [...lamps, ...plants], entity => {
      if (entity) entity.onClick();
    });
  });

  const nextLevel = () => {
    window.game.state.currentLevel = window.game.state.level;
    window.game.state.levelUpdated = false;
    window.game.state.spidersKilled = 0;
    spiders = [];
  };

  timer.start(); // forcing loading screen to see the amazingness
  //setTimeout(() => hideLoadingScreen(), 2000)

  (0, _UI.hideLoadingScreen)();

  const gameLoop = () => {
    if (window.game.state.paused) return window.requestAnimationFrame(gameLoop);
    _canvas.ctx.globalCompositeOperation = 'normal';
    scene.draw(_canvas.ctx);
    character.move();
    spiders.forEach(spider => {
      spider.draw(_canvas.ctx);
    });

    if (!window.game.state.levelUpdated) {
      window.game.state.levelUpdated = true;
      (0, _UI.updateLevel)();
    }

    if (!window.game.state.seedsShown) {
      if (config.timing.showSeeds <= timer.getTimeElapsed()) {
        window.game.state.level = 0;
        window.game.state.seedsShown = true;
        (0, _UI.updateLevel)();
      }
    }

    if (window.game.state.level === 0 && window.game.state.currentLevel !== window.game.state.level) {
      if (window.game.state.seedsPlanted == plants.length) {
        if (spiders.length == 0) {
          spiders = spiderFactory.createSpiders(window.game.levels[0].numberOfSpiders, character, plants);
        }
      }

      if (window.game.state.seedsShown) {
        plants.forEach(plant => {
          if (plant.showSeed) {
            plant.showSeedButton();
            plant.showSeed = false;
          }
        });
      }
    } else if (window.game.state.level === 1 && window.game.state.currentLevel !== window.game.state.level) {
      setTimeout(() => {
        spiders = spiderFactory.createSpiders(window.game.levels[1].numberOfSpiders, character, plants);
      }, 3000);
      nextLevel();
      plants.forEach(plant => {
        plant.grow();
      });
      window.game.plants = plants;
    } else if (window.game.state.level === 2 && window.game.state.currentLevel !== window.game.state.level) {
      setTimeout(() => {
        spiders = spiderFactory.createSpiders(window.game.levels[2].numberOfSpiders, character, plants);
      }, 3000);
      nextLevel();
      plants.forEach(plant => {
        plant.grow();
      });
    } else if (window.game.state.level === 3 && window.game.state.currentLevel !== window.game.state.level) {
      nextLevel();
      plants.forEach(plant => {
        plant.grow();
      });
      spiders = spiderFactory.createSpiders(window.game.levels[3].numberOfSpiders, character, plants);
    } else if (window.game.state.level === 4 && window.game.state.currentLevel !== window.game.state.level) {
      nextLevel();
      window.game.state.gameOver = true;
    }

    plants.forEach(plant => {
      plant.draw(_canvas.ctx);
    });
    character.draw(_canvas.ctx); // drawing a black mask over the whole screen

    _canvas.maskCtx.fillStyle = 'rgb(68, 68, 68)'; //maskCtx.fillStyle = "rgb(45, 45, 45)";

    _canvas.maskCtx.fillRect(0, 0, _canvas.mask.width, _canvas.mask.height);

    character.drawFlash(_canvas.maskCtx); // adding "white" light onto the mask

    lamps.forEach(lamp => {
      if (!lamp.isShot) {
        if (!lamp.turnedOn && lamp.turnOn <= timer.getTimeElapsed()) {
          lamp.turnedOn = true;
        }

        lamp.drawBody(_canvas.ctx);
        lamp.drawLight(_canvas.maskCtx);
      } else {
        lamp.drawBody(_canvas.ctx);
      }
    }); // multiply the mask with the underlying canvas

    _canvas.ctx.globalCompositeOperation = 'multiply';

    _canvas.ctx.drawImage(_canvas.mask, 0, 0);

    timer.logTimeElapsed();

    if (!window.game.state.gameOver && !window.game.state.shouldRestart) {
      window.requestAnimationFrame(gameLoop);
    } else if (window.game.state.shouldRestart) {
      // restart level
      window.game.state = JSON.parse(JSON.stringify(defaultState));
      spiders = [];
      document.querySelectorAll(`.seedButton[data-id]`).forEach(el => {
        el.outerHTML = '';
      });
      document.querySelector('#gameOverScreen .win').classList.add('hidden');
      document.querySelector('#gameOverScreen .lost').classList.add('hidden');
      plants = plantFactory.createPlants(config.settings.plants.numberOfPots);
      lamps = lightFactory.createLights(config.settings.lights.numberOfLights, config.timing.startLights);
      window.game.levels = window.game.config.levels[window.game.difficulty];
      window.game.state.streak = 0;
      (0, _UI.updateStreak)();
      window.game.state.shouldRestart = false;
      window.requestAnimationFrame(gameLoop);
    } else {
      window.game.plants = plants;
      (0, _UI.showGameOver)();
      window.game.state.paused = true;
      window.requestAnimationFrame(gameLoop);
    }
  };

  return () => {
    //setInterval(gameLoop, 1000 / 60)
    window.requestAnimationFrame(gameLoop);
  };
};

exports.GameLoop = GameLoop;
},{"/src/shared/canvas":"src/shared/canvas.js","./classes":"src/classes/index.js","/src/shared/helpers":"src/shared/helpers.js","/src/shared/UI":"src/shared/UI.js","./AudioPlayer":"src/AudioPlayer.js","/src/clickHandler":"src/clickHandler.js"}],"static/manifests/gameConfig.json":[function(require,module,exports) {
module.exports = {
  "name": "Plants and Spiders",
  "settings": {
    "plants": {
      "numberOfPots": 3
    },
    "lights": {
      "numberOfLights": 3
    },
    "spiders": {
      "EASY": {
        "speed": 0.7
      },
      "NORMAL": {
        "speed": 1.1
      },
      "HARD": {
        "speed": 1.5
      }
    }
  },
  "timing": {
    "showSeeds": 5,
    "startLights": 2,
    "delayBetweenLights": 1
  },
  "levels": {
    "EASY": [{
      "numberOfSpiders": 7
    }, {
      "numberOfSpiders": 12
    }, {
      "numberOfSpiders": 17
    }, {
      "numberOfSpiders": 20
    }],
    "NORMAL": [{
      "numberOfSpiders": 15
    }, {
      "numberOfSpiders": 18
    }, {
      "numberOfSpiders": 20
    }, {
      "numberOfSpiders": 23
    }],
    "HARD": [{
      "numberOfSpiders": 20
    }, {
      "numberOfSpiders": 25
    }, {
      "numberOfSpiders": 30
    }, {
      "numberOfSpiders": 35
    }]
  }
};
},{}],"../../AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js"}],"src/styles/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"C:\\Users\\adamg\\Projects\\plants\\static\\images\\Seed.svg":[["Seed.533b09c9.svg","static/images/Seed.svg"],"static/images/Seed.svg"],"C:\\Users\\adamg\\Projects\\plants\\static\\images\\title-background.png":[["title-background.86b0a878.png","static/images/title-background.png"],"static/images/title-background.png"],"C:\\Users\\adamg\\Projects\\plants\\static\\images\\button.svg":[["button.66f80176.svg","static/images/button.svg"],"static/images/button.svg"],"C:\\Users\\adamg\\Projects\\plants\\static\\images\\multiplier.svg":[["multiplier.988f6531.svg","static/images/multiplier.svg"],"static/images/multiplier.svg"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _gameLoop = require("./gameLoop");

var _gameConfig = _interopRequireDefault(require("/static/manifests/gameConfig.json"));

require("./styles/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const titleScreen = document.querySelector('#titleScreen');
const tutorialScreen = document.querySelector('#tutorialScreen');
titleScreen.addEventListener('click', () => {
  titleScreen.classList.add('hidden');
  tutorialScreen.addEventListener('click', () => {
    tutorialScreen.classList.add('hidden');
    (0, _gameLoop.GameLoop)(_gameConfig.default).then(startGame => {
      console.log('All systems are go!');
      startGame();
    });
  });
});
/*features:
- walk up to a plant to grow
- shadows undercharacters
- 
*/

/* 
    GAME IDEA:
    - player starts with planting plants
    - spiders are coming towards your plants and want to eat them
    - protect plants against spiders by shooting them
    - plants grow every round
    - spider touching a plant will cause the plant losing one growth cycle thus becoming smaller
    - there will be more spiders and they will be faster or smaller each round (making them harder to hit)
    - each spider picks one of the plants to attack at the beginning of his journey
    - you get points subtracted every time you miss a shot
    - collect plants at the end after 4 rounds, your score depends on how much of your plants is left
    - best achievable score is when all plants are fully grown after 4 rounds and you have missed no shots
*/
},{"./gameLoop":"src/gameLoop.js","/static/manifests/gameConfig.json":"static/manifests/gameConfig.json","./styles/style.scss":"src/styles/style.scss"}],"../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52123" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map
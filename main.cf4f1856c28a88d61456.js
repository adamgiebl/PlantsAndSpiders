!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=6)}([function(t){t.exports=JSON.parse('{"name":"Plants and Spiders","timing":{"showSeeds":7,"startLights":2,"delayBetweenLights":1},"levels":[{"id":0,"numberOfSpiders":10},{"id":1,"numberOfSpiders":15},{"id":2,"numberOfSpiders":20},{"id":3,"numberOfSpiders":25}]}')},function(t,e,i){var n=i(2);"string"==typeof n&&(n=[[t.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};i(4)(n,s);n.locals&&(t.exports=n.locals)},function(t,e,i){(t.exports=i(3)(!1)).push([t.i,"* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    user-select: none;\r\n}\r\ncanvas {\r\n    width: 100vw;\r\n    height: 100vh;\r\n}\r\nhtml {\r\n    height: 100%;\r\n}\r\nbody {\r\n    overflow: hidden;\r\n    height: 100%;\r\n}\r\n.seedButton {\r\n    position: absolute;\r\n    cursor: pointer;\r\n    display: none;\r\n    transition: transform 0.3s;\r\n}\r\n.active {\r\n    display: block;\r\n    animation: jumpOut 0.3s ease-out;\r\n    \r\n}\r\n.seedButton__image {\r\n    position: relative;\r\n    width: 80px;\r\n    height: 90px;\r\n    background-image: url(\"https://adamgiebl.github.io/PlantsAndSpiders/images/Seed.svg\");\r\n    background-size: contain;\r\n    background-repeat: no-repeat;\r\n    animation: float 0.6s infinite alternate ease-in-out;\r\n    animation-delay: 0.3s;\r\n    \r\n}\r\n.seedButton:hover {\r\n    transform: translateY(-10px);\r\n}\r\n.seedButton:hover .seedButton__image {\r\n    animation-play-state: paused;\r\n}\r\n@keyframes float {\r\n    from {\r\n        transform: translateY(0px);\r\n    }\r\n    to {\r\n        transform: translateY(-10px);\r\n    }\r\n}\r\n@keyframes jumpOut {\r\n    0% {\r\n        transform: translateY(50px) scale(0.5);\r\n    }\r\n    100% {\r\n        transform: translateY(0px) scale(1);\r\n    }\r\n}\r\n#overlay {\r\n    position: absolute;\r\n}\r\n#gameOverScreen {\r\n    position: absolute;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background: black;\r\n    z-index: 1;\r\n    display: grid;\r\n    place-items: center;\r\n    place-content: center;\r\n    color: white\r\n}\r\nbody .hidden {\r\n    display: none !important;\r\n}\r\n\r\n.mute-button {\r\n    position: absolute;\r\n    padding: 10px 15px;\r\n    background: transparent;\r\n    border: 2px solid white;\r\n    color: white;\r\n    left: 20px;\r\n    top: 20px;\r\n    cursor: pointer;\r\n}\r\n.mute-button.mute {\r\n    border: 2px solid red;\r\n}\r\n\r\n.level-display {\r\n    position: absolute;\r\n    padding: 10px 15px;\r\n    background: transparent;\r\n    border: 2px solid white;\r\n    color: white;\r\n    left: 100px;\r\n    top: 20px;\r\n}\r\n\r\n#loadingScreen {\r\n    position: absolute;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background: black;\r\n    z-index: 2;\r\n    display: grid;\r\n    place-items: center;\r\n    place-content: center;\r\n    color: white\r\n}\r\n#loadingScreen svg {\r\n    width: 7vw;\r\n    fill:none;\r\n    stroke:#27A102;\r\n    stroke-dasharray: 400;\r\n    animation: dash 3s linear infinite;\r\n}\r\n@keyframes dash {\r\nto {\r\n    stroke-dashoffset: 800;\r\n}\r\n}\r\n\r\n#titleScreen {\r\n    position: absolute;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background: black;\r\n    z-index: 2;\r\n    display: grid;\r\n    place-items: center;\r\n    place-content: center;\r\n    color: white;\r\n}\r\n\r\n#titleScreen .background{\r\n    position: absolute;\r\n    background-image: url('https://adamgiebl.github.io/PlantsAndSpiders/images/title-background.png');\r\n    background-size: 100% 100%;\r\n    filter: brightness(0.2) blur(6px);\r\n    background-repeat: no-repeat;\r\n    z-index: -1;\r\n    width: 100vw;\r\n    height: 100vh;\r\n}\r\n\r\n#titleScreen img {\r\n    width: 40vw;\r\n}\r\n\r\n#titleScreen .continue-button {\r\n    border: none;\r\n    border-top: 2px solid white;\r\n    border-bottom: 2px solid white;\r\n    color: white;\r\n    padding: 10px 40px;\r\n    margin-top: 150px;\r\n    font-size: 20px;\r\n    background: transparent;\r\n}",""])},function(t,e,i){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=function(t,e){var i=t[1]||"",n=t[3];if(!n)return i;if(e&&"function"==typeof btoa){var s=(a=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),r=n.sources.map((function(t){return"/*# sourceURL="+n.sourceRoot+t+" */"}));return[i].concat(r).concat([s]).join("\n")}var a;return[i].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i})).join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},s=0;s<this.length;s++){var r=this[s][0];null!=r&&(n[r]=!0)}for(s=0;s<t.length;s++){var a=t[s];null!=a[0]&&n[a[0]]||(i&&!a[2]?a[2]=i:i&&(a[2]="("+a[2]+") and ("+i+")"),e.push(a))}},e}},function(t,e,i){var n,s,r={},a=(n=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===s&&(s=n.apply(this,arguments)),s}),o=function(t,e){return e?e.querySelector(t):document.querySelector(t)},h=function(t){var e={};return function(t,i){if("function"==typeof t)return t();if(void 0===e[t]){var n=o.call(this,t,i);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),d=null,l=0,c=[],u=i(5);function p(t,e){for(var i=0;i<t.length;i++){var n=t[i],s=r[n.id];if(s){s.refs++;for(var a=0;a<s.parts.length;a++)s.parts[a](n.parts[a]);for(;a<n.parts.length;a++)s.parts.push(v(n.parts[a],e))}else{var o=[];for(a=0;a<n.parts.length;a++)o.push(v(n.parts[a],e));r[n.id]={id:n.id,refs:1,parts:o}}}}function g(t,e){for(var i=[],n={},s=0;s<t.length;s++){var r=t[s],a=e.base?r[0]+e.base:r[0],o={css:r[1],media:r[2],sourceMap:r[3]};n[a]?n[a].parts.push(o):i.push(n[a]={id:a,parts:[o]})}return i}function m(t,e){var i=h(t.insertInto);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=c[c.length-1];if("top"===t.insertAt)n?n.nextSibling?i.insertBefore(e,n.nextSibling):i.appendChild(e):i.insertBefore(e,i.firstChild),c.push(e);else if("bottom"===t.insertAt)i.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var s=h(t.insertAt.before,i);i.insertBefore(e,s)}}function f(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function w(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var n=function(){0;return i.nc}();n&&(t.attrs.nonce=n)}return y(e,t.attrs),m(t,e),e}function y(t,e){Object.keys(e).forEach((function(i){t.setAttribute(i,e[i])}))}function v(t,e){var i,n,s,r;if(e.transform&&t.css){if(!(r="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=r}if(e.singleton){var a=l++;i=d||(d=w(e)),n=S.bind(null,i,a,!1),s=S.bind(null,i,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(e,t.attrs),m(t,e),e}(e),n=A.bind(null,i,e),s=function(){f(i),i.href&&URL.revokeObjectURL(i.href)}):(i=w(e),n=B.bind(null,i),s=function(){f(i)});return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else s()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var i=g(t,e);return p(i,e),function(t){for(var n=[],s=0;s<i.length;s++){var a=i[s];(o=r[a.id]).refs--,n.push(o)}t&&p(g(t,e),e);for(s=0;s<n.length;s++){var o;if(0===(o=n[s]).refs){for(var h=0;h<o.parts.length;h++)o.parts[h]();delete r[o.id]}}}};var x,b=(x=[],function(t,e){return x[t]=e,x.filter(Boolean).join("\n")});function S(t,e,i,n){var s=i?"":n.css;if(t.styleSheet)t.styleSheet.cssText=b(e,s);else{var r=document.createTextNode(s),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}function B(t,e){var i=e.css,n=e.media;if(n&&t.setAttribute("media",n),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}function A(t,e,i){var n=i.css,s=i.sourceMap,r=void 0===e.convertToAbsoluteUrls&&s;(e.convertToAbsoluteUrls||r)&&(n=u(n)),s&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");var a=new Blob([n],{type:"text/css"}),o=t.href;t.href=URL.createObjectURL(a),o&&URL.revokeObjectURL(o)}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var i=e.protocol+"//"+e.host,n=i+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,e){var s,r=e.trim().replace(/^"(.*)"$/,(function(t,e){return e})).replace(/^'(.*)'$/,(function(t,e){return e}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(s=0===r.indexOf("//")?r:0===r.indexOf("/")?i+r:n+r.replace(/^\.\//,""),"url("+JSON.stringify(s)+")")}))}},function(t,e,i){"use strict";i.r(e);const n=document.querySelector("canvas"),s=n.getContext("2d");n.width=innerWidth,n.height=innerHeight;const r=document.createElement("canvas"),a=r.getContext("2d");r.width=innerWidth,r.height=innerHeight;let o=n.height-15;n.width,n.height;window.addEventListener("resize",()=>{n.width=innerWidth,n.height=innerHeight,r.width=innerWidth,r.height=innerHeight,o=n.height-15});class h{constructor(){this.keyStates=new Map,this.keyMap=new Map}addMapping(t,e){this.keyMap.set(t,e)}handleEvent(t){const{code:e}=t;if(!this.keyMap.has(e))return;t.preventDefault();const i="keydown"===t.type;this.keyStates.get(e)!==i&&(this.keyStates.set(e,i),this.keyMap.get(e)(i))}listenTo(t){["keydown","keyup"].forEach(e=>{t.addEventListener(e,t=>{this.handleEvent(t)})})}}var d=i.p+"33df3f0790cee72bb6d12c5d2a1240b9.mp3",l=i.p+"930b82081238d08754da34145e2e3e11.mp3",c=i.p+"aa23f122d6523a5a8e8979ea2446eae1.mp3",u=i.p+"14eaac23ec191904c72b6844b3082658.mp3";const p=new class{constructor(){this.audioContext=new AudioContext,this.audioBuffers=new Map,this.muted=!1,this.gainNode=this.audioContext.createGain()}loadAudio(t){return fetch(t).then(t=>t.arrayBuffer()).then(t=>this.audioContext.decodeAudioData(t))}addAudio(t,e){this.audioBuffers.set(t,e)}playAudio(t){const e=this.audioContext.createBufferSource();e.connect(this.gainNode),this.gainNode.connect(this.audioContext.destination),e.buffer=this.audioBuffers.get(t),e.start(0)}toggleMuteAudio(){console.log("muting"),this.muted?(this.muted=!1,this.gainNode.gain.value=1):(this.muted=!0,this.gainNode.gain.value=0)}async loadAllSounds(){await Promise.all([p.loadAudio(d),p.loadAudio(l),p.loadAudio(c),p.loadAudio(u)]).then(([t,e,i,n])=>{p.addAudio("gunshot",t),p.addAudio("splash",e),p.addAudio("glass",i),p.addAudio("music",n)})}};function g(t){return new Promise(e=>{const i=new Image;i.addEventListener("load",()=>{e(i)}),i.src=t})}function m(t){return fetch(`manifests/${t}.json`).then(t=>t.json())}class f{constructor(t){this.manifest=t,this.direction={left:!1,right:!1,jumping:!1},this.isOnGround=!0,this.deltaX=0,this.deltaY=0,this.angle=0,this.velocityX=6,this.velocityY=0,this.gravity=.6,this.flip=!1,this.shot=!1,this.distance=0,this.ready=!1,this.lowerBody={...this.manifest.lowerBody,runningAnimation:this.manifest.animations.get("running"),jumpingAnimation:this.manifest.animations.get("jumping")},this.upperBody={...this.manifest.upperBody,x:this.x-30,y:this.y-this.lowerBody.height+70},this.x=0,this.y=n.height-15-this.lowerBody.height+5,this.flashAnimation={active:!1,duration:3,frame:0,image:this.manifest.flashImage},this.shootingAnimation={active:!1,duration:4,frame:0,size:5}}draw(t){this.upperBody={...this.upperBody,rotationPoint:{x:this.x+this.lowerBody.width/2,y:this.y+25},x:this.x-25,y:this.y-this.lowerBody.height+(this.flip?160:100)},t.strokeStyle="red",this.getFrame(t,"walk-"+Math.floor(this.distance/20)%this.lowerBody.runningAnimation.size),t.translate(this.upperBody.rotationPoint.x,this.upperBody.rotationPoint.y),t.rotate(this.angle),t.translate(-this.upperBody.rotationPoint.x,-this.upperBody.rotationPoint.y),t.strokeStyle="limegreen",this.runShootingAnimation(),t.drawImage(this.flip?this.upperBody.imageFlipped:this.upperBody.image,this.upperBody.x,this.upperBody.y,this.upperBody.width,this.upperBody.height),t.setTransform(1,0,0,1,0,0),t.fillStyle="blue"}move(){this.velocityY+=this.gravity,this.y+=this.velocityY,this.y+this.lowerBody.height>=o&&(this.y=o-this.lowerBody.height,this.isOnGround=!0,this.velocityY=0),this.direction.left?this.x>0&&(this.x-=this.velocityX,this.distance+=this.velocityX):this.direction.right?this.x<n.width-this.upperBody.width&&(this.x+=this.velocityX,this.distance+=this.velocityX):this.ready&&(this.distance=0),this.direction.jumping&&this.isOnGround&&(this.velocityY=-12,this.isOnGround=!1)}getFrame(t,e){if(this.isOnGround){const i=this.lowerBody.runningAnimation.get(e);t.drawImage(this.lowerBody.spriteSheet,i.x,this.flip?i.y+i.height:i.y,i.width,i.height,this.x,this.y,this.lowerBody.width,this.lowerBody.height)}else{const e=this.lowerBody.jumpingAnimation.get("jump-0");t.drawImage(this.lowerBody.spriteSheet,e.x,this.flip?e.y+e.height:e.y,e.width,e.height,this.x,this.y,this.lowerBody.width,this.lowerBody.height)}}drawFlash(t){1==this.flashAnimation.active&&(this.flashAnimation.frame>=this.flashAnimation.duration?(this.flashAnimation.frame=0,this.flashAnimation.active=!1):(this.flashAnimation.frame++,t.fillStyle="rgba(249, 191, 0, 0.1)",t.fillRect(0,0,n.width,n.height),t.translate(this.upperBody.rotationPoint.x,this.upperBody.rotationPoint.y),t.rotate(this.angle),t.translate(-this.upperBody.rotationPoint.x,-this.upperBody.rotationPoint.y),t.strokeStyle="limegreen",t.drawImage(this.flashAnimation.image,this.upperBody.x+this.upperBody.width,this.upperBody.y+(this.flip?0:100),this.upperBody.width,this.upperBody.height/2),t.setTransform(1,0,0,1,0,0)))}runShootingAnimation(){this.shootingAnimation.active&&(this.shootingAnimation.frame>=this.shootingAnimation.duration?(this.shootingAnimation.frame=0,this.shootingAnimation.active=!1):(this.shootingAnimation.frame++,this.upperBody.x=this.upperBody.x-this.shootingAnimation.size*this.shootingAnimation.frame))}rotate(t,e){const i=this.x+this.upperBody.width/2-t,n=this.y+this.upperBody.height/2-e;this.angle=Math.atan2(n,i)+Math.PI,this.angle>1.5&&this.angle<4.7?this.flip=!0:this.flip=!1}onClick(){p.playAudio("gunshot"),this.flashAnimation.active=!0,this.shootingAnimation.active=!0}epicEntrance(){return new Promise((t,e)=>{this.x=-this.upperBody.width;const i=setInterval(()=>{var e;this.x<n.width/7?(this.x+=1,this.distance+=2):(clearInterval(i),(t=>{const e=new h;e.addMapping("KeyD",e=>{t.direction.right=e}),e.addMapping("KeyA",e=>{t.direction.left=e}),e.addMapping("Space",e=>{t.direction.jumping=e}),e.listenTo(window)})(this),e=this,n.addEventListener("mousemove",({clientX:t,clientY:i})=>{e.rotate(t,i)}),n.addEventListener("click",t=>{e.onClick()}),this.ready=!0,t())},10)})}}const w=async()=>{const t=await m("character");return t.lowerBody={...t.lowerBody,spriteSheet:await g(t.lowerBody.spriteSheetURL)},t.upperBody={...t.upperBody,image:await g(t.upperBody.imageURL),imageFlipped:await g(t.upperBody.flippedImageURL)},t.flashImage=await g(t.flashImageURL),t.animations=function(t){const e=new Map;return t.forEach(t=>{const i=new Map;t.frames.forEach(t=>{i.set(t.name,t.rect)}),e.set(t.name,i)}),e}(t.animationsToBeLoaded),new f(t)};class y{constructor(t){this.manifest=t}draw(t){t.drawImage(this.manifest.image,0,0,n.width,n.height)}}function v(t,e){return Math.floor(Math.random()*(e-t+1)+t)}class x{constructor(t){const{destination:e,position:i,width:n,height:s}=t;this.manifest=t,this.height=n,this.width=s,this.x=i.x,this.y=i.y,this.isShot=!1,this.hasKilledAPlant=!1,this.killer={},this.deltaX=e.x-this.x,this.deltaY=e.y-this.y,this.angle=Math.atan2(this.deltaY,this.deltaX),this.splashAngle=0,this.velocityX=1*Math.cos(this.angle),this.velocityY=1*Math.sin(this.angle),this.direction=this.angle-Math.PI/2,this.distance=0}draw(t){this.isShot||this.hasKilledAPlant?this.hasKilledAPlant||(t.translate(this.x+this.width/2,this.y+this.height/2),t.rotate(-this.splashAngle+Math.PI),t.translate(-this.x-this.width/2,-this.y-this.height/2),t.drawImage(this.manifest.splashImage,this.x-10,this.y-this.height,this.width+20,2*this.height),t.setTransform(1,0,0,1,0,0)):(this.distance+=2,t.translate(this.x+this.width/2,this.y+this.height/2),t.rotate(this.direction),t.translate(-this.x-this.width/2,-this.y-this.height/2),this.getFrame(t,"spider-"+Math.floor(this.distance/20)%this.manifest.spriteMap.size),t.setTransform(1,0,0,1,0,0),this.checkCollision())}checkCollision(){this.manifest.plants.forEach(t=>{t.plantBoundingRect.x<this.x+this.width&&t.plantBoundingRect.x+t.plantBoundingRect.width>this.x&&t.plantBoundingRect.y<this.y+this.height&&t.plantBoundingRect.y+t.plantBoundingRect.height>this.y&&(t.shrink(),this.hasKilledAPlant=!0,window.game.state.spidersKilled+=1,window.game.state.spidersKilled===window.game.config.levels[window.game.state.level].numberOfSpiders&&window.game.state.level++)})}getFrame(t,e){const i=this.manifest.spriteMap.get(e);i&&t.drawImage(this.manifest.image,i.x,i.y,i.width,i.height,this.x+=1*this.velocityX,this.y+=1*this.velocityY,this.width,this.height)}onClick(){window.game.state.spidersKilled+=1,p.playAudio("splash"),this.isShot=!0,this.killer={x:this.manifest.character.upperBody.x,y:this.manifest.character.upperBody.y};const t=this.x-(this.killer.x+this.manifest.character.upperBody.width/2),e=this.y-(this.killer.y+100);this.splashAngle=Math.atan2(t,e),window.game.state.spidersKilled===window.game.config.levels[window.game.state.level].numberOfSpiders&&window.game.state.level++}}class b{constructor(t){this.manifest=t}createSpiders(t,e,i){this.manifest.character=e,this.manifest.plants=i;let s=[];for(let e=0;e<t;e++){this.manifest.position={x:v(-200,n.width+200),y:v(-200,0)};const t=v(25,80);this.manifest.width=t,this.manifest.height=t;const e=i[v(0,i.length-1)];this.manifest.destination={x:e.x+e.width/2,y:e.y},s.push(new x(this.manifest))}return s}}document.querySelector("#overlay");const S=t=>{document.querySelectorAll(".seedButton").forEach(e=>{e.addEventListener("click",({target:e})=>{t[e.dataset.id].plantSeed()})}),document.querySelector("#mute-button").addEventListener("click",(function(){this.classList.toggle("mute"),p.toggleMuteAudio()}))};class B{constructor(t){this.manifest=t}createPlants(t){const{width:e,height:i,image:s,loadedPlantImages:r,potMargin:a,plantSizes:h}=this.manifest,d=[],l=e*t+a*(t-1),c=(n.width-l)/2;for(let n=0;n<t;n++)d.push(new A(c+(e+(n===t?0:a))*n,o-i,h,s,r,n));return S(d),d}}class A{constructor(t,e,i,n,s,r){this.id=r,this.x=t,this.y=e-15,this.size=0,this.plantSizes=i,this.planted=!1,this.showSeed=!0,this.plantImages=s,this.width=170,this.height=120,this.potCenter={x:this.x+this.width/2,y:this.y+this.height/2},this.image=n,this.timeToShowSeedButton=1,this.activePlant=i[this.size],this.activePlantImage=s[this.size],this.plantBoundingRect={x:this.potCenter.x-this.activePlant.width/2,y:this.y-this.activePlant.height,width:this.activePlant.width,height:this.activePlant.height},this.createSeedButton()}draw(t){t.drawImage(this.image,this.x,this.y,this.width,this.height),this.planted&&t.drawImage(this.activePlantImage,this.plantBoundingRect.x,this.plantBoundingRect.y,this.plantBoundingRect.width,this.plantBoundingRect.height)}grow(){this.size<this.plantImages.length-1&&this.planted&&(this.size++,this.activePlant=this.plantSizes[this.size],this.activePlantImage=this.plantImages[this.size],this.plantBoundingRect={x:this.potCenter.x-this.activePlant.width/2,y:this.y-this.activePlant.height,width:this.activePlant.width,height:this.activePlant.height})}shrink(){this.size>0&&this.planted?(this.size--,this.activePlant=this.plantSizes[this.size],this.activePlantImage=this.plantImages[this.size],this.plantBoundingRect={x:this.potCenter.x-this.activePlant.width/2,y:this.y-this.activePlant.height,width:this.activePlant.width,height:this.activePlant.height}):(this.size=-1,this.planted=!1)}onClick(){this.grow()}plantSeed(){window.game.state.seedsPlanted+=1,this.planted=!0,document.querySelector(`.seedButton[data-id="${this.id}"]`).outerHTML=""}showSeedButton(){document.querySelector(`.seedButton[data-id="${this.id}"]`).classList.add("active")}createSeedButton(){overlay.innerHTML+=`\n        <div \n            class="seedButton"\n            data-id="${this.id}"\n            style="left: ${this.potCenter.x-40}px; top: ${this.potCenter.y-160}px;" \n        >\n            <div class="seedButton__image" data-id="${this.id}">\n            </div>\n        </div>\n        `}}class k{constructor(t,e,i,n,s,r,a,o,h,d){this.id=t,this.width=n,this.height=s,this.x=e,this.y=i,this.lampCenter={x:this.x+this.width/2,y:this.y+this.height/2},this.turnedOn=!1,this.color=a,this.lightWidth=o,this.image=r,this.offset=10,this.isShot=!1,this.perspective=40,this.turnOn=h,this.numberOfLights=d}drawLight(t){this.turnedOn&&(t.beginPath(),t.moveTo(this.x+this.offset,this.y+this.height),0==this.id?(t.lineTo(this.x-this.lightWidth,n.height-65),t.lineTo(this.x-this.lightWidth-this.perspective,n.height)):t.lineTo(this.x-this.lightWidth,n.height),this.id==this.numberOfLights-1?(t.lineTo(this.x+ +this.width+this.lightWidth+this.perspective,n.height),t.lineTo(this.x+this.width+this.lightWidth,n.height-65)):t.lineTo(this.x+this.width+this.lightWidth,n.height),t.lineTo(this.x+this.width-this.offset,this.y+this.height),t.closePath(),t.fillStyle=this.color,t.fill())}drawBody(t){t.drawImage(this.image,this.x,this.y,this.width,this.height)}draw(t){this.drawBody(t),this.drawLight(a)}onClick(){this.isShot||p.playAudio("glass"),this.isShot=!0}}class L{constructor(t){this.manifest=t}createLights(t,e){const{width:i,height:s,image:r,color:a,lightWidth:o,lightMargin:h}=this.manifest,d=[],l=i*t+h*(t-1),c=(n.width-l)/2;for(let n=0;n<t;n++){const l=new k(n,c+(i+(n===t?0:h))*n,0,i,s,r,a,o,n+e,t);d.push(l)}return d}}class P{constructor(){this.startTime=0,this.timeElapsed=0}start(){this.startTime=new Date}logTimeElapsed(){let t=(new Date-this.startTime)/1e3,e=Math.round(t);this.timeElapsed!=e&&(this.timeElapsed=e)}getTimeElapsed(){return this.timeElapsed}}const I=async t=>{window.game={config:t,state:{seedsPlanted:0,seedsShown:!1,spidersKilled:0,level:-1,currentLevel:-1,gameOver:!1,levelUpdated:!1}};const e=new P,i=await w(),o=await(async()=>{const t=await m("scene");return t.image=await g(t.mainImageURL),new y(t)})(),h=await(async()=>{const t=await m("plant");return t.image=await g(t.mainImageURL),t.loadedPlantImages=[],Promise.all([g(t.plantImages[0]),g(t.plantImages[1]),g(t.plantImages[2]),g(t.plantImages[3])]).then(async e=>{t.loadedPlantImages=await e}),new B(t)})(),d=await(async()=>{const t=await m("light");return t.image=await g(t.mainImageURL),new L(t)})(),l=await(async()=>{const t=await m("spider");t.image=await g(t.mainImageURL),t.splashImage=await g(t.splashImageURL);const e=new Map;return t.frames.forEach(t=>{e.set(t.name,t.rect)}),t.spriteMap=e,new b(t)})();await p.loadAllSounds(),p.playAudio("music");const c=h.createPlants(3),u=d.createLights(3,t.timing.startLights);let f=[];i.epicEntrance().then(()=>{}),n.addEventListener("click",t=>{(({clientX:t,clientY:e},i,n)=>{n(i.find(i=>!i.isShot&&t>i.x&&t<i.x+i.width&&e>i.y&&e<i.y+i.height))})(t,[...u,...f,...c],t=>{t&&t.onClick()})});const v=()=>{window.game.state.currentLevel=window.game.state.level,window.game.state.levelUpdated=!1,window.game.state.spidersKilled=0,f=[]};e.start(),document.querySelector("#loadingScreen").classList.add("hidden");const x=()=>{s.globalCompositeOperation="normal",o.draw(s),i.move(),f.forEach(t=>{t.draw(s)}),window.game.state.levelUpdated||(window.game.state.levelUpdated=!0,document.querySelector("#level").innerHTML=window.game.state.currentLevel),t.timing.showSeeds==e.getTimeElapsed()&&(window.game.state.level=0),0===window.game.state.level&&window.game.state.currentLevel!==window.game.state.level?(window.game.state.seedsPlanted==c.length&&0==f.length&&(f=l.createSpiders(window.game.config.levels[0].numberOfSpiders,i,c)),window.game.state.seedsShown||(window.game.state.seedsShown=!0,c.forEach(t=>{t.showSeed&&(t.showSeedButton(),t.showSeed=!1)}))):1===window.game.state.level&&window.game.state.currentLevel!==window.game.state.level?(v(),c.forEach(t=>{t.grow()}),f=l.createSpiders(window.game.config.levels[1].numberOfSpiders,i,c)):2===window.game.state.level&&window.game.state.currentLevel!==window.game.state.level?(v(),c.forEach(t=>{t.grow()}),f=l.createSpiders(window.game.config.levels[2].numberOfSpiders,i,c)):3===window.game.state.level&&window.game.state.currentLevel!==window.game.state.level?(v(),c.forEach(t=>{t.grow()}),f=l.createSpiders(window.game.config.levels[3].numberOfSpiders,i,c)):4===window.game.state.level&&window.game.state.currentLevel!==window.game.state.level&&(v(),window.game.state.gameOver=!0),c.forEach(t=>{t.draw(s)}),i.draw(s),a.fillStyle="rgb(68, 68, 68)",a.fillRect(0,0,r.width,r.height),i.drawFlash(a),u.forEach(t=>{t.isShot?t.drawBody(s):(t.turnedOn||t.turnOn!=e.getTimeElapsed()||(t.turnedOn=!0),t.drawBody(s),t.drawLight(a))}),s.globalCompositeOperation="multiply",s.drawImage(r,0,0),e.logTimeElapsed(),window.game.state.gameOver?document.querySelector("#gameOverScreen").classList.remove("hidden"):window.requestAnimationFrame(x)};return()=>{window.requestAnimationFrame(x)}};var O=i(0);i(1);const M=document.querySelector("#titleScreen");M.addEventListener("click",()=>{M.classList.add("hidden"),I(O).then(t=>{console.log("All systems are go!"),t()})})}]);
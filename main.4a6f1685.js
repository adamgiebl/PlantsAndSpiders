parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FCNh":[function(require,module,exports) {
module.exports={name:"Plants and Spiders",settings:{plants:{numberOfPots:3},lights:{numberOfLights:3},spiders:{EASY:{speed:.7},NORMAL:{speed:1.1},HARD:{speed:1.5}}},timing:{showSeeds:5,startLights:2,delayBetweenLights:1},levels:{EASY:[{numberOfSpiders:7},{numberOfSpiders:12},{numberOfSpiders:17},{numberOfSpiders:20}],NORMAL:[{numberOfSpiders:15},{numberOfSpiders:20},{numberOfSpiders:22},{numberOfSpiders:25}],HARD:[{numberOfSpiders:20},{numberOfSpiders:25},{numberOfSpiders:30},{numberOfSpiders:35}]}};
},{}],"qN5A":[function(require,module,exports) {

},{"C:\\Users\\adamg\\Projects\\plants\\static\\images\\Seed.svg":[["Seed.c437c8b3.svg","qUKa"],"qUKa"],"C:\\Users\\adamg\\Projects\\plants\\static\\images\\title-background.png":[["title-background.6090d9fc.png","Ac8Q"],"Ac8Q"],"C:\\Users\\adamg\\Projects\\plants\\static\\images\\button.svg":[["button.fa43d100.svg","XkrJ"],"XkrJ"],"C:\\Users\\adamg\\Projects\\plants\\static\\images\\multiplier.svg":[["multiplier.e2b822be.svg","lSn0"],"lSn0"],"C:\\Users\\adamg\\Projects\\plants\\static\\images\\constbgs.jpg":[["constbgs.db5f2dc4.jpg","NnAs"],"NnAs"]}],"HJDO":[function(require,module,exports) {
"use strict";var e=t(require("/static/manifests/gameConfig.json"));function t(e){return e&&e.__esModule?e:{default:e}}require("./styles/style.scss"),console.log("Nothing to see here");const s=document.querySelector("#titleScreen"),n=document.querySelector("#tutorialScreen");s.addEventListener("click",()=>{s.classList.add("hidden"),n.addEventListener("click",()=>{n.classList.add("hidden"),GameLoop(e.default).then(e=>{console.log("All systems are go!"),e()})})});
},{"/static/manifests/gameConfig.json":"FCNh","./styles/style.scss":"qN5A"}]},{},["HJDO"], null)
//# sourceMappingURL=main.4a6f1685.js.map
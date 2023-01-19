'use strict';


// const dataset = [
// 	"if\neach member of your team had a personal data analyst",
// 	"having an Alexa that could handle your data tasks",
// 	"having your data requests answered in seconds, not hours or days",
// 	"if your data team could focus on intelligent tasks instead of routine ones",
// 	"if the “data-driven company” became more than just a phrase",
// 	"having these things set up for free in days"
// ];

// var i = 0;
//  /* The text */
// var speed = 50; /* The speed/duration of the effect in milliseconds */
// let element = document.querySelector('.typed');
// var j = 0;
// let currentPos = 0;
// let currentLineIndex = 0;
// let currentLine = dataset[currentLineIndex];
// let currentLength = dataset[currentLineIndex].length;
// let isBusy = false;

// function typeLine() {
//   if (i < currentLength) {
//     isBusy = true;
//     element.innerHTML += (currentLine.charAt(i) == '\n' ? '<br/>' : currentLine.charAt(i));
//     i++;
//     setTimeout(typeLine, speed);
//   } else {
//     isBusy = false;
//     clearTimeout(typeLine, speed);
//   }
// }

// function deleteLine() {
//   if (i < currentLength) {
//     isBusy = true;
//     element.innerHTML += (currentLine.charAt(i) == '\n' ? '<br/>' : currentLine.charAt(i));
//     i++;
//     setTimeout(typeLine, speed);
//   } else {
//     isBusy = false;
//     clearTimeout(typeLine, speed);
//   }
// }

// function typeDataset() {
//   if (isBusy) {
//     return;
//   }
//   i = 0;
//   currentLineIndex++;
//   currentLine = dataset[currentLineIndex];
//   typeLine(currentLine);
// }

// setInterval(typeDataset, 1000);

const datasetWords = [
	"if each member of your team had a personal data analyst",
	"having an Alexa that could handle your data tasks",
	"having your data requests answered in seconds, not hours or days",
	"if your data team could focus on intelligent tasks instead of routine ones",
	"if the “data-driven company” became more than just a phrase",
	"having these things set up for free in days"
];


var Typer = function(element) {
    this.element = element;
    var delim = element.dataset.delim || ";";
    var words = element.dataset.words || "if each member of your team had a personal data analyst;having your data requests answered in seconds, not hours or days;having an Alexa that could handle your data tasks";
    // this.words = words.split(delim).filter((v) => v); // non empty words
	this.words = datasetWords;
    this.delay = element.dataset.delay || 200;
    this.loop = element.dataset.loop || "true";
    if (this.loop === "false" ) { this.loop = 1 }
    this.deleteDelay = element.dataset.deletedelay || element.dataset.deleteDelay || 800;

    this.progress = { word: 0, char: 0, building: true, looped: 0 };
    this.typing = true;
  
    var colors = element.dataset.colors || "black";
    this.colors = colors.split(",");
    this.element.style.color = this.colors[0];
    this.colorIndex = 0;
  
    this.doTyping();
  };
  
  Typer.prototype.start = function() {
    if (!this.typing) {
      this.typing = true;
      this.doTyping();
    }
  };
  Typer.prototype.stop = function() {
    this.typing = false;
  };
  Typer.prototype.doTyping = function() {
    var e = this.element;
    var p = this.progress;
    var w = p.word;
    var c = p.char;
    var currentDisplay = [...this.words[w]].slice(0, c).join("");
    var atWordEnd;
    

    if (this.cursor) {
      this.cursor.element.style.opacity = "1";
      this.cursor.on = true;
      clearInterval(this.cursor.interval);
      this.cursor.interval = setInterval(() => this.cursor.updateBlinkState(), 400);
    }
  
    e.innerHTML = currentDisplay;
  
    if (p.building) {
      atWordEnd = p.char === this.words[w].length;
      if (atWordEnd) {
        p.building = false;
      } else {
        p.char += 1;
      }
    } else {
      if (p.char === 0) {
        p.building = true;
        p.word = (p.word + 1) % this.words.length;
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
        this.element.style.color = this.colors[this.colorIndex];
      } else {
        p.char -= 1;
      }
    }
  
    if (p.word === this.words.length - 1) {
      p.looped += 1;
    }
  
    if (!p.building && this.loop <= p.looped){
      this.typing = false;
    }
  
    setTimeout(() => {
      if (this.typing) { this.doTyping() };
    }, atWordEnd ? this.deleteDelay : this.delay);
  };
  
  var Cursor = function(element) {
    this.element = element;
    this.cursorDisplay = element.dataset.cursordisplay || element.dataset.cursorDisplay || "|";
    element.innerHTML = this.cursorDisplay;
    this.on = true;
    element.style.transition = "all 0.1s";
    this.interval = setInterval(() => this.updateBlinkState(), 400);
  }
  Cursor.prototype.updateBlinkState = function() {
    if (this.on) {
      this.element.style.opacity = "0";
      this.on = false;
    } else {
      this.element.style.opacity = "1";
      this.on = true;
    }
  }
  
  function TyperSetup() {
    var typers = {};
    
    for (let e of document.getElementsByClassName("typer")) {
      typers[e.id] = new Typer(e);
    }
    for (let e of document.getElementsByClassName("typer-stop")) {
      let owner = typers[e.dataset.owner];
      e.onclick = () => owner.stop();
    }
    for (let e of document.getElementsByClassName("typer-start")) {
      let owner = typers[e.dataset.owner];
      e.onclick = () => owner.start();
    }
    for (let e of document.getElementsByClassName("cursor")) {
      let t = new Cursor(e);
      // t.owner = typers[e.dataset.owner];
      t.owner = typers[e.id];
      t.owner.cursor = t;
    }
  }
  
  TyperSetup();
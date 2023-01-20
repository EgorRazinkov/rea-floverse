'use strict';


const dataset = [
	"if each member of your team had a personal data analyst",
	"having an Alexa that could handle your data tasks",
	"having your data requests answered in seconds, not hours or days",
	"if your data team could focus on intelligent tasks instead of routine ones",
	"if the “data-driven company”became more than just a phrase",
	"having these things set up for free in days"
];

let element = document.querySelector('.typed');

let speed = element.getAttribute('speed') || 100;
let pause = element.getAttribute('pause') || 1000;

let currentPos = 0;
let currentLineIndex = 0;
let currentLine = dataset[currentLineIndex];
let currentLength = dataset[currentLineIndex].length;
let isType = false;
let isDelete = false;
let isRun = true;

function typeLine() {
  if (currentPos < currentLength) {
    element.innerHTML += (currentLine.charAt(currentPos) == '\n' ? '<br/>' : currentLine.charAt(currentPos));
    currentPos++;
    setTimeout(typeLine, speed);
  } else {
    isType = false;
    clearTimeout(typeLine, speed);
  }
}

function deleteLine() {
  if (currentPos > 0) {
    let tmp = element.innerHTML;
    element.innerHTML = tmp.substring(0, --currentPos);
    setTimeout(deleteLine, speed);
  } else {
    isDelete = false;
    clearTimeout(deleteLine, speed);
  }
}

function typeDataset() {
  if (isType || isDelete) {
    return;
  }
  if (currentPos == currentLength) {
    isDelete = true;
    deleteLine();
  } else {
    if(currentLineIndex == dataset.length) currentLineIndex = 0;
    isType = true;
    currentPos = 0;
    currentLine = dataset[currentLineIndex];
    currentLength = dataset[currentLineIndex].length;
    currentLineIndex++;
    typeLine();
  }
}

function type() {
  if (isType || isDelete) return;
  setTimeout(typeDataset, pause);
}

typeDataset();
setInterval(type, 0.5 * speed);




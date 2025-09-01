"use strict";

function playNote(e) {
  const key = getKey(e);
  const keyElement = document.querySelector(`div[data-key = "${key}"`);

  // if the key is exist, & not null
  if (keyElement) {
    playAudio(key);
    addPlayingClass(keyElement);
    showNote(keyElement);
  }
}

function getKey(e) {
  let key = "";
  if (e.type === "keydown") {
    key = e.keyCode;
  } else {
    key = e.target.closest(".key").dataset.key;
  }
  return key;
}

function showNote(element) {
  const note = document.querySelector(".note");
  note.textContent = element.dataset.note;
  note.style.opacity = "1";
}

function playAudio(key) {
  const audio = document.querySelector(`audio[data-key="${key}"]`);
  audio.currentTime = 0;
  audio.play();
}

function addPlayingClass(element) {
  element.classList.add("playing");
}

function removePlayingClass(element) {
  element.classList.remove("playing");
}

window.addEventListener("load", registerEvents);

function registerEvents() {
  //click with mouse
  const piano = document.querySelector(".piano");
  piano.addEventListener("click", playNote);
  //keyboard
  window.addEventListener("keydown", playNote);
  //remove playing class when transition end
  piano.addEventListener("transitionend", function (e) {
    //if the transition is on the span element, on hover, return
    if (e.target.tagName === "SPAN") {
      return;
    }
    //if the transition is when a key is active
    removePlayingClass(e.target);
  });
  //add transition delay on hover to span elements, depending on the index of the element
  const keyNames = piano.querySelectorAll("span");
  keyNames.forEach((item, index) => {
    item.style.transitionDelay = `${index * 60}ms`;
  });
}

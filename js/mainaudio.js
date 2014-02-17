var audio = null;

function announce() {
  if (audio != null) audio.pause();
  audio = new Audio("audio/attention-chime.mp3");
  audio.play();
  audio = new Audio("audio/announce.mp3");
  audio.play();
  setTimeout("departure()", 6000);
}

function departure() {
  audio = new Audio("audio/departure.mp3");
  audio.play();
  setTimeout("shushu_weak()", 5000);
}

function shushu_weak() {
  audio = new Audio("audio/shushu2_weak.mp3");
  audio.loop = true;
  audio.play();
  setTimeout("shushu()", 5000);
}

function shushu() {
  if (audio != null) audio.pause();
  audio = new Audio("audio/shushu2.mp3");
  audio.loop = true;
  audio.play();
}

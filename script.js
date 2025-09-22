/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", barfillup);
progress.addEventListener("click", scrub);
skipButtons.forEach(button => button.addEventListener("click", skip));

function togglePlay(){
	if(video.paused) video.play();
	else video.pause();
}

function updateButton() {
  const icon = video.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function barfillup(){
	let currentTime = video.currentTime;
	let duration = video.duration;
	let percentage = (currentTime/duration) * 100
	progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
  const clickX = e.offsetX;
  const totalWidth = progress.offsetWidth;
  const clickPercent = clickX / totalWidth;

  video.currentTime = clickPercent * video.duration;
}

let isMouseDown = false;

progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);
progress.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    scrub(e);
  }
});

ranges.forEach(range => {
  range.addEventListener('input', handleRangeUpdate);
});

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function skip(){
	const skipValue = parseFloat(this.dataset.skip);
	video.currentTime += skipValue;
}
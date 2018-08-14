function resizeHeaderOnScroll() {
	var distanceY = window.pageYOffset || document.documentElement.scrollTop,
	shrinkOn = 10,
	headerEl = document.querySelector('.js-header');
	
	if (distanceY > shrinkOn) {
		headerEl.classList.add("shrink");
	} else {
		headerEl.classList.remove("shrink");
	}
}

window.addEventListener('scroll', resizeHeaderOnScroll);

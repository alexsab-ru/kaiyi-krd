const hashURL = window.location.hash.substring(1);
window.location.hash = '';

if(hashURL){
	window.scrollTo(0, 0);
	setTimeout(() => {window.scrollTo(0, 0)}, 1);
	setTimeout(() => {
		scroll(hashURL)
	}, 300)
	window.location.hash = hashURL;	
}

document.querySelectorAll('a[href^="#"]:not(.popup-link)').forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		let hash = this.getAttribute("href").substring(1);
		scroll(hash);		
	});
});

function scroll(hash){
	const scrollTarget = document.getElementById(hash);
	if(scrollTarget){
		const topOffset = document.querySelector("header").offsetHeight;
		// const topOffset = 0; // если не нужен отступ сверху
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;
		window.scrollBy({
			top: offsetPosition,
			behavior: "smooth",
		});
	}
}

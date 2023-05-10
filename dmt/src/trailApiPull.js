const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=38.206591&lon=-92.416691&per_page=1000&radius=100');
xhr.setRequestHeader('X-RapidAPI-Key', 'c5657e40e6msh2b21adccd4a33fap1b4602jsnbcc74fccdc2f');
xhr.setRequestHeader('X-RapidAPI-Host', 'trailapi-trailapi.p.rapidapi.com');

xhr.send(data);
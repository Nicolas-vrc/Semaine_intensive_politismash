var audio = new Audio('marseillaise.mp3');
var slap = new Audio("slap.mp3");
// jouer la musique

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const temps = document.querySelector('.temps');
const popup = document.querySelector('#messagefin');
let lastHole;
let timeUp = false;
let score = 0;
var mich = 15;

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
// génère le temps ou la taupe sort de trou
function randompresident(){
	for(var i =0;i < moles.length;i++){

		moles[i].classList.remove("fillon1", "fillon2", "fillon3", "fillon4", "fillon5","macron1", "macron2", "macron3", "macron4", "macron5","melenchon1", "melenchon2", "melenchon3", "melenchon4", "melenchon5","hamon1", "hamon2", "hamon3", "hamon4", "hamon5","lepen1", "lepen2", "lepen3", "lepen4", "lepen5");

		var presidentlist = ["fillon1", "fillon2", "fillon3", "fillon4", "fillon5","macron1", "macron2", "macron3", "macron4", "macron5","melenchon1", "melenchon2", "melenchon3", "melenchon4", "melenchon5","hamon1", "hamon2", "hamon3", "hamon4", "hamon5","lepen1", "lepen2", "lepen3", "lepen4", "lepen5"];
		var idx = Math.floor(Math.random() * presidentlist.length);
		moles[i].classList.toggle(presidentlist[idx]);
	}
}
//choisit aléatoirement dans une liste le président qui sera affiché
function randomHole(holes) {
	const idx = Math.floor(Math.random() * holes.length);
	const hole = holes[idx];
	if (hole === lastHole) {
		return randomHole(holes);
	}
	lastHole = hole;
	return hole;
}
// sélectionne un trou aléatoire

function sortietrou() {
	const time = randomTime(500, 1500);
	const hole = randomHole(holes);
	hole.classList.add('up');
	setTimeout(() => {
		hole.classList.remove('up');
		if (!timeUp) sortietrou();
	}, time);
}
//fait sortir les personnages de trous
function startGame() {
	audio.play();
	if(!(popup.classList.contains('cache'))){
		popup.classList.add('cache');
	}
	randompresident();
	window.setInterval(function a(){
		if(mich > 0){
			mich--
			temps.textContent= mich}}, 1000);
	scoreBoard.textContent = 0;
	timeUp = false;
	score = 0;
	sortietrou();
	setTimeout(function time(){
		timeUp = true;
		popup.classList.remove('cache');
		audio.pause();
	},15000)
	var mich = 15;
}
// lance le jeu

function bonk(e) {
	slap.currentTime = 0;
	slap.play();
	score++;
	this.classList.remove('up');
	scoreBoard.textContent = score;
}
// incrémente le score au clic

moles.forEach(mole => mole.addEventListener('click', bonk));

// !!!!SLIDER
var rightArrow = document.querySelector("#rightArrow"),
	leftArrow = document.querySelector("#leftArrow"),
	slider = document.querySelector("#slider"),
	thumbnails = document.querySelectorAll("#thumbnails>img"),
	position = 0;

rightArrow.addEventListener(
	'click',
	function(){
		thumbnails[position].style.opacity=0.5;
		thumbnails[position].style.transform="translateY("+0+"px)";
		if(position<4){
			position++;
		} else{
			position = 0;
		}
		thumbnails[position].style.opacity=1;
		thumbnails[position].style.transform="translateY("+-10+"px)";
		slider.style.transform="translateX("+-(position*960)+"px)";
	},
	false
);

leftArrow.addEventListener(
	'click',
	function(){
		thumbnails[position].style.opacity=0.5;
		thumbnails[position].style.transform="translateY("+0+"px)";
		if(position>0){
			position--;
		} else{
			position = 4;
		}
		thumbnails[position].style.opacity=1;
		thumbnails[position].style.transform="translateY("+-10+"px)";
		slider.style.transform="translateX("+-(position*960)+"px)";
	},
	false
);

for(var i=0; i<5; i++){
	thumbnails[i].addEventListener(
		'click',
		function(){
			for(var i=0; i<5; i++){
				thumbnails[i].style.opacity=0.5;
				thumbnails[i].style.transform="translateY("+0+"px)";
			}
			this.style.opacity=1;
			this.style.transform="translateY("+-10+"px)";
			position = parseInt(this.getAttribute("id"));

			slider.style.transform="translateX("+-(position*960)+"px)";
		},
		false
	);
}
// !!!!!! SLIDER fin js

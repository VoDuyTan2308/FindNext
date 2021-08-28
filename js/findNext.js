var currentNum = 0;
var interval;
var currentTime = 0;
var size = 25;
var audio = new Audio('audio/titanic_bad.mp3');

$(document).ready(function(){
	$("#start").click(newGame);
	$("#stop").click(function(){
		clearInterval(interval);
		findNext();	
		audio = new Audio('audio/titanic_bad.mp3');
		audio.play();
		currentNum = size + 1;		
	});

	$("button").click(function(){
		if(this.innerHTML != "Start" && this.innerHTML !="Stop") {
			if(this.textContent !== (parseInt(currentNum) + 1).toString()){ 
				clearInterval(interval);			
		  		findNext();
		  		audio = new Audio('audio/titanic_bad.mp3');
		  		audio.play();
		  		currentNum = size + 1;
		  	}
		  	else {
			  	currentNum = this.textContent;
			  	$(this).hide();
		  	}
		  	if(currentNum == size) {
		  		clearInterval(interval);
		  		const arr = [1,3,5,7,9,16,21,18,19,20,23,25];
		  		let count = 0;
		  		$(".btn").each(function(){
		  			count++;
					$(this).css("display", "block");
					if(arr.includes(count))
						$(this).css("background-color","#28a745");
					else 
						$(this).css("background-color","#ffc107");
				});		  		
				audio = new Audio('audio/win.wav');
				audio.play();
		  	}	
		}
	});
});

function loadBoard(){
	var arr = [];
	for(var i = 0; i<size; i++){
		arr.push(i+1);
	}
	var r;
	var i = 0;
	while(arr.length > 0){
		 r = Math.floor(Math.random()*arr.length);
		 document.getElementsByClassName("btn")[i].textContent = arr[r];
		 arr.splice(r, 1);
		 i++;
	}
}

function counter() {
	currentTime++;
	let time = currentTime/100;
	$("#num").html(time);
};

function startTimer() {
	clearInterval(interval);    
    interval = setInterval(counter, 10);
};

function unHide() {
	var all = document.getElementsByClassName('btn');
	for (var i = 0; i < all.length; i++) {
	  all[i].style.display = 'block';
	}
};

function newGame() {
	configDefault();
	
	unHide();
	loadBoard();
	startTimer();

//	play();
};

function configDefault() {
	currentNum = 0;
	currentTime = 0;

	$(".btn").each(function(){
		$(this).css("background-color","");
	});
}

function findNext(){
	$(".btn").each(function(){
		if(parseInt(this.innerHTML) === parseInt(currentNum) + 1) {	
			$(this).css("background-color","#28a745");
		}
	});
}

function play(){
	for(let i = 0; i < size + 1; i++)
	$(".btn").each(function(){
		if(this.innerHTML == i)
			this.click();
	});
};

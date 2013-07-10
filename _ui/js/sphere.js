$(document).ready(function(){

	var amount = 20,
		size = 40;
	var sphere = new Sphere(amount,size);
	var y = 0, x = 0, speedX = 0, speedY = 1.5;

	function startCarousel(){
		$('#carousel').css({
			"-webkit-transform" : "rotateY(" + y + "deg) rotateX(" + x + "deg)"
		});

		y -= speedY;
		x -= speedX;
	}
	setInterval(startCarousel, 30); // Spin the Sphere


	// Show panels piece by piece
	
	var range = $('#rings'),
		oldVal = range.val();
	range.attr("max", amount);
	range.change(function(){
		var newVal = $(this).val();
		var rings = $('#carousel ul');
		if(newVal > oldVal){
			for(j = oldVal; j < newVal; j++){
				for(k = 0; k < amount; k++){
					rings.eq(j).find('li').eq(k).delay(k*100).fadeIn(100);
				}
			}
		} else {
			for(j = oldVal; j > newVal; j--){
				for(k = 0; k < amount; k++){
					rings.eq(j).find('li').eq(k).delay(k*100).fadeOut(100);
				}
			}
		}
		oldVal = newVal;
	});
	

		// Adjusting sliders
	var perspective = $('#perspective');
	perspective.bind('change', function(){
		$('.container').css({"-webkit-perspective" : $(this).val()});
	});

	var panels = $('#panels');
	panels.bind('change', function(){
		sphere.adjust(20, $(this).val());
	});

	var left = $('#left');
	left.bind('change', function(){
		$('#carousel').css({left : $(this).val() + 'px'});
	});

	var top = $('#top');
	top.bind('change', function(){
		$('#carousel').css({top : $(this).val() + 'px'});
	});

	var rotationy = $('#rotationy');
	rotationy.bind('change', function(){
		speedY = $(this).val();
	});

	var rotationx = $('#rotationx');
	rotationx.bind('change', function(){
		speedX = $(this).val();
	});

	var radius = $('#radius');
	radius.bind('change', function(){
		$('#carousel ul li').css({"-webkit-border-radius" : $(this).val() + '%'});
	});

	var explode = $('#explode');
	explode.bind('change', function(){
		sphere.adjust($(this).val(), size);
	});

});








////////////////  
//Build Sphere\\
////////////////

 function Sphere(amount, size){
	this.carousel = $('#carousel');
	this.setValues(amount,size);
	this.build();
	this.transform();
}

Sphere.prototype.setValues = function(amount,size){
	this.pieces = amount; 
	this.size = size;
	this.angle = 360 / this.pieces;
	this.translate = Math.round((this.size / 2) / Math.tan(Math.PI / this.pieces));
	this.offset = (this.carousel.width() / 2) - (this.size / 2);
}

// Put Sphere on page
Sphere.prototype.build = function(){
	for(j=0; j<this.pieces; j++){
		var ul = $('<ul />');
		ul.appendTo('#carousel');
		for(i=0; i<this.pieces; i++){
			var el = '<li class="sphere" />';
			$(el).appendTo(ul);
		}
	}
};

// Adjust panel angles
Sphere.prototype.adjust = function(amount, size){
	this.setValues(amount,size);
	this.transform();
};


// Apply angle tranformations
Sphere.prototype.transform = function(){
	for(j=0; j<this.pieces; j++){
		var ul = $('ul');
		ul.eq(j).css({
			"-webkit-transform" : "rotateX(" + j * this.angle + "deg)"
		});


		for(i=0; i<this.pieces; i++){
			var li = $('ul').eq(j).find('li');
			li.eq(i).css({
				"-webkit-transform" : "rotateY(" + i * this.angle + "deg) translateZ(" + this.translate + "px)",
				width: this.size,
				height: this.size,
				left: this.offset
			});	
		}
	}
};

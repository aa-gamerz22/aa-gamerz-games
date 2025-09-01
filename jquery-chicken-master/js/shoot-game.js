$(document).ready(function(){
	/* speed initialization */
	var speed = 400;
	
	/* level initialization */
	var level = 1;
	
	/* points initialization */
	var points = 0;
	
	/* check_chicken_creation initialization */
	var check_chicken_creation = 0;
	
	/* how often chickens are created */
	var generated_how_often = 3;
	
	/* function - if increase speed */
	function generating_how_often() {
		var ret = Math.ceil(Math.random() * 3);
		generated_how_often = ret;
	}
	
	/* function - if increase speed */
	function increase_speed() {
		speed = speed - 10;
		level++;
		$('#level').html(level);
	}
	
	/* function - adding points (when you shoot chicken) */
	function add_point() {
		points++;
		$('#points').html(points);
		if (0 == (points % 15)) {
			increase_speed();
		}
	}
	
	/* function - for reset chickens at the begining */
	function reset_chickens() {
		for (i=1; i<=20; i++) {
			var x = 0;
			var y = 0;
			$('#chicken-'+i).css('left', x);
			$('#chicken-'+i).css('top', y);
			$('#chicken-'+i).css('display', 'none');
		}
	}
	
	/* function - for shoot the chicken */
	function shoot_chicken(id) {
		if (1 == $(id).css('opacity') && 'block' == $(id).css('display')) {
			if (400 <= parseInt($(id).css('top'))) {
				$(id).css("background-image", "url(img/chicken-kill.gif)");
				$(id).css('display', 'none');
				$(id).css("background-image", "url(img/chicken.gif)");
			} else {
				$(id).css("background-image", "url(img/chicken-kill.gif)");
				$(id).animate({
					opacity: 0.00
				}, 50, function() {
					$(id).css('display', 'none');
					$(id).css('opacity', 1.00);
					$(id).css("background-image", "url(img/chicken.gif)");
				});
			}
			add_point();
		}
	}
	
	/* function - for move the chickens */
	function move_chickens() {
		for (i=1; i<=20; i++) {
			if ('block' == $('#chicken-'+i).css('display')) {
				var before_y = $('#chicken-'+i).css('top');
				before_y = parseInt(before_y) + 15;
				if (435 <= before_y) {
					game_over();
					i = 20;
				}
				else {
					$('#chicken-'+i).css('top', before_y+'px');
				}
			}
		}
	}
	
	/* function - for generating new chicken */
	function generate_chicken() {
		for (i=1; i<=20; i++) {
			if ('none' == $('#chicken-'+i).css('display')) {
				var rand_no_x = Math.random();
				var x = (30 * Math.ceil(rand_no_x * 14));
				var y = 0;
				$('#chicken-'+i).css('left', x);
				$('#chicken-'+i).css('top', y);
				$('#chicken-'+i).css('display', 'block');
				$('#chicken-'+i).css('opacity', 1.00);
				/* disable selection */
				jQuery('#chicken-'+i).disableTextSelect();
				i=20;
			}
		}
		
	}
	
	/* function - if game over */
	function game_over() {
		$(document).stopTime("timerik");
		$('#play').css('display', 'none');
		$('#pause').css('display', 'none');
		$('#game-over').css('display', 'block');
		jQuery('h3').disableTextSelect();
	}
	
	/* function - if pause */
	function pause() {
		$(document).stopTime("timerik");
		$('#play').css('display', 'inline');
		$('#pause').css('display', 'none');
		$('#pause-info').css('display', 'block');
		jQuery('h3').disableTextSelect();
	}
	
	/* function - if new game */
	function new_game() {
		$('#play').css('display', 'inline');
		$('#pause').css('display', 'none');
		$('#stop').css('display', 'inline');
	}
	
	function refresh() {
		/* stop timer */
		$(document).stopTime("timerik");
		
		/* start timer */
		$(document).everyTime(speed, 'timerik', function() {
			move_chickens();
			if (generated_how_often == check_chicken_creation) {
				generate_chicken();
				generating_how_often();
				check_chicken_creation = 0;
			}
			check_chicken_creation++;
		});
	}
	
	reset_chickens();
	
	generate_chicken();
	
	/* if click on play button */
	$('#play').click(function(){
		$('#play').css('display', 'none');
		$('#pause').css('display', 'inline');
		$('#pause-info').css('display', 'none');
		
		refresh();
	});
	
	/* if click on stop button */
	$('.chicken').mousedown(function(){
		shoot_chicken(this);
		if (0 == (points % 15)) {
			refresh();
		}
	});
	
	/* if click on pause button */
	$('#pause').click(function(){
		pause();
	});
	
	/* if click on stop button */
	$('#stop').click(function(){
		new_game();
	});
	
});

// hide a bunch of stuff that shouldn't display immediately
$('.response').addClass('hide');
$('.instruction-module:not(:first)').addClass('hide');
$('.slide:not(:first)').addClass('hide');

// set up the pagination display
updateProgressBar(1);

// basic navigation
$('#back').on('click', function() {
	if (!($(this).hasClass('fade'))) {
		goToPrevModule();
	}
});

$('#forward').on('click', function() {
	if (!($(this).hasClass('fade'))) {
		goToNextModule();
	}
});

$('a.internal').on('click', function() {
	goToModule($(this).data('goto'));
});

// quiz stuff
$('input').on('click', function() {
	checkQuestion();
});

function getCurrentModuleNumber() {
	// the current item is the one that isn't hidden
	var mid = $('.instruction-module:not(.hide)').first().attr('id').substring(1);
	return mid*1; // make sure it gets returned as a number
}

function goToModule(n) {
	updateProgressBar(n);
	var upperLimit = $("[id^='m']:last").attr('id').substring(1); // how many modules?
	var mid = getCurrentModuleNumber();
	var next = mid+1;
	var prev = mid-1;

	// change question
	$('#m' + mid).addClass('hide');
	$('#m' + n).removeClass('hide');

	// uncheck answers and hide responses if there are any
	$('input').prop('checked', false);
	$('#m' + n + '.response').addClass('hide');

	// change slide
	$('li[id^="s' + mid + '"].slide').addClass('hide');
	$('#s' + n + '.slide').removeClass('hide');

	// adjust nav controls
	// is it the last module?
	if (next == upperLimit) {
		$('#forward').addClass('fade');
	} else {
		$('#forward').removeClass('fade');
	}

	// is it the first module?
	if (prev == 1) {
		$('#back').addClass('fade');
	} else {
		$('#back').removeClass('fade');
	}
}

function goToNextModule() {
	var upperLimit = $("[id^='m']:last").attr('id').substring(1); // how many modules?
	var mid = getCurrentModuleNumber();
	var next = mid+1;

	updateProgressBar(next);

	// advance question
	$('#m' + mid).addClass('hide');
	$('#m' + next).removeClass('hide');
	// uncheck answers and hide responses if there are any
	$('input').prop('checked', false);
	$('#m' + next + '.response').addClass('hide');

	// advance slide
	$('li[id^="s' + mid + '"].slide').addClass('hide');
	$('#s' + next + '.slide').removeClass('hide');

	// adjust nav controls
	$('#back').removeClass('fade');
	// is it the last module?
	if (next == upperLimit) {
		$('#forward').addClass('fade');
	} else {
		$('#forward').removeClass('fade');
	}
}

function goToPrevModule() {
	var mid = getCurrentModuleNumber();
	var prev = mid-1;

	updateProgressBar(prev);

	// reverse instruction-module
	$('#m' + mid).addClass('hide');
	$('#m' + prev).removeClass('hide');
	// uncheck answers if there are any
	$('input').prop('checked', false);
	$('.response').addClass('hide');

	// reverse slide
	$('li[id^="s' + mid + '"].slide').addClass('hide');
	$('#s' + prev + '.slide').removeClass('hide');

	// adjust nav controls
	$('#forward').removeClass('fade');
	// is it the first module?
	if (prev == 1) {
		$('#back').addClass('fade');
	} else {
		$('#back').removeClass('fade');
	}
}

function checkQuestion() {
	var mid = getCurrentModuleNumber();
	var response = $('#m' + mid + ' input[type="radio"]:checked').first().attr('class'); // "right" or "wrong_x"
	// clear anything that might be showing
	$('#m' + mid + ' .response').addClass('hide');
	$('li[id^="s' + mid + '"].slide').addClass('hide');
	if (response == 'right') {
		// show "right" message and slide
		$('#m' + mid + ' .right').removeClass('hide');
		$('li[id^="s' + mid + '"].right').removeClass('hide');
	} else {
		// show the appropriate "wrong" message and slide
		$('#m' + mid + ' .' + response).removeClass('hide');
		$('li[id^="s' + mid + '"].' + response).removeClass('hide');
	}
}

function updateProgressBar(n) {
	var upperLimit = $("[id^='m']:last").attr('id').substring(1);
	$('#progress-text').empty().append(n + ' of ' + upperLimit);
	var w = n / upperLimit * 100;
	w = w.toString() + '%';
	$('#pos').css('width', w);
}

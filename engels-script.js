
'https://raw.githubusercontent.com/Sander-Brilman/lester_cheat_remastered/master/functions.js';


// check for start button & click it
if ($('.cover_header_startbtn').length > 0) {
    window.open($('.cover_header_startbtn').attr('href'), '_self');
}


async function loadScript(url) {
    let response = await fetch(url);
    let script = await response.text();
    eval(script);
}

let scriptUrl = 'https://raw.githubusercontent.com/Sander-Brilman/lester_cheat_remastered/master/functions.js'
loadScript(scriptUrl);

test();


// 
// function declarations for exercises
// 

const radio_exercise = function() {
	let innerText = $('#gfeedback').text();
	let choices = $('.optionbox');

	for (let i = 1; i <= choices.length; i++) {
		let box = $('#box' + i.toString()).querySelector('input');
		console.log(box)
		if (innerText.includes('Answer ' + String.fromCharCode(i + 64))) {
			box.click();
		}
	}

	$('#btn_controleer').removeAttr('disabled');
	setTimeout($('#btn_controleer').click(), 1000);
	setTimeout($('#btn_volgende').click(), 1000);
}

const checkbox_exercise = function() {
    let innerText = $('#gfeedback').text();
	let choices = $('.optionbox');
    
	for (let i = 1; i <= choices.length; i++) {
		let box = $('#box' + i.toString());
		if (innerText.slice(0, 50).includes(' ' + String.fromCharCode(i + 64))) {
			box.click();
		}
	}
    
	$('#btn_controleer').removeAttr('disabled');
	setTimeout($('#btn_controleer').click(), 1000);
	setTimeout($('#btn_volgende').click(), 1000);
}


if ($('.rradio').length != 0) { //radio excer

    radio_exercise();

} else if ($('.ch_label').length != 0) {// checkboxes

    checkbox_exercise();

} else if ($('.answer30').length != 0) {

	$('#btn_controleer').removeAttr('disabled');
	$('#btn_controleer').removeAttr('disabled');
	setTimeout($('#btn_controleer').click(), 1000);
	setTimeout($('#btn_volgende').click(), 1000);

} else if ($('.rcol').length != 0) { //column excersize

	var lColumn         = $('.rrowa'); // gets left column
	var rColumn         = $('.rrow rsort ui-draggable ui-droppable'); //gets right column
	var QandA           = $('#gfeedback').text().split('\n').splice($('#gfeedback').text().split('\n').length - lColumn.length, lColumn.length);
	var rColumnSplit    = new Array(rColumn.length);

	for (var i = 0; i < QandA.length; i++) {
		QandA[i] = QandA[i].split(' – '); // splits with question on [0] and answer on [1]
		QandA[i] = QandA[i][0].split(' | ');
		for (var j = 0; j < rColumnSplit.length; j++) {
			rColumnSplit[j] = [ //splits rColumn with Q on [0] ref on [1]
				rColumn[j].querySelector('div, span').text(),
				rColumn[j].getAttribute('ref')
			];
			if (QandA[i][1] == rColumnSplit[j][0]) {
				rColumn[i].setAttribute('ref', rColumnSplit[j][1]);
			}
		}
	}
	console.log('kijk nog even na');
	$('#gfeedback').fadeIn();

} else {

	$('#gfeedback').fadeIn();

}

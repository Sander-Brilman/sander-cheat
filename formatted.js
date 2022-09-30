// 
// Formatted version of the code
// 

// variable deflations
let executeScript   = true;
let answers         = null;

// function for clicking the Check & Next button
const checkAndNext = function() {
    $('#btn_controleer').removeAttr('disabled');
	$('#btn_controleer').removeAttr('disabled');
	setTimeout($('#btn_controleer').click(), 1000);
	setTimeout($('#btn_volgende').click(), 1000);
}

// insert created by banner
$('.cover_header').css({'height': 'auto'});
$('.magazine_page_largetitle2')
.css({'font-size': '35px', 'font-weight': 'bold', 'background': 'white', 'padding': '25px', 'border-bottom': 'red solid 5px'})
.html(`
    <span style="color: red;">Sander Cheat</span><br><br>
    Gemaakt door <a href="https://sanderbrilman.nl" target="_blank" style="text-decoration: underline;">Sander Brilman</a><br>
    <a href="https://github.com/Sander-Brilman/sander-cheat" target="_blank" style="text-decoration: underline;">- Github repo</a><br>
    <a href="https://github.com/leslmosnk/gps-cheater-script" target="_blank" style="text-decoration: underline;">- Origineel</a><br>
`);

// press exit on the last page
if ($('a[data-page-id="end"]').length > 0) {
	setTimeout(window.open($('a[data-page-id="end"]').attr('href'), '_self'), 2000);
    executeScript = false;
}

// press next on any non-exercise pages
if ($('.cover_header_startbtn').length > 0) {
    window.open($('.cover_header_startbtn').attr('href'), '_self');
    executeScript = false;
}

// press next on exercise pages that are already answered
let nextButton = $('#btn_volgende');
if (($('h5').length != 1 || $('h5').text() != 'Instructions') ||
    (!nextButton.attr('disabled') !== 'undefined' && !nextButton.attr('disabled') !== false)) 
{
    nextButton.click();
    executeScript = false;
}

// get & send the answers if no button has been pressed yet
if (executeScript) {
    $.ajax({
        type: 'POST',
        url: '/werkvormen/answer.php',
        async: false,
        data: {
            'pwid': $('#pw_id').val(),
        },
        context: document.body,
        success: function(data) {
            answers = JSON.parse(data);
        }
    });
    
    if (typeof answers[0] !== 'string' && !(answers[0] instanceof String)) {
        // 
        // exceptions where a different answer format is required
        // 

        if (!isNaN(answers)) {// radio buttons

            $(`#box${answers} .rradio`).click();

        } else if ($('.answer30').length > 0) {// text fields

            // get the first valid answer for each text field & enter that as value. The checkbox will send the answers to the server for us :)
            $.each($('.answer30'), function(p) {
                $(this).val(answers[$(this).attr('id').replace('qu', '')][0]);
            });

        } else {// in case of unknown situation: show feedback allowing the person to solve it themselves
            $('.magazine_page_largetitle2').css('color', 'red').html('Automatisch beantwoorden mislukt.<br><br>Kijk in de console voor de antwoorden en voer ze handmatig in.');
            console.log('andwoorden: ', answers);
            $('#gfeedback').fadeIn();
        }

    } else {
        // send the correct answers back to the server
        send_answer($('#pw_id').val(), answers.join('+'));
    }

    // check answers & go to next question
    checkAndNext();
}
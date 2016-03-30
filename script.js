$(document).ready(function () {
    $(".card").click(function () {
        //console.log("clicked");
        card_clicked(this);
    });
    // reset button
    $('.reset').click(function () {
        //console.log("Reset button clicked");
        games_played++;
        $(".win").hide();
        reset_stats();
        display_stats();
        $('.card').find('.back').show();
    });
});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var can_click = true; // flag variable
var attempts = 0;
var accuracy = 0;
var games_played = 0;

//card clicked function will show face, check if first_card_clicked is null
function card_clicked(element) {
    if (!can_click) {
        return;
    }
    $(element).find('.back').hide();
    if (first_card_clicked == null) {
        first_card_clicked = $(element);
        //console.log('first_card_clicked is: ', first_card_clicked);
    }
    else {
        second_card_clicked = $(element);
        attempts++;
        //console.log("number of attempts: " + attempts);
        if (first_card_clicked.find(".front > img").attr('src') == second_card_clicked.find(".front > img").attr('src')) {
            match_counter++;
            //console.log("MATCH!!");
            //console.log("match_counter is: ", match_counter);
            accuracy_check(); // updating accuracy
            display_stats(); // updating stats display
            //console.log("accuracy is: " + accuracy + "%");
            first_card_clicked = null; //reset variable to allow for more clicks
            second_card_clicked = null; //reset variable to allow for more clicks
            //console.log("first_card_clicked is: ", first_card_clicked +
            //    " " + "second_card_clicked is: ", second_card_clicked);
            //checking to see if all matches have been made
            if (match_counter == total_possible_matches) {
                //console.log("YOU WON!!");
                $(".win").show();
            }
        }
        else {
            can_click = false;
            accuracy_check(); // updating accuracy
            display_stats(); // updating stats display
            //console.log("accuracy is: " + accuracy + "%");
            //wait 2 seconds to flip when cards do not match
            setTimeout(function () {
                $(first_card_clicked).find('.back').show();
                $(second_card_clicked).find('.back').show();
                first_card_clicked = null;
                second_card_clicked = null;
                can_click = true; // setting flag variable
            }, 2000);
        }
    }
}
// stats functions
function accuracy_check() {
    accuracy = Math.round((match_counter / attempts) * 100);
}

function display_stats() {
    $('.games_played .value').text(games_played).addClass('white_text');
    $('.attempts .value').text(attempts).addClass('white_text');
    $('.accuracy .value').text(accuracy + "%").addClass('white_text');
}

function reset_stats() {
    match_counter = 0;
    attempts = 0;
    accuracy = 0;
    display_stats();
}
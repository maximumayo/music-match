$(document).ready(function () {
    shuffle();
    $(".card").click(function () {
        card_clicked(this);
    });

    //reset button
    $('.reset').click(function () {
        remove_shuffle();
        shuffle();
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
var random_face = [];

function shuffle() {

    var card_faces = [
        "images/acoustic01.jpg",
        "images/harmonica01.jpg",
        "images/piano01.png",
        "images/strat01.jpg",
        "images/sax01.jpg",
        "images/drum01.jpg",
        "images/lespaul01.jpg",
        "images/trumpet01.jpg",
        "images/violin01.jpg",
        "images/acoustic01.jpg",
        "images/harmonica01.jpg",
        "images/piano01.png",
        "images/strat01.jpg",
        "images/sax01.jpg",
        "images/drum01.jpg",
        "images/lespaul01.jpg",
        "images/trumpet01.jpg",
        "images/violin01.jpg"
    ];
    var card_faces_length = card_faces.length;


    for (var i = 0; i < card_faces_length; i++) {
        var current_length = card_faces.length;
        var num = Math.floor(Math.random() * current_length);
        var temp = (card_faces.splice(num, 1));
        random_face.push(temp[0]);
    }
    for (var j = 0; j < random_face.length; j++) {
        $('.card:nth-child(' + (j + 1) + ')').prepend('<div class="front"><img src="' + random_face[j] + '"></div>');
    }
}

//card clicked function will show face, check if first_card_clicked is null
function card_clicked(element) {
    if (!can_click) {
        return;
    }
    $(element).find('.back').hide();
    if (first_card_clicked == null) {
        first_card_clicked = $(element);
    }
    else {
        second_card_clicked = $(element);
        attempts++;
        if (first_card_clicked.find(".front > img").attr('src') == second_card_clicked.find(".front > img").attr('src')) {
            match_counter++;
            accuracy_check(); // updating accuracy
            display_stats(); // updating stats display
            first_card_clicked = null; //reset variable to allow for more clicks
            second_card_clicked = null; //reset variable to allow for more clicks
            //checking to see if all matches have been made
            if (match_counter == total_possible_matches) {
                $(".win").show();
            }
        }
        else {
            can_click = false;
            accuracy_check(); // updating accuracy
            display_stats(); // updating stats display
            //wait 2 seconds to flip when cards do not match
            setTimeout(function () {
                $(first_card_clicked).find('.back').show();
                $(second_card_clicked).find('.back').show();
                first_card_clicked = null;
                second_card_clicked = null;
                can_click = true; // setting flag variable
            }, 600);
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

function remove_shuffle() {
    $('#game-area div .front').remove();
    random_face = [];
}
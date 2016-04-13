$(document).ready(function () {
    shuffle();
    $(".card").click(function () {
        card_clicked(this);
    });
    //reset button
    $('.reset').click(function () {
        remove_shuffle();
        shuffle();
        reset_stats();
        display_stats();
        $(".win").hide();
        //show the cards again!
        $(".card").find(".back").css({
            "-webkit-transform": "perspective( 600px ) rotateY( 0deg )",
            "transform": "perspective( 600px ) rotateY( 0deg )"
        });
        games_played++;
        game_music.pause();
        game_music.currentTime = 0;
        win_sound.pause();
        win_sound.currentTime = 0;
    });
});

//sound effects
var game_music = new Audio('sounds/background.mp3');
var match_tone = new Audio('sounds/match.mp3');
var win_sound = new Audio('sounds/win.mp3');

game_music.volume = .7;
match_tone.volume = .7;
win_sound.volume = .6;

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
//flip card to face, is first_card_clicked null?
function card_clicked(element) {
    if (!can_click) {
        return;
    }
    $(element).find(".back").css({
        "-webkit-transform": "perspective( 600px ) rotateY( 180deg )",
        "transform": "perspective( 600px ) rotateY( -180deg )"
    });
    $(element).find(".front").css({
        "-webkit-transform": "perspective( 600px ) rotateY( 0deg )",
        "transform": "perspective( 600px ) rotateY( 0deg )"
    });
    if (first_card_clicked == null) {
        first_card_clicked = $(element);
        game_music.play();
    }
    else {
        second_card_clicked = $(element);
        attempts++;
        if (first_card_clicked.find(".front > img").attr('src') == second_card_clicked.find(".front > img").attr('src')) {
            //hide the matched cards
            first_card_clicked.find('.front').hide(500);
            second_card_clicked.find('.front').hide(500);

            match_tone.play();
            match_counter++;
            accuracy_check();
            display_stats();
            first_card_clicked = null;
            second_card_clicked = null;
            //check for win
            if (match_counter == total_possible_matches) {
                $(".win").show(200);
                win_sound.play();
                game_music.pause();
                game_music.currentTime = 0;
            }
        }
        else {
            can_click = false;
            accuracy_check();
            display_stats();
            //not a match flip cards back
            setTimeout(function () {
                second_card_clicked.find('.back').css({
                    "transform": "rotateY(0)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .2s linear 0s",
                    "transition": "-webkit-transform .2s linear 0s"
                });
                second_card_clicked.find('.front').css({
                    "transform": "rotateY(-180deg)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .2s linear 0s",
                    "transition": "-webkit-transform .2s linear 0s"

                });
                first_card_clicked.find('.back').css({
                    "transform": "rotateY(0)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .2s linear 0s",
                    "transition": "-webkit-transform .2s linear 0s"

                });
                first_card_clicked.find('front').css({
                    "transform": "rotateY(-180deg)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .2s linear 0s",
                    "transition": "-webkit-transform .2s linear 0s"

                });
                first_card_clicked = null;
                second_card_clicked = null;
                can_click = true; // resetting flag variable
            }, 500);
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
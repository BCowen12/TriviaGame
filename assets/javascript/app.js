window.onload = function(){
    $("#start").on("click", start);
}


var correct = 0;
var incorrect = 0;
var unanswered = 0;
var num = 0;
var time = 0;
var timer;
var images = ["assets/images/king.gif", "assets/images/pen-name.gif", "assets/images/wife.gif",
"assets/images/carrie.gif", "assets/images/pages.gif", "assets/images/shawshank.gif", 
"assets/images/horns.gif", "assets/images/pitch.gif", "assets/images/college.gif", "assets/images/christine.gif", "assets/images/done.gif"];

//this is a list of questions, answers, and the correct answer. Fake ones for now.
var questions = [
    {
        q: "What is Stephen King's middle name?",
        a1: "Samuel",
        a2: "Edwin",
        a3: "Tommas",
        a4: "Stephen",
        aIndex: "1",
        correctA: "Edwin"
    },
    {
        q: "Stephen King wrote 7 books under what pen name?",
        a1: "Robert Galbraith",
        a2: "Clive Hamilton",
        a3: "Richard Bachman",
        a4: "Paul French",
        aIndex: "2",
        correctA: "Richard Bachman"
    },
    {
        q: "What is Stephen King's wife's name?",
        a1: "Tabitha",
        a2: "Tina",
        a3: "Louis",
        a4: "Linda",
        aIndex: "0",
        correctA: "Tabitha"
    },
    {
        q: "What is Stephen King's first published novel?",
        a1: "The Shining",
        a2: "Christine",
        a3: "Carrie",
        a4: "Pet Semetary",
        aIndex: "2",
        correctA: "Carrie"
    },
    {
        q: "According to Time Magazine what is Stephen King's longest book at 1,153 pages?",
        a1: "It",
        a2: "Under the Dome",
        a3: "Insomnia",
        a4: "The Stand",
        aIndex: "3",
        correctA: "The Stand"
    },
    {
        q: "What novella collection gave us the movies The Shawshank Redemption and Stand by Me?",
        a1: "Different Seasons",
        a2: "Nightmares & Dreamscapes",
        a3: "Four Past Midnight",
        a4: "Night Shift",
        aIndex: "0",
        correctA: "Different Seasons"
    },
    {
        q: "What is Stephen's sons name who wrote the book, turned movie, Horns starring Daniel Radcliffe?",
        a1: "Danny King",
        a2: "Tom Jones",
        a3: "Joe Hill",
        a4: "Gerald Finn",
        aIndex: "2",
        correctA: "Joe Hill"
    },
    {
        q: "In what movie did Stephen King throw out the first pitch in a baseball game?",
        a1: "Moneyball",
        a2: "Mr. 3000",
        a3: "The Rookie",
        a4: "Fever Pitch",
        aIndex: "3",
        correctA: "Fever Pitch"
    },
    {
        q: "What university did Stephen King attend?",
        a1: "Harvard",
        a2: "Maine University",
        a3: "Yale",
        a4: "Boston University",
        aIndex: "1",
        correctA: "Maine University"
    },
    {
        q: "What kind of car was Christine in the book Christine?",
        a1: "Cadillac De Ville",
        a2: "Ford Falcon",
        a3: "Plymouth Fury",
        a4: "Pontiac GTO",
        aIndex: "2",
        correctA: "Plymouth Fury"
    }
]

function start(){
    $("#restart").html("");
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    num = 0;
    ask();
}

function ask(){
    $("#start").html("");
    $("#solution").html("");
    $("#gif").html("");
    
    time = 30;

    //set the question
    $("#question").html(`<h2>${questions[num].q}</h2>`);

    //set the answers
    $("#q1").html(`<h2 class=ans value="0">${questions[num].a1}</h2>`);
    $("#q2").html(`<h2 class=ans value="1">${questions[num].a2}</h2>`);
    $("#q3").html(`<h2 class=ans value="2">${questions[num].a3}</h2>`);
    $("#q4").html(`<h2 class=ans value="3">${questions[num].a4}</h2>`);
    
    $("#time").html(`<h2>Time Remaining: ${time} Seconds</h2>`);

    $(".ans").on("click", choice);
    

    timer = setInterval(count, 1000);

}


function count(){
    if(time > 0){
        time --;
        $("#time").html(`<h2>Time Remaining: ${time} Seconds</h2>`);
    } else{
        clear();
        timeout();
    }
}

function timeout(){
    clearInterval(timer);
    $("#solution").html(`<h2>You ran out of time!!!</h2> </br> <h2>The correct answer was: ${questions[num].correctA}!</h2>`);
    $("#gif").html(`<img src=${images[num]} alt="answer">`);
    if (num < questions.length) {
        num++;
        unanswered++;
        setTimeout(ask, 4000);
    }else{
        unanswered++;
        setTimeout(again, 4000);
    }
    
}

function choice(c){
    var value = $(this).attr("value");
    console.log(this);
    console.log(questions[num].aIndex);
    if(value === questions[num].aIndex){
        clear();
        clearInterval(timer);
        $("#solution").html(`<h2>Correct!</h2>`);
        $("#gif").html(`<img src=${images[num]} alt="answer">`);
        correct++;
    }else{
        clear();
        clearInterval(timer);
        $("#solution").html(`<h2>Nope!</h2> </br> <h2>The correct answer was: ${questions[num].correctA}!</h2>`);
        $("#gif").html(`<img src=${images[num]} alt="answer">`);
        incorrect++;
    }
    if (num < questions.length-1) {
        console.log("ask");
        num++;
        setTimeout(ask, 4000);
    }else{
        num++;
        console.log("again");
        setTimeout(again, 4000);
    }
}

function clear(){
    $("#q1").html("");
    $("#q2").html("");
    $("#q3").html("");
    $("#q4").html("");
}

function again(){
    clear();
    $("#question").html(`<h2>All Done! Here's How You Did:</h2>
    <h2>Correct: ${correct}</h2>
    <h2>Incorrect: ${incorrect}</h2>
    <h2>Unanswered: ${unanswered}</h2>`);
    $("#gif").html(`<img src=${images[num]} alt="answer">`);
    $("#solution").html("");
    $("#restart").html(`<button type="button" class="btn btn-primary btn-lg">Try Again?</button>`);
    $("#restart").on("click", start);
}
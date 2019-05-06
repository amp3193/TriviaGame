let questionArr = [
    {
        question: "The Blue Whale is the largest animal on the planet, but how big is its heart? is it comparable to...",
        imgSrc: "assets/images/whale.jpg",
        options: [
            "a domestic washing machine",
            "a small car",
            "a delivery truck",
            "a 1 gallon jug",
        ],
        answer: 1, //"B) a small car"
    },
    {
        question: "The Bandicoot is native to which continent?",
        imgSrc: "assets/images/bandicoot.jpg",
        options: [
            "Australia",
            "Africa",
            "South America",
            "Asia",
        ],
        answer: 0, //"A) Australia",
    },
    {
        question: "What would be an average weight range for an Asian Elephant?",
        imgSrc: "assets/images/elephant.jpg",
        options: [
            "2000lbs",
            "5000lbs",
            "8000lbs",
            "12000lbs",
        ],
        answer: 2, //"C) 8000lbs",
    },
    {
        question: "Some Flamingos are coloured pink because of what?",
        imgSrc: "assets/images/flamingo.jpg",
        options: [
            "eating shrimp",
            "eating algea",
            "eating hibiscus flowers",
            "eating plankton",
        ],
        answer: 0, //"A) eating shrimp",
    },
    {
        question: "What is the color of a polar bear’s skin?",
        imgSrc: "assets/images/polarbear.jpg",
        options: [
            "white",
            "brown",
            "gray",
            "black",
        ],
        answer: 3, //"D) black",
    },
    {
        question: "How many hearts does an octopus have?",
        imgSrc: "assets/images/octopus.jpg",
        options: [
            "3",
            "1",
            "4",
            "8",
        ],
        answer: 0, //"A) 3",
    },
    {
        question: "What is the top speed of a Bottle Nosed Dolphin?",
        imgSrc: "assets/images/dolphin.jpg",
        options: [
            "21mph",
            "26mph",
            "31mph",
            "45mph",
        ],
        answer: 0, //"A) 21mph",
    },
    {
        question: "How many species of Bumble Bees are there around the world?",
        imgSrc: "assets/images/bee.jpg",
        options: [
            "5",
            "25",
            "100",
            "250",
        ],
        answer: 3, //"D) 250",
    },
    {
        question: "The Orangutan is native to only 2 islands, one is Borneo, which is the other?",
        imgSrc: "assets/images/orangutan.jpg",
        options: [
            "Madagascar",
            "Sumatra",
            "Java",
            "Fiji",
        ],
        answer: 1, //"B) Sumatra",
    },
    {
        question: "The armadillo has a hard shell as protection against predators, but if it had to escape what is its top speed?",
        imgSrc: "assets/images/armadillo.jpg",
        options: [
            "4mph",
            "10mph",
            "20mph",
            "30mph",
        ],
        answer: 3, //"D) 30mph",
    }
];

const timeAmount = 60;
let timeDisplay;
let countdown; 
let score = 0;

function start() {
    $("#answer-row-show").html("");
    loadQuestions();
    runTimer();
}

function loadQuestions() {
    let html = "";
    for (let index = 0; index < questionArr.length; index++) {
        const item = questionArr[index];
        html += getQuestionHtml(index, item);
    }

    $("#questionArr").html(html);
    $("#submitBtn").html(getSubmit());
    $("#submit").on('click', checkAnswers);
}

function getQuestionHtml(index, item) {
    return `
    <div class="shadow row rounded" id="question-row">
        <div class="col-sm-8">
            <div class="question"> ${item.question}
                <form>
                    <input type="radio" id="${index}.0" name="question${index}">${item.options[0]}<br>
                    <input type="radio" id="${index}.1" name="question${index}">${item.options[1]}<br>
                    <input type="radio" id="${index}.2" name="question${index}">${item.options[2]}<br>
                    <input type="radio" id="${index}.3" name="question${index}">${item.options[3]}<br>
                </form>
            </div>
        </div>
        <div class="col-sm-4">
            <div id="image"> <img src="${item.imgSrc}" alt="animals"> </div>
        </div>
    </div>`
}

function getSubmit() {
    return `    
    <div id="submitdiv"><button type="button" class="btn btn-success" id="submit">Submit Answers</button></div>`
}

function checkAnswers() {
    let correctCount = 0;
    let incorrectCount = 0;
    for (let index = 0; index < questionArr.length; index++) {
        const item = questionArr[index];
        let correctAnswerElement = document.getElementById(`${index}.${item.answer}`);
        if (correctAnswerElement.checked) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    }
   
    console.log("correctCount:   " + correctCount)
    console.log("incorrectCount: " + incorrectCount)

    scoreNum = correctCount * 10;
    $("#answer-row-show").html(getAnswerRow(scoreNum, correctCount, incorrectCount));
    $("#questionArr").html("");
    $("#submitBtn").html("");
    clearInterval(countdown);
}

function getAnswerRow(scoreNum, correctCount, incorrectCount) {
    return `<div class="shadow row rounded" id="answer-row">
    <div class="col-sm-4">
        <h4 class=score">Your Score: </h4>
        <h4 class="scoreNum">${scoreNum}</h4>
    </div>
    <div class="col-sm-8">
        <div class="correct">You had ${correctCount} correct answers.</div>
        <div class="wrong">You had ${incorrectCount} incorrect answers.</div>
    </div>
    </div>`
}

function runTimer() {
    clearInterval(countdown);
    timeDisplay = timeAmount;
    countdown = setInterval(decrement, 1000);
    $(".timer").text(timeDisplay);  
  }

function decrement() {
    timeDisplay--;
    $(".timer").text(timeDisplay);
    if (timeDisplay === 0) {
        checkAnswers();
        console.log("time is up")
    }
  }



$("#start").on('click', start);



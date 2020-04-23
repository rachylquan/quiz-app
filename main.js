// variables to store the quiz score and question number
let score = 0;
let questionNumber = 0;

// template to render each question
function renderQuestion() {
    //if the question numner is less than the number of questions
  if (questionNumber < STORE.length) {
      // create form with that question number
    return createForm(questionNumber);
  } else {
      // otherwise hide the quize and get final score
    $('.js-quiz').hide();
    $('.questionNumber').text(questionNumber);
    finalScore();
  }
}

// increments the number value of the "score" variable by one
function updateScore() {
  score++;
  $('.score').html(score);
}

// increase question number
// update value
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

// resets the text values of variables
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.questionNumber').text(0);
  $('.score').text(0);
}

// begins the quiz
function handleStartQuiz() {
  $('.js-startQuiz').on('click', '.startButton', function (event) {
    $('.js-startQuiz').hide();
    $('.js-quiz').show();
    $('.questionNumber').text(1);
    $('.js-quiz').prepend(renderQuestion());
  });
}

// create html for form
function createForm(questionIndex) {
  let formMaker = $(`<form id="js-question">
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
      <div class="answers"></div>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset div.answers');
  // for each answer create an input
  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
    <label for="${answerIndex}">${answerValue}</label>`).appendTo(fieldSelector);
  });
  // add submit button
  $(`<div class="right-txt submitContainer"><button type="submit" class="submitButton button"> Submit</button ></div> `).appendTo(formMaker).find('fieldset');
  return formMaker;
}

// submits a selected answer and checks it against the correct answer
// runs answer functions accordingly
function handleSubmitAnswer() {
  $('main').on('submit', function (event) {
    event.preventDefault();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctIndex = STORE[questionNumber].correctAnswer;
    let answerList = STORE[questionNumber].answers;
    let correct = answerList[correctIndex];
    // disable select options
    $('input[type="radio"').attr("disabled", true);
    // determine if it is correct or not
    if (answer === correct) {
      addCorrectAnswerFeedback();
    } else {
      addWrongAnswerFeedback();
    }
    // fade unselected items
    $('input').not(':checked').next().addClass('fade');
    $('.answers').find("#" + correctIndex).next().addClass('correct').removeClass('fade');
  });
}

// resulting feedback if a selected answer is correct
// increments user score by one
function addCorrectAnswerFeedback() {
  // remove submit button
  $('.submitContainer').hide();
  // tell them they are right and add next button
  $(`<div class="right-txt alertsubmit-container">
    <p class="feedback">Your answer is correct!</p>
    <button type="button" class="nextButton">Next</button>
    </div>`).appendTo('#js-question').find('fieldset');
  updateScore();
}
  
// resulting feedback if a selected answer is incorrect
function addWrongAnswerFeedback() {
  // remove submit button
  $('.submitContainer').hide();
  // add the right answer and next button
  let correctIndex = STORE[questionNumber].correctAnswer;
  let answerList = STORE[questionNumber].answers;
  let correct = answerList[correctIndex];
  $(`<div class="right-txt alertsubmit-container">
    <p class="feedback">Nope, the correct answer is ${correct}</p>
    <button type="button" class="nextButton">Next</button>
    </div>`).appendTo('#js-question').find('fieldset');
}
  
// renders the next question
function handleNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    $('.js-quiz').show();
    updateQuestionNumber();
    $('.js-quiz form').replaceWith(renderQuestion());
  });
}

// determines final score and feedback at the end of the quiz
function finalScore() {
  // hide the question number and score on top
  $('.js-quiz').hide();
  $('.js-final').show();
  
  const great = [
    'assets/snitch.png',
    'golden snitch water color from harry potter',
    'Great job! ',
    'You remember the films well!'
  ];

  const good = [
    'assets/potter-glasses.jpg',
    'harry potter water color, not bad score image',
    'Not too bad. ',
    'You may have passed, but you might want to rewatch.'
  ];

  const bad = [
    'assets/potter-glasses.png',
    'always watercolor image',
    'Yikes! ',
    'You definitely need to rewatch the movies.'
  ];

  if (score >= 7) {
    array = great;
  } else if (score < 7 && score >= 6) {
    array = good;
  } else {
    array = bad;
  }
  return $('.js-final').html(`
      <img src="${array[0]}" alt="${array[1]}">
        <h3>${array[2]} You scored ${score} out of 8</h3>
        <p>${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

// restart quiz so the user can try again
function handleRestart() {
  $('main').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.js-final').hide();
    $('.js-startQuiz').show();
  });
}

// runs the functions
function quizInit() {
  handleStartQuiz();
  renderQuestion();
  handleSubmitAnswer();
  handleNextQuestion();
  handleRestart();
}

$(quizInit);
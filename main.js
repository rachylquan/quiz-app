//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createForm(questionNumber);
  } else {
    $('.js-quiz').hide();
    finalScore();
    $('.questionNumber').text(10);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.js-startQuiz').on('click', '.startButton', function (event) {
    $('.js-startQuiz').hide();
    $('.questionNumber').text(1);
    $('.js-quiz').show();
    $('.js-quiz').prepend(generateQuestion());
  });
}

//create html for form
function createForm(questionIndex) {
  let formMaker = $(`<form id="js-question">
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
      <div class="answers"></div>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset div.answers');
    //for each answer create an input
  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  //add submit button
  $(`<div class="right-txt submitContainer"><button type="submit" class="submitButton button"> Submit</button ></div> `).appendTo(formMaker).find('fieldset');
  return formMaker;
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
    $('main').on('submit', function (event) {
      event.preventDefault();
      $('.response').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = STORE[questionNumber].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
  }


//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
    // remove submit button
    $('.submitContainer').hide();
    // tell them they are right and add next button
    $(`<div class="right-txt alertsubmit-container">
      <p class="feedback">Your answer is correct!</p>
      <button type="button" class="nextButton">Next</button>
      </div>`).appendTo('#js-question').find('fieldset');
    updateScore();
  }
  
  //resulting feedback if a selected answer is incorrect
  function wrongAnswer() {
    // remove submit button
    $('.submitContainer').hide();
    //add the right answer and next button
    $(`<div class="right-txt alertsubmit-container">
      <p class="feedback">Nope, the correct answer is ${STORE[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton">Next</button>
      </div>`).appendTo('#js-question').find('fieldset');
  }
  
  //generates the next question
  function nextQuestion() {
    $('main').on('click', '.nextButton', function (event) {
      $('.js-quiz').show();
      updateQuestionNumber();
      $('.js-quiz form').replaceWith(generateQuestion());
    });
  }

  //determines final score and feedback at the end of the quiz
function finalScore() {
    //hide the question number and score on top
    $('.progress').hide();
    $('.score-container').hide();
    $('.js-quiz').toggleClass('.js-final', '.js-quiz');
    
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
      'You may have passed, but you might want to revisit the movies some more.'
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
function restartQuiz() {
    $('main').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.js-final').hide();
      $('.js-startQuiz').show();
      $('.progress').show();
      $('.score-container').show();
    });
  }




//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
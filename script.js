(function() {
  var questions = [{
    question: "The sustainable Development goals were agreed in",
    choices: [2012, 2015, 'Rio De Janeiro', 2030],
    correctAnswer: 0
  }, {
    question: "The purpose of the SDGs is to",
    choices: ['create 17 goals', 'help all humans live sustainably', 'engage millions of people and thousands of organisations'],
    correctAnswer: 0
  }, {
    question: "The SDGs are focussed on",
    choices: ['the past', 'the past and the present', 'the present', 'the present and the future', 'the future'],
    correctAnswer: 0
  }, {
    question: "Which is not a purpose of the SDG?",
    choices: ['to promote peace', 'to promote prosperity', 'to promote equality', 'to promote challenge'],
    correctAnswer: 0
  }, {
    question: "The SDGs are?",
    choices: ['independent of each other', 'linked to each other'],
    correctAnswer: 0
  }, {
    question: "Which is not an obstacle to achieving the SDG?",
    choices: ['differences in income', 'ecological problems', 'capital cities', 'using more than we produce or grow'],
    correctAnswer: 0
  }, {
    question: "Who should be involved for the SDG to be met?",
    choices: ['Individuals', 'Governments', 'Voluntary organisartions', 'private companies', 'dogs'],
    correctAnswer: 0
  }, {
    question: "Which statement is true in terms of sustainable development?",
    choices: ['Countries in the Global South are considered to be developing', 'Countries in the Global North are considered to be developing', 'Countries in the whole world are considered to be developing'],
    correctAnswer: 0
  }, {
    question: "What is ESD",
    choices: ['Education for Sustainable Development', 'Education for Social Diplomats', 'Easy Sustainable Development', 'Elementary Sock Drawer'],
    correctAnswer: 0
  }, {
    question: "What qualities do people need to be change-makers for sustainability?",
    choices: ['Knowledge about SD', 'Skills to encourage SD', 'Values and attitudes that support SD', 'Sustainable habits'],
    correctAnswer: 0
  }, {
    question: "Education for sustainable development assumes that change-makers _____________ the skills, knowledge and attitudes to reflect on their sustainable development actions?",
    choices: ['have', "don't have", 'are developing'],
    correctAnswer: 0
  }, {
    question: "Whose responsibility is it to encourage Education for Sustainable Development?",
    choices: ['Kindergartens', 'Primary schools', 'Seconday schools', 'Colleges', 'Universities'],
    correctAnswer: 0
  }, {
    question: "Which SDG aims to Conserve and sustainably use the oceans, seas and marine resources for sustainable development",
    choices: ['No Poverty', 'Good Health and Well-Being', 'Affordable and Clean Energy', 'Life below Water', 'Life on Land'],
    correctAnswer: 0
  }, {
    question: "Which competency encourages you to think about your actions and beliefs about sustainability?",
    choices: ['Strategic Competency', 'Anticipatory Competency', 'Self-awareness Competency', 'Critical thinking Competency'],
    correctAnswer: 0
  }, {
    question: "Which competency enables people to analyse future possibilities.",
    choices: ['Systems thinking competency', 'Anticipatory competency', 'Normative competency', 'Strategic competency'],
    correctAnswer: 0
  }, {
    question: "Whose project addressed SDG 12 - Climate Action",
    choices: ['Elif', 'Melati & Isabel', 'Urban Creators', 'Rohit', 'Muzoon'],
    correctAnswer: 0
  }, {
    question: "Who believes in the importance of education?",
    choices: ['Melati & Wijsen', 'Elif', 'Rohit', 'Discardius', 'Muzoon'],
    correctAnswer: 0
  }, {
    question: "Which project was created by adults?",
    choices: ['Elif', 'Rohit', 'Urban creators', 'Discardius', 'None'],
    correctAnswer: 0
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();
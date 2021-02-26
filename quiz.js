(function() 
 {
  var allQuestions = [{
    question: "The First Amendment of the US Constitution protects which of the following rights?",
    options: ["Free Speech", "Right to bear arms", "Right not to be tried for the same offense twice", "Speedy Trial"],
    answer: 0
  }, {
    question: "The Fourth Amendment of the US Constitution protects which of the following rights?",
    options: ["Free Speech", "Speedy Trial", "Right against warrantless searches", "Right to Due Process"],
    answer: 2
  }, {
    question: "The Fifth Amendment of the US Constitution protects which of the following rights?",
    options: ["Speedy Trial", "Freedom of Religion", "Right to remain silent","Right to Due Process"],
    answer: 2
  },{
    question: "Which US Constitutional Amendment effectively ended slavery?",
    options: ["Fifth", "Sixth", "Twelfth", "Thirteenth"],
    answer: 3
  }, {
    question: "If a person chooses not to testify at his own criminal trial, what US Constitutional right is he relying upon?",
    options: ["Thirteenth", "Fifth", "Twelfth", "First"],
    answer: 1
  },{
    question: "Which US Constitutional Amendment started prohibition ?",
    options: ["Sixth", "Twenty Third", "Sixteenth", "Eighteenth"],
    answer: 3
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();
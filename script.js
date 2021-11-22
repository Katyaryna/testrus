function hello(){
    var id;
    id=window.open("", "example", "width=400, height=150");
    id.focus();
    id.document.open();
    id.document.write("<h1><from color='olive' face='Lucida Console' size='5'>Тест на тему Русская литература</form></h1>");
    id.document.write("<input type='button' value='Закрыть окно' onclick='window.close();'> </form>");
    id.document.close();
}





(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} из ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Кто написал &quot;Отцы и дети?&quot;",
        answers: {
          a: "А.С. Пушкин",
          b: "Л.Н. Толстой",
          c: "И.С. Тургенев"
        },
        correctAnswer: "c"
      },
      {
        question: "В каком году родился А.С. Пушкин?",
        answers: {
          a: "1812",
          b: "1836",
          c: "1799"
        },
        correctAnswer: "c"
      },
      {
        question: "Кто написал &quot;Слово о полку Игореве&quot; ?",
        answers: {
          a: "Л.Н. Толстой",
          b: "Е.А. Дроздова",
          c: "А.С. Пушкин",
          d: "Автор неизвестен"
        },
        correctAnswer: "d"
      },
      {
        question: "Кто сказал &quot;Не хочу учиться, хочу жениться!&quot;?",
        answers: {
          a: "Митрофанушка",
          b: "Пушкин",
          c: "Чацкий"
        },
        correctAnswer: "a"
      },
      {
        question: "А из какого произведения Митрофанушка?",
        answers: {
          a: "Красная шапочка",
          b: "&quot;Недоросль&quot; Фонвизина",
          c: "&quot;Отцы и дети&quot; Тургенева"
        },
        correctAnswer: "b"
      },
      {
        question: "Кто из героев Булгакова сказал эту фразу:&quot;Разруха не в газетах, а в головах&quot;",
        answers: {
          a: "Маргарита",
          b: "Воланд",
          c: "Профессор Преображенский"
        },
        correctAnswer: "c"
      },
      {
        question: "Кто из этих поэто не принадлежит к серебряному веку русской поэзии?",
        answers: {
          a: "В. Маяковский",
          b: "Н. Гумилев",
          c: "Ф. Тютчев"
        },
        correctAnswer: "c"
      },
      {
        question: "Какая настоящая фамилия Максима Горького?",
        answers: {
          a: "Пешков",
          b: "Пешкур",
          c: "Коченкова"
        },
        correctAnswer: "a"
      },
      {
        question: "Как звали девушку, в которую был влюблен главный герой романа А.С. Пушкина &quot;Дубровский&quot;?",
        answers: {
          a: "Настя Семенова",
          b: "Марина Романова",
          c: "Маша Троекурова"
        },
        correctAnswer: "c"
      },
      {
        question: "Кому принадлежат слова из пьесы Грибоедова: А СУДЬИ КТО?",
        answers: {
          a: "Чацкий",
          b: "Пушкин",
          c: "Какой Пушкин?"
        },
        correctAnswer: "a"
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
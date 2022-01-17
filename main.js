//Переменные модального окна
const quizOverModal = document.querySelector('.quiz-over-modal'),
      correctAnswer = document.getElementById("correct-answer"),//количество правильных ответов > score > checkAnswer
      numberOfAllQuestions2 = document.getElementById("number-of-all-questions-2"),
      btn = document.getElementById('btn-try-again');

let score = 0; //итоговый результат для correctAnswer 

//Переменные счетчика вопросов
const namberOfQuestion = document.getElementById('number-of-question'),
      namberOfAllQuestions = document.getElementById('number-of-all-questions');
      
// Переменные вопросов и вариантов
const optionElements = document.querySelectorAll('.option'),
      question = document.getElementById('question');
      
      
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');


//Переменная кнопки "Next"
const btnNext = document.getElementById('btn-next');

//Переменная трекера
const answersTracker = document.getElementById('answers-tracker');

//Индекс страницы и вопроса при загрузке страницы
let indexOfQuestion, 
    indexOfPage = 0;

//Масив вопросов с вложенными масивами вариантов ответов
const questions =[
    {
        question: 'Какая из фигур является векторной фигурой в HTML5?',
        options:[
            'Шар',
            'Многоугольник',
            'Призма',
            'Звезда',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой из атрибутов является атрибутом элемента audio?',
        options:[
            'repeat',
            'src',
            'autoplay',
            'controls',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие два значения поддерживает Булевый тип?',
        options:[
            'right and wrong',
            'left and right',
            'yes and no',
            'true and false',
        ],
        rightAnswer: 3
    },
    {
        question: 'Как выглядит однострочный коментарий в js?',
        options:[
            '!--это коментарий--',
            '//это коментарий',
            '**это коментарий',
            '%%это коментарий',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой тег содержит JavaScript?',
        options:[
            'body',
            'style',
            'code',
            'script',
        ],
        rightAnswer: 3
    },
];
//Логика

//счетчик вопросов
  namberOfAllQuestions.innerHTML=questions.length;

//Функция которая генерирует контент при инициализации страницы  
    const load = () =>{
    //рондомный вопрос (благодаря функции indexOfQuestion)
    question.innerHTML=questions[indexOfQuestion].question;
    //варианты ответа
    option1.innerHTML=questions[indexOfQuestion].options[0];
    option2.innerHTML=questions[indexOfQuestion].options[1];
    option3.innerHTML=questions[indexOfQuestion].options[2];
    option4.innerHTML=questions[indexOfQuestion].options[3];
    //номер вопроса
    namberOfQuestion.innerHTML=indexOfPage + 1;
    indexOfPage++;

};


//масив для хранения рандомных чисел
const completedAnswers = [

];

//функция присваивания модальному окну класса active, вызывается при нажатии Next если indexOfPage == questions.length
const quizOver = () =>{
   quizOverModal.classList.add('active');
   correctAnswer.innerHTML=score;
   numberOfAllQuestions2.innerHTML=questions.length;

};

//Перезагрузка страницы при нажатии кнопки "Попробуй ещё"
const tryAgain = () =>{
    window.location.reload();
};

btn.addEventListener('click', tryAgain);


//функция генерирующая рaндомное число
const randomQuestion = ()=>{
    let randomNamber = Math.floor(Math.random () * questions.length);
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов
    if(indexOfPage == questions.length){
       quizOver();
    } else {
        if(completedAnswers.length > 0){
          completedAnswers.forEach(item =>{
              if(item == randomNamber){
                  hitDuplicate = true;
              }
          });
          if(hitDuplicate) {
            randomQuestion(); 
          } else {
              indexOfQuestion = randomNamber;
              load();
          }  
        }
        if(completedAnswers.length == 0){
            indexOfQuestion = randomNamber;
            load(); 
        }
    }
    completedAnswers.push(indexOfQuestion);

}; 

//Действия при выборе варианта ответа
const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnsverTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnsverTracker('wrong');
    }
    disabledOptions();

};

//Функция блокирует повторный выбор ответа и при выборе ответа подсвечивает правельный
const disabledOptions = () =>{
    optionElements.forEach(item =>{
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer ){
            item.classList.add('correct');
        }
    })
}

//Удаление класcов сo всех ответов, вызывается при нажатии кнопки Next
const enableOptions = () =>{
    optionElements.forEach(item => {
        item.classList.remove('correct', 'wrong', 'disabled');
    })
};

//Трекер вопросов
const answerTracker =()=>{
    questions.forEach(() =>{
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
    
} 

//Трекер вопросов > присвоение классов
const updateAnsverTracker = (status) =>{
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

//Проверка выбран ли вариант ответа при нажетии Next, с помощю classList.contains('disable'), поскольку етот класс добавляется к каждому варианту при выборе любого из них
const validate = () =>{
      if(!optionElements[0].classList.contains('disabled')){
         alert('Пожалуйста, выберите один из вариантов ответа');
      } else {
        randomQuestion();
        enableOptions();
      }
};
//Вызов функции при нажатии Next
btnNext.addEventListener('click', () => {
        validate();
    })


//Вызов функции при выборе варианта ответа
for(option of optionElements){
option.addEventListener('click' , e => checkAnswer (e));
}



//Осуществляем вызов функции лоад только после загрузки всей страницы
window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})




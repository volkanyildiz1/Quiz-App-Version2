class Question {
    constructor(text, choises, answer) {
        this.text = text;
        this.choises = choises;
        this.answer = answer;
    }
    checkAnswer(answer) {
        return this.answer === answer;
    }
}
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.indexOfQuestions = 0;
    }
    getQuestion(){
        return this.questions[this.indexOfQuestions];
    }
    isFinish(){
        return this.questions.length===this.indexOfQuestions;
    }
    guess(answer){
        let question=this.getQuestion();
        if(question.checkAnswer(answer)){
            this.score++;
        }
        this.indexOfQuestions++;
    }
}
// example questins
let q1=new Question("Where is London ?",["Germany","England","USA","Italy"],"England");
let q2=new Question("Where is Berlin ?",["Germany","England","USA","Italy"],"Germany");
let q3=new Question("Where is New York ?",["Germany","England","USA","Italy"],"USA");
let q4=new Question("Where is Rome ?",["Germany","England","USA","Italy"],"Italy");
let questionsArray=[q1,q2,q3,q4];

// Start quiz

let quiz=new Quiz(questionsArray);
showProgress("");
load();
function load(){  
    if(quiz.isFinish()){
       showScore();
    }else{  
        let text=quiz.getQuestion().text;
        let choises=quiz.getQuestion().choises;
        let allBtn=document.querySelectorAll(".btn");
        document.getElementById("questiontext").innerText=text;
        for(let i=0;i<choises.length;i++){
            allBtn[i].textContent=choises[i]; 
        }   
        allBtn.forEach(e => {
            e.onclick=function(){     
                if(quiz.getQuestion().checkAnswer(e.textContent)){
                   showProgress("Correct!");
                }else{
                    showProgress(" Correct answer : "+quiz.getQuestion().answer);
                }
             quiz.guess(e.textContent);
            load();   
            }
        });   
    }
}
function showScore(){
    let html=`<h2>Score</h2><h2>${quiz.score}</h2>`;
    document.querySelector(".question").innerHTML=html;
}
function showProgress(value){
    let totalQuestion=questionsArray.length;
    let questionNumber=quiz.indexOfQuestions+1;
    document.querySelector(".result").innerHTML=`${totalQuestion} of ${questionNumber} <span>${value}</span>`;
}

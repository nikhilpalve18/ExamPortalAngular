import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})


export class StartComponent {
  qId:any;
  questions:any;
  currQuiz:any;

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit = false;

  timer:number=0;

  constructor(private locationSt:LocationStrategy, private route:ActivatedRoute, private question:QuestionService,private snack:MatSnackBar, private quiz:QuizService ){}

  ngOnInit():void{
    this.preventBackButton();
    this.qId = this.route.snapshot.params['qid'];
    console.log(this.qId);
    this.loadQuestions();
    this.loadQuiz();
  }

  getFormattedTime(){
    let min = Math.floor(this.timer/60);
    let sec = this.timer-min*60;
    return `${min} min: ${sec} sec`;
  }

  loadQuiz(){
    this.quiz.getQuiz(this.qId).subscribe(
      {
        next:(data)=>{
          this.currQuiz = data;
        },
        error:(err)=>{
          this.snack.open("Error in loading quiz",'',{
            duration:3000
          });
        }
      }
    );
  }

  printPage(){
    window.print();
  }

  loadQuestions(){
    this.question.getQuestionsOfQuizForTest(this.qId).subscribe(
      {
        next:(data)=>{
          this.questions = data;
          this.timer = this.questions.length * 60;

          console.log(this.questions);
          this.startTimer();
        },
        error:(err)=>{
          this.snack.open("Error in loading questions",'',{
            duration:3000
          });
        }
      }
    );
  }

  evalQuiz(){
    this.question.evalQuiz(this.questions).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.isSubmit = true;
        this.marksGot = data['marksGot'];
        this.attempted = data['attempted'];
        this.correctAnswers = data['correctAnswers'];
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
    // this.questions.forEach((q:any) => {
    //   if(q.givenAnswer != null){
    //     this.attempted++;
    //   }
    //   if(q.givenAnswer == q.answer){
    //     this.correctAnswers++;
    //   }
    // });

    // this.marksGot = 2*this.correctAnswers;
    // console.log('marks: ' + this.marksGot);
    // console.log('correct ans' + this.correctAnswers);
    // console.log('Attempted' + this.attempted);
  }

  preventBackButton() {
    history.pushState('', '', location.href);

    window.onpopstate = function (event) {
      history.pushState('', '', location.href);
    };
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000);
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to Submit the quiz?',
      confirmButtonText:'Yes',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
       this.evalQuiz();
      }
    })
  }
}

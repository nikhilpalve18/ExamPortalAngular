import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent {
  catId:any;
  quizzes:any;

  constructor(private route:ActivatedRoute, private snack:MatSnackBar, private quiz:QuizService){

  }


  
  ngOnInit():void{
    this.route.params.subscribe((params)=>{
      this.catId = params['catId'];
      console.log(this.catId);
      // load all quizes
      if(this.catId == 0){
        this.quiz.getActiveQuizzes().subscribe(
          {
            next:(data)=>{
              this.quizzes = data;
              console.log(data);
            },
            error:(err)=>{
              this.snack.open("Error in loading quizzes",'',{
                duration:3000
              });
            }
          }
        );
      }
      // load category wise quiz
      else{
        this.quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          {
            next:(data)=>{
              this.quizzes = data;
            },
            error:(err)=>{  
              this.snack.open("Error in loading quizzes",'',{
                duration:3000
              });
            }
          }
        );
      }
    });
  }
}

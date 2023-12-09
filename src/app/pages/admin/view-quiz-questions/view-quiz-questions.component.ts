import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent {
  qId:any;
  qTitle:any;
  questions:any=[];

  constructor(private router:ActivatedRoute, private question:QuestionService, private snack:MatSnackBar){}

  ngOnInit():void{
    this.qId = this.router.snapshot.params['qid'];
    this.qTitle = this.router.snapshot.params['title'];

    this.question.getQuestionsOfQuiz(this.qId).subscribe(
      {
        next:(data)=>{
          this.questions = data;
          console.log(this.questions);
        },
        error:(err)=>{
          this.snack.open('Error in loading questions', '', {
            duration: 3000,
          })
        }
      }
    );
  }

  deleteQuestion(quesId:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure?',
      confirmButtonText:'Yes',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.question.deleteQuestion(quesId).subscribe(
          {
            next:(data)=>{
              this.questions = this.questions.filter((q:any)=>q.quesId!=quesId);
              this.snack.open("Question Deleted successfully", '', {
                duration: 3000
            })
            },
            error:(err)=>{
              this.snack.open("Error in deleting question", '', {
                duration: 3000
            })
            }
          }
        );
      }
    })
  }

}

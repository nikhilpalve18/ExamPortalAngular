import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css',
})
export class ViewQuizzesComponent {
  quizzes:any = []
   

  constructor(private snack: MatSnackBar, private quiz:QuizService) {}

  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      {
          next: (data: any) => {
              this.quizzes = data;
              console.log(this.quizzes);
          },
          error: (err) => this.snack.open("Error in loading data", '', {
            duration: 3000
        })
      }
  );
  }

  deleteQuiz(qId:any){

    Swal.fire({
      icon:'info',
      title:'Are you sure?',
      confirmButtonText:'Yes',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.quiz.deleteQuiz(qId).subscribe(
          {
            next:(data)=>{
              this.quizzes = this.quizzes.filter((quiz:any)=>quiz.qId!=qId);
              this.snack.open("Quiz Deleted", '', {
                duration: 3000
            })
            },
            error:(err)=>{
              this.snack.open("Error in deleting quiz", '', {
                duration: 3000
            })
            }
          }
        );
      }
    })

  
  }


}

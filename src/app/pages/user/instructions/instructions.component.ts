import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent {

  qId:any;
  quiz:any;

  constructor(private route:ActivatedRoute, private _quiz:QuizService, private snack: MatSnackBar, public router:Router){

  }

  ngOnInit():void{
    this.qId = this.route.snapshot.params['qid'];
    
    this._quiz.getQuiz(this.qId).subscribe(
      {
        next:(data)=>{
          this.quiz = data;
          console.log(this.quiz);
        },
        error:(err)=>{
          this.snack.open("Error in loading quiz data",'',{
            duration:3000
          });
        }
      }
    );
    
  }

  startQuiz(){
    Swal.fire({
      title:'Do you want to start the quiz?',
      confirmButtonText:'Yes',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/start/' + this.qId]);
      }
    })

  
  }
}

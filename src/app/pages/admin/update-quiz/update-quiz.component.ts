import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent {
  constructor(private route: ActivatedRoute, private quiz:QuizService,
    private cat: CategoryService, 
    private snack:MatSnackBar,
    private router:Router,
    ){}

  qId = 0;
  currquiz:any;
  categories:any;

  ngOnInit(): void{
    this.qId = this.route.snapshot.params['qid'];
    
    this.quiz.getQuiz(this.qId).subscribe(
      {
        next:(data:any)=>{
          this.currquiz = data;
          console.log(data);
        },
        error:(err)=>{
          console.log(err);
        }
      }
    );

    this.cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (err) =>
        this.snack.open('Error in loading categories', '', {
          duration: 3000,
        }),
    });
  }


  // update 
  public updateQuiz(){
    if (this.currquiz.title.trim() == '' || this.currquiz.title == null) {
      this.snack.open('Title is required !!', '', {
        duration: 3000,
      });
      return;
    }

    this.quiz.updateQuiz(this.currquiz).subscribe(
      {
        next:(data)=>{
          this.snack.open('Quiz saved successfully', '', {
            duration: 3000,
          });
          this.router.navigate(['/admin/quizzes/'])
        },
        error:(err)=>{
          this.snack.open('Error updating quiz', '', {
            duration: 3000,
          });
        }
      }
    );
  }
}

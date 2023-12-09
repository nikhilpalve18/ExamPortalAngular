import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
export class AddQuizComponent {
  categories: any = [];

  quizData: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  constructor(
    private quiz: QuizService,
    private cat: CategoryService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
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

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.snack.open('Title is required !!', '', {
        duration: 3000,
      });
      return;
    }

    // all done

    this.quiz.addQuiz(this.quizData).subscribe({
      next: (data: any) => {
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: '',
          },
        };
        this.snack.open('Quiz added successfully', '', {
          duration: 3000,
        });
      },
      error: (err: any) =>
        this.snack.open('Something went wrong', '', {
          duration: 3000,
        }),
    });
  }
}

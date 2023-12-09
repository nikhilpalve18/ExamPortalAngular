import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
  public Editor = ClassicEditor;
  qId:any;
  qTitle:any;

  question:any={
    quiz:{
      qId:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor( private snack:MatSnackBar, private route: ActivatedRoute, private ques:QuestionService){}

  ngOnInit():void{
    this.qId = this.route.snapshot.params['qid'];
    this.qTitle = this.route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId;
  }
  
  formSubmit(){
    if(this.question.content.trim() == '' || this.question.content == null){
      this.snack.open('Content is required !!', '', {
        duration: 3000,
      });
      return;
    }

    if(this.question.option1.trim() == '' || this.question.option1 == null){
      this.snack.open('Option1 is required !!', '', {
        duration: 3000,
      });
      return;
    }

    if(this.question.option2.trim() == '' || this.question.option2 == null){
      this.snack.open('Option2 is required !!', '', {
        duration: 3000,
      });
      return;
    }

    if(this.question.answer.trim() == '' || this.question.answer == null){
      this.snack.open('Option2 is required !!', '', {
        duration: 3000,
      });
      return;
    }

    this.ques.addQuestion(this.question, this.qId).subscribe(
      {
        next:(data:any)=>{
          this.snack.open('Question added successfully', '', {
            duration: 3000,
          });
          this.question.content='';
          this.question.option1='';
          this.question.option2='';
          this.question.option3='';
          this.question.option4='';
          this.question.answer='';
        },
        error:(err:any)=>{
          this.snack.open('Error in adding question', '', {
            duration: 3000,
          });
        }
      }
    );
  }
}

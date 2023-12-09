import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  category:any={
    title:'',
    description:'',
  }

  constructor(private snack:MatSnackBar, private _category:CategoryService){}

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this.snack.open('Title is required !!', '', {
        duration:3000,
      })
      return;
    }

    // all done
    this._category.addCategory(this.category).subscribe(
      {
        next:(data:any)=>{
          this.category.title='';
          this.category.description='';
          this.snack.open('Category added successfully', '', {
            duration:3000,
          })
        },
        error: (err) => this.snack.open("Something went wrong", '', {
          duration: 3000
      })
      }
    )
  }
}

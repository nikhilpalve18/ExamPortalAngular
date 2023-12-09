import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent {
  categories:any=[]

  constructor(private category: CategoryService, private snack:MatSnackBar,){ }

  ngOnInit():void{
    this.category.categories().subscribe(
      {
          next: (data: any) => {
              this.categories = data;
          },
          error: (err) => this.snack.open("Error in loading data", '', {
            duration: 3000
        })
      }
  );
  }
}

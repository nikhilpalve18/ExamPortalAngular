import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  categories:any;
  constructor(private cat:CategoryService, private snack:MatSnackBar){}

  ngOnInit():void{
    this.cat.categories().subscribe({
      next:(data)=>{
        this.categories = data;
      },
      error:(err)=>{
        this.snack.open("Error in loading categories",'',{
          duration:3000,
        });
      }
    }

    );
  }
}

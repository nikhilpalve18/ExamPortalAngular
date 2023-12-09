import { Component} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent{
  constructor(private userService: UserService, private snack: MatSnackBar){}

  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  }

  formSubmit(){
    if(this.user.username=='' || this.user.username==null){
      this.snack.open("Username is required!",'',{
        duration:3000
      });
      return;
    }
    if(this.user.password=='' || this.user.password==null){
      this.snack.open("Password is required!",'',{
        duration:3000
      });
      return;
    }
    if(this.user.firstname=='' || this.user.firstname==null){
      this.snack.open("firstname is required!",'',{
        duration:3000
      });
      return;
    }
    if(this.user.lastname=='' || this.user.lastname==null){
      this.snack.open("Lastname is required!",'',{
        duration:3000
      });
      return;
    }
    if(this.user.email=='' || this.user.email==null){
      this.snack.open("Email is required!",'',{
        duration:3000
      });
      return;
    }
    if(this.user.phone=='' || this.user.phone==null){
      this.snack.open("phone is required!",'',{
        duration:3000
      });
      return;
    }

    //add user
    this.userService.addUser(this.user).subscribe(
     {
       next:(data:any)=>
       Swal.fire("Registeration successfull",'User Id is ' + data.id,'success'),
       error:(err)=>this.snack.open("Something went wrong",'',{
        duration:3000
       })
     }
    );

  }
}

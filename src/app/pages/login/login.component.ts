import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginData = {
    username:'',
    password:'',
  }

  constructor(private snack:MatSnackBar, private login:LoginService, protected router:Router){}
  formSubmit(){
    console.log("login form submitted");
    if(this.loginData.username.trim() == '' || this.loginData.username == null){
      this.snack.open('Username is required !!', '', {
        duration:3000,
      })
      return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password == null){
      this.snack.open('password is required !!', '', {
        duration:3000,
      });
      return;
    }

    this.login.generateToken(this.loginData).subscribe(
      {
          next: (data: any) => {
              console.log(data);
              this.login.loginUser(data.token);
  
              this.login.getCurrentUser().subscribe(
                  {
                      next: (user: any) => {
                          this.login.setUser(user);
                          console.log(user);
                          
                          // Redirect to admin page
                          if(this.login.getUserRole() == 'ADMIN'){
                              // window.location.href = '/admin';
                              this.router.navigate(['admin']);
                              this.login.loginStatusSubject.next(true);
                            } 
                            // Redirect to normal user page
                            else if(this.login.getUserRole() == 'NORMAL'){
                              // window.location.href = '/user-dashboard';
                              this.router.navigate(['user-dashboard/0']);
                              this.login.loginStatusSubject.next(true);
                          }
                          else{
                            this.login.logout();
                          }
                      }
                  }
              );
          },
          error: (err) => this.snack.open("Invalid username or password", '', {
              duration: 3000
          })
      }
  );
  
    


  }
}

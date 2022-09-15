import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { BroadcastService } from 'src/app/broadcast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  err = false;
  get email(){return this.loginForm.get('email');}
  get password(){return this.loginForm.get('password');}

  loginForm = this.fb.group({
    email: ["",[Validators.required, Validators.email]],
    password : ["", Validators.required]
  })

  constructor(
    private fb : FormBuilder,
    private authService: AuthService,
    private router: Router,
    public broadCastService: BroadcastService,
    private toastrService: ToastrService) {
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.loginUser({
        email : this.loginForm.value.email!,
        password: this.loginForm.value.password!
      })
      .subscribe((data)=>{
        if(data.token) localStorage.setItem("token", data.token);
        this.router.navigate(['home']);
      });
    }
    else this.err = false;
  }
}
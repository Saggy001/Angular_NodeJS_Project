import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  get email(){return this.resetForm.get('email');}

  resetForm = this.fb.group({
    email: ["",[Validators.required, Validators.email]]
  })

  constructor(private authservice: AuthService,
    private fb: FormBuilder,
    private toastrService : ToastrService,
    private router: Router) { }

  ngOnInit(): void {}

  onSubmit(){
    if(this.resetForm.valid){
      this.authservice.forgetpassword(this.resetForm?.value?.email+'').subscribe((data)=>{
        this.toastrService.success(data.message, "");
        this.router.navigate(['signin']);
      });
    }
  }
}

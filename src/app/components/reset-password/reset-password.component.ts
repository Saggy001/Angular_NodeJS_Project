import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token = "";
  get password(){return this.resetForm.get('password');}
  get confirmPassword(){return this.resetForm.get('confirmPassword');}

  pass1 = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  pass2 = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  resetForm = this.fb.group({
    password : this.pass1,
    confirmPassword : this.pass2,
  },
  {
    validator: this.ConfirmedValidator('password', 'confirmPassword'),
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastrService : ToastrService,
    private router: Router) { }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors?.['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')+ '';
    this.authService.checkTokenValid(this.token)
    .subscribe(
      data=>{},
      err=>{
        this.router.navigate(['signin']);
      }
    )
  }

  onSubmit(){
    if(this.resetForm.value){
      this.authService.resetPassword(
        {password: this.resetForm.value.password},
        this.token).subscribe(data=>{
          this.toastrService.success(data.message, "");
          this.router.navigate(['signin']);
        });
    }
  }

}

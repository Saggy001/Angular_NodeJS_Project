import { Component, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  err = false;
  get name(){return this.registerForm.get('name');}
  get password(){return this.registerForm.get('password');}
  get email(){return this.registerForm.get('email');}
  get confirmPassword(){return this.registerForm.get('confirmPassword');}

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

  registerForm = this.fb.group({
    name: ["",[Validators.required , Validators.minLength(3), Validators.maxLength(25)]],
    password : this.pass1,
    confirmPassword : this.pass2,
    email: ["", [Validators.email, Validators.required]]
  },
  {
    validator: this.ConfirmedValidator('password', 'confirmPassword'),
  });


  constructor(private fb: FormBuilder,
    private authService: AuthService,
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
    this.registerForm.get("email")?.valueChanges
    .pipe(debounceTime(800), distinctUntilChanged())
    .subscribe(value=>{
      if(!this.registerForm.get("email")?.errors){
      this.authService.checkEmailExistance(value).subscribe(data=>{
        if(data.data)this.err = true;
        else this.err = false;
      });
      }
      else{
        this.err = false;
      }
    });
  }


  onSubmit(){
    if(this.registerForm.valid && !this.err){
      const data = {
        name : this.registerForm.value.name,
        email : this.registerForm.value.email,
        password: this.registerForm.value.password
      }
      this.authService.registerUser(data).subscribe(msg=>{
        this.router.navigate(['signin']);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserInterface } from 'src/app/user-interface';
import { UserService } from 'src/app/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  get name(){return this.myForm.get('name');}
  get age(){return this.myForm.get('age');}
  get email(){return this.myForm.get('email');}
  get password(){return this.myForm.get('password');}
  get confirmPassword(){return this.myForm.get('confirmPassword');}

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

  imageUrl = "";
  userdata : User= {
    id : -1,
    name: "",
    email : "",
    age : 0,
    image :"",
    dob: ""
  }
  
  myForm = this.fb.group({
    name: ["",[Validators.minLength(3) , Validators.required , Validators.maxLength(25)]],
    email : ['', [Validators.email, Validators.required]],
    age :[0, [Validators.min(1), Validators.max(150)]],
    image : [],
    dob: [""],
    password : this.pass1,
    confirmPassword : this.pass2
  },
  {
    validator: this.ConfirmedValidator('password', 'confirmPassword'),
  });

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

  public id: number = 0;

  err = false;

  btnName = "Create";
  headerText = "Enter User Details"

  constructor(
    private router : Router,
    private route: ActivatedRoute, 
    private userService : UserService,
    private fb : FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
    ) {
    this.route.paramMap.subscribe(params => {
      if(params.get('id')){
        this.myForm.get('password')?.clearValidators();
        this.myForm.get('confirmPassword')?.clearValidators();
        this.myForm.get('password')?.updateValueAndValidity();
        this.myForm.get('confirmPassword')?.updateValueAndValidity();
        this.btnName = "Update";
        this.headerText = "Update User Details"
        this.id = Number(params.get('id'));
        this.userService.getUser(this.id).subscribe(data => {
          this.userdata = data.data!;
          this.imageUrl = environment.baseImageUrl + data.data?.image;
          this.myForm.patchValue({
            name: data.data?.name,
            email: data.data?.email,
            age : data.data?.age,
            dob: data.data?.dob
          })
        });
      }
    });
   }

  ngOnInit(): void {
    this.myForm.get("email")?.valueChanges
    .pipe(debounceTime(800), distinctUntilChanged())
    .subscribe(value=>{
      if(!this.myForm.get("email")?.errors && this.userdata.email != value){
      this.authService.checkEmailExistance(value!).subscribe(data=>{
        if(data.data)this.err = true;
        else this.err = false;
      });
      }
      else{
        this.err = false;
      }
    });
  }

  onFileSelect(event : any){
     if (event?.target?.files?.length > 0) {
      const file: any = event.target.files[0];
      this.myForm.get('image')?.setValue(file);

      var reader = new FileReader();
      reader.onloadend = ()=> {
           this.imageUrl = String(reader.result);
           console.log(this.imageUrl);
      }
      reader.readAsDataURL(file);
     }
  }

  onSubmit(){
    console.log(this.myForm);
    if(this.myForm.valid && !this.err){
      const formData = new FormData();
      formData.append('name', this.myForm.value.name!);
      if(this.myForm.value.age)formData.append('age', this.myForm.value.age + '');
      formData.append('email', this.myForm.value.email!);
      if(this.myForm.value.image)formData.append('image', this.myForm.value.image);
      if(this.myForm.value.dob)formData.append('dob', this.myForm.value.dob);

      if(!this.id) formData.append('password', this.myForm.value.password);

      const api: any = this.id ? this.userService.updateUserWithId(this.id, formData) : this.userService.createUser(formData);
      api.subscribe((data: {message: string})=>{
        this.toastrService.success(data.message,"");
        this.router.navigate(['home/users']);
      });

    }
  }
  
  changeImage(){
    this.imageUrl = 'assets/userimage.png';
  }

  disableDate() {
    return false;
  }

}

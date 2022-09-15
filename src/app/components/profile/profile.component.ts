import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user-interface';
import { UserService } from 'src/app/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  get name(){return this.profileForm.get('name')}
  get age(){return this.profileForm.get('age')}
  get email(){return this.profileForm.get('email')}
  get dob(){return this.profileForm.get('dob')}

  err = false;
  userdata:User = {
    id : -1,
    name: "",
    email : "",
    age : null,
    image :"",
    dob : ""
  }

  imageUrl = ""
  
  profileForm = this.fb.group({
    name: ["",[Validators.minLength(3) , Validators.required , Validators.maxLength(25)]],
    email: ['', [Validators.email, Validators.required]],
    age: [0, [Validators.min(1), Validators.max(150)]],
    image: [],
    dob: ['']
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService
    ) {
      this.authService.myCredentials().subscribe(user => {
        this.userdata = user.data;
        // let date = new Date("10/10/2000");
        this.imageUrl = environment.baseImageUrl + user.data.image;
        this.profileForm.patchValue({
          name: user.data.name,
          email: user.data.email,
          age : user.data.age,
          dob: user.data.dob
        })
      });
    }

  ngOnInit(): void {
    this.profileForm.get("email")?.valueChanges
    .pipe(debounceTime(800), distinctUntilChanged())
    .subscribe(value=>{
      if(!this.profileForm.get("email")?.errors && this.userdata.email != value){
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
     this.profileForm.get('image')?.setValue(file);

     var reader = new FileReader();
     reader.onloadend = ()=> {
          this.imageUrl = String(reader.result);
          console.log(this.imageUrl);
     }
     reader.readAsDataURL(file);
    }
 }

 onSubmit(){
    console.log(this.profileForm);
    if(this.profileForm.valid && !this.err){
      const formData = new FormData();
      formData.append('name', this.profileForm.value.name!);
      formData.append('email', this.profileForm.value.email!);
      if(this.profileForm.value.age)formData.append('age', this.profileForm.value.age+'');
      if(this.profileForm.value.dob)formData.append('dob', this.profileForm.value.dob);
      if(this.profileForm.value.image)formData.append('image', this.profileForm.value.image);

      this.userService.updateUser(formData).subscribe(data=>{
        this.toastrService.success(data.message, "");
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

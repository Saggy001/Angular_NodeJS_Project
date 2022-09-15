import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User, UserInterface } from 'src/app/user-interface';
import { UserService } from 'src/app/user.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UserCountInterface } from 'src/app/get-filter-user-model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  sortBy = "id";
  sortDir = "desc";
  search: any = "";
  page = 1;

  total_users = 0;
  no_of_pages = 0;

  page_arr = new Array(this.no_of_pages);
  users : User[] = [];
  baseImageUrl = "http://localhost:8000/";
  constructor(private userService : UserService, private router: Router ) { }


  ngOnInit(): void {
    this.userService.getUsers(this.sortBy, this.sortDir, this.search , this.page)
    .subscribe((users: UserCountInterface) => {
      this.users = users.data;
      this.total_users = users.count;
      this.no_of_pages = Math.ceil(this.total_users / 5);
      this.page_arr = new Array(this.no_of_pages);
    });
  }

  deleteUser(id:number , index:number){
    if (confirm("Are you sure?") == true)
      this.userService.deleteUser(id).subscribe(()=> this.users.splice(index , 1));
  }

  updateUser(id:number){
    this.router.navigate(['home/updateUser/'+ id]);
  }

  sortId(){
    if(this.sortBy == "id"){
      if(this.sortDir == "desc")this.sortDir = "asc";
      else this.sortDir = "desc";
      this.updateList();
    }
    else{
      this.sortBy = "id";
      this.updateList();
    }
  }

  sortAge(){
    if(this.sortBy == "age"){
      if(this.sortDir == "desc")this.sortDir = "asc";
      else this.sortDir = "desc";
      this.updateList();
    }
    else{
      this.sortBy = "age";
      this.updateList();
    }
  }

  sortEmail(){
    if(this.sortBy == "email"){
      if(this.sortDir == "desc")this.sortDir = "asc";
      else this.sortDir = "desc";
      this.updateList();
    }
    else{
      this.sortBy = "email";
      this.updateList();
    }
  }

  sortName(){
    if(this.sortBy == "name"){
      if(this.sortDir == "desc")this.sortDir = "asc";
      else this.sortDir = "desc";
      this.updateList();
    }
    else{
      this.sortBy = "name";
      this.updateList();
    }
  }

  updateList(){
    this.userService.getUsers(this.sortBy, this.sortDir, this.search , this.page)
    .subscribe((users: UserCountInterface) => {
      this.users = users.data;
      this.total_users = users.count;
      this.no_of_pages = Math.ceil(this.total_users / 5);
      this.page_arr = new Array(this.no_of_pages);
    });
  }

  changePage(page:number){
    this.page = page;
    this.updateList();
  }

  prevBtn(){
    this.page = this.page -1;
    this.updateList();
  }

  nextBtn(){
    this.page = this.page +1;
    this.updateList();
  }

  changeImage(event: Event){
    (event.target as HTMLImageElement).src = 'assets/userimage.png';
  }
}

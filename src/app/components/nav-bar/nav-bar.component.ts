import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { BroadcastService } from 'src/app/broadcast.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  title = "User App";
  constructor(
    private router: Router,
    private broadcastService: BroadcastService,
    private authService: AuthService,
    private toastrService: ToastrService) { }

    selectview = "" 
  ngOnInit(): void {
    this.broadcastService.selected.asObservable().subscribe((val)=>{
      this.selectview = val;
    })
  }

  logout(){
    localStorage.removeItem("token");
      this.router.navigate(['signin']);
  }

  redirect(path:string, select:string){
    this.broadcastService.selected.next(select);
    this.router.navigate([path]);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-alert-user',
  templateUrl: './alert-user.component.html',
  styleUrls: ['./alert-user.component.scss']
})
export class AlertUserComponent implements OnInit {
  price = 20000;
  arr1 = [1,2,3,4,6,7,8]
  v = "Saggy";
  @Input('data')decimalNum1 = 0;
  decimalNum2: number = 5.43; 
  timeChange = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new 
    Date().toString()), 1000); 
 }); 
  jsonData = { id: 'one', name: { username: 'user1' }}  


  @Output() notify = new EventEmitter();
  constructor() { } 
  ngOnInit() { 
     
  }

  yo(){
    this.notify.emit(this.arr1);
  }
  

}

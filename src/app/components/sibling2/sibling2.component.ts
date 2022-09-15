import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-sibling2',
  templateUrl: './sibling2.component.html',
  styleUrls: ['./sibling2.component.scss']
})
export class Sibling2Component implements OnInit {
  name = "";
  constructor(private message : MessageService) { }

  ngOnInit(): void {
    this.message.getMessage().subscribe(msg =>{
      if(msg)this.name = msg;
    })
  }

}

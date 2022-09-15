import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-sibling1',
  templateUrl: './sibling1.component.html',
  styleUrls: ['./sibling1.component.scss']
})
export class Sibling1Component implements OnInit {

  constructor(private message : MessageService) { }
  name = "";
  ngOnInit(): void {
  }

  handleChange(){
    this.message.sendMessage(this.name);
  }

}

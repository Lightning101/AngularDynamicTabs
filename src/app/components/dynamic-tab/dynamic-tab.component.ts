import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-dynamic-tab',
  templateUrl: './dynamic-tab.component.html',
  styleUrls: ['./dynamic-tab.component.css']
})
export class DynamicTabComponent implements OnInit {

  @Input() label:string;
  @Output() deleteTab: EventEmitter<string> = new EventEmitter<string>();
  @Input() index:number = 0;
  constructor() { }

  ngOnInit() {
   
  }

  deleteTabEvent(){
    this.deleteTab.next(this.label);
  }

}

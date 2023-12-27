import { Component , ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap/popover';
@Component({
  selector: 'app-userinterface',
  templateUrl: './userinterface.component.html',
  styleUrls: ['./userinterface.component.css']
})
export class UserinterfaceComponent {
  constructor(private button: ElementRef){}
 
}

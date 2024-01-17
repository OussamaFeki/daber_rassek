import { Component } from '@angular/core';

@Component({
  selector: 'app-card-clients',
  templateUrl: './card-clients.component.html',
  styleUrls: ['./card-clients.component.css']
})
export class CardClientsComponent {
  currentRate = 3.14;
  ariaValueText(current: number, max: number) {
		return `${current} out of ${max} hearts`;
	}
}

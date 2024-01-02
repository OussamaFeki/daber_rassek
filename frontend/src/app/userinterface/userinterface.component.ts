import { Component , ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userinterface',
  templateUrl: './userinterface.component.html',
  styleUrls: ['./userinterface.component.css']
})
export class UserinterfaceComponent {
  closeResult = '';
  token:any;
  data:any;
	constructor(private modalService: NgbModal,private authService:AuthService,private router: Router) {
		this.token=this.authService.getAuthToken();
		this.data=this.authService.decodeToken(this.token);
		console.log(this.data.id);
	}

	open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
	logout(): void {
		// Call the logout method from AuthService
		this.authService.logout();
	
		// Optionally, navigate to the login page or another page
		this.router.navigate(['/login']); // Update with your login route
	  }
}

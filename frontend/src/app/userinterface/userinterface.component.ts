import { Component , ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-userinterface',
  templateUrl: './userinterface.component.html',
  styleUrls: ['./userinterface.component.css']
})
export class UserinterfaceComponent {
  closeResult = '';
  token:any;
  selectedRole: string = '';
  data:any;
	constructor(private modalService: NgbModal,private authService:AuthService,private router: Router,private userservice:UserService) {
		this.userservice.getProfile().subscribe(
			(user) => {
			  // Handle the freelancerCard data
			  this.data =user
			},
			(error) => {
			  console.error('Error fetching Freelancer Card:', error);
			}
		  );
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
	//pour logout
	logout(): void {
		// Call the logout method from AuthService
		this.authService.logout();
	
		// Optionally, navigate to the login page or another page
		this.router.navigate(['/login']); // Update with your login route
	}
	openXl(content:any) {
		this.modalService.open(content, { size: 'xl' });
	}
}

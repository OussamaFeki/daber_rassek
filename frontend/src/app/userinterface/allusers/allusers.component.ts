import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent {
  users:any;
  closeResult = '';
  query='';
  field='';
  currentRate:any;
  addedRate=0;
  token:any;
  data:any;
  constructor(private service:UserService,
    private authService:AuthService,
    private datePipe: DatePipe,
    private modalService: NgbModal
    ){
    
    this.service.searchUsers(this.query,this.field).subscribe((data)=>{
      this.token=this.authService.getAuthToken();
		  this.data=this.authService.decodeToken(this.token);
      this.users = data.filter((user) => user.role !== undefined && user._id!==this.data.id);
      console.log(data)
    },(error)=>{

    });
    this.currentRate=0;
  }
  calculateAge(birthday: string): number {
    const birthdate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    if (today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
      age--;
    }

    return age;
  }
  formatTime(time: string): string {
    const formattedTime = this.datePipe.transform(new Date(`1970-01-01T${time}`), 'h:mm a');
    return formattedTime || time;
  }
  //'for the modal"
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
  //  for the addrating
  addrate(id:any){
    this.service.addrate(id,this.data.id,this.addedRate).subscribe((data)=>{

    },(err)=>{

    } )
  }
}

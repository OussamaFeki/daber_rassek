import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent {
  users:any;
  clients:any
  closeResult = '';
  query:string = '';
  field:string = '';
  role:string = '';
  currentRate:any;
  filterRate=0;
  addedRate=0;
  numRater=0;
  token:any;
  data:any;
  @Output() addRate = new EventEmitter<{ id: any; rate: any,i:any }>();
  @Output() addTrust = new EventEmitter<{ id: any; rate: any,i:any }>();
  constructor(private service:UserService,
    private authService:AuthService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private route: ActivatedRoute
    ){
      if(!this.query && !this.field && !this.role){
        this.service.searchUsers(this.query,this.field).subscribe((data)=>{
          this.token=this.authService.getAuthToken();
          this.data=this.authService.decodeToken(this.token);
          this.users = data.filter((user) => user.role !== undefined && user._id!==this.data.id);
          this.clients= data.filter((user)=>user.needs.length > 0 && user._id!==this.data.id )
          console.log(data)
        },(error)=>{
          console.log(error)
        })
      } 
    this.route.queryParams.subscribe(params => {
      this.query= params['term'];
      this.field = params['filter'];
      this.role = params['role'];
      this.filterRate=params['rate'];
      this.numRater=params['numRater'];
    this.service.searchUsers(this.query,this.field).subscribe((data)=>{
      this.token=this.authService.getAuthToken();
		  this.data=this.authService.decodeToken(this.token);
      //if the search bar filter of role iis all
      if(this.role===''){
        this.users = data.filter((user) => user.role !== undefined && user._id!==this.data.id && this.filterRate<=user.rate && this.numRater<=user.numRaters);
        this.clients= data.filter((user)=>user.needs.length > 0 && user._id!==this.data.id && this.filterRate<=user.trustrate && this.numRater<=user.numtruster)
      }
      if(this.role==='all'){
        this.users = data.filter((user) => user.role !== undefined && user._id!==this.data.id && this.filterRate<=user.rate && this.numRater<=user.numRaters);
        this.clients= data.filter((user)=>user.needs.length > 0 && user._id!==this.data.id && this.filterRate<=user.trustrate && this.numRater<=user.numtruster)
      }
      if(this.role==='employee'){
        this.users = data.filter((user) => user.role !== undefined && user._id!==this.data.id && this.filterRate<=user.rate && this.numRater<=user.numRaters);
      }
      if(this.role==='client'){
        this.clients= data.filter((user)=>user.needs.length > 0 && user._id!==this.data.id && this.filterRate<=user.trustrate && this.numRater<=user.numtruster)
      }
      console.log(data)
    },(error)=>{

    });})
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
  //for formatte the data type of time to on pm and AM
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
  addrate(id:any,rate:any,i:any){
    this.service.addrate(this.data.id,id,rate).subscribe((data)=>{
      console.log(data);
      this.users[i].rate=data.rate;
      this.users[i].numRaters=data.numRaters
    },(err)=>{
      console.log(err)
    } )
    this.addRate.emit({ id, rate, i});
  }
  addtrust(id:any,rate:any,i:any){
    this.service.addtrust(id,this.data.id,rate).subscribe((data)=>{
      console.log(data);
      this.clients[i].trustrate=data.trustrate;
      this.clients[i].numtruster=data.numtruster
    },(err)=>{
      console.log(err)
    } )
    this.addRate.emit({ id, rate, i});
  }
}

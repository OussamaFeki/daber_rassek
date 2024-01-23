import { DatePipe } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-card-freelancers',
  templateUrl: './card-freelance.component.html',
  styleUrls: ['./card-freelance.component.css']
})
export class CardFreelanceComponent {
  @Input() users:any
  @Output() addRate = new EventEmitter<{ id: any; rate: any }>();
  closeResult = '';
  query='';
  field='';
  currentRate:any;
  addedRate=0;
  token:any;
  currentSlide = 0;
  cardWidth = 410; // Adjust the card width based on your design
  translateX = 0;
  @Input()data:any;
  constructor(private modalService: NgbModal,private datePipe: DatePipe){
    
  }
  //For get Age
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
  //for formate TIME to pm and am  
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
  //add user Rate 
  addrate(id:any,rate:any){
    this.addRate.emit({ id, rate });
  }
  // 
  prevSlide() {
    this.currentSlide = Math.max(this.currentSlide - 1, 0);
    this.updateTranslateX();
    console.log(this.users.length)
  }

  nextSlide() {
    if(this.users.length>3){
      this.currentSlide = Math.min(this.currentSlide + 1, this.users.length - 1);
      this.updateTranslateX();
    }
    
  }

  private updateTranslateX() {
    this.translateX = -this.currentSlide * this.cardWidth;
  }
}

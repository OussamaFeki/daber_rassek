import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentRate:any;
  freelancerCard:any;
  img:string='';
  constructor(private userservice:UserService,private datePipe: DatePipe){
   
  }
  ngOnInit(): void {
    this.userservice.getProfile().subscribe(
      (freelancerCard) => {
        // Handle the freelancerCard data
        this.freelancerCard = freelancerCard;
        this.img=this.freelancerCard.picture
        console.log('Freelancer Card:', this.freelancerCard);
        this.currentRate=freelancerCard.rate;
      },
      (error) => {
        console.error('Error fetching Freelancer Card:', error);
      }
    );
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
}

import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentRate = 3.5;
  freelancerCard:any;
  img:string='';
  constructor(private userservice:UserService){
   
  }
  ngOnInit(): void {
    this.userservice.getFreelancerCard().subscribe(
      (freelancerCard) => {
        // Handle the freelancerCard data
        console.log('Freelancer Card:', freelancerCard);
        this.freelancerCard = freelancerCard;
        this.img=this.freelancerCard.picture

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
}

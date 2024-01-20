import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent {
  users:any;
  query='';
  field='';
  currentRate:any;
  constructor(private service:UserService,private datePipe: DatePipe){
    this.service.searchUsers(this.query,this.field).subscribe((data)=>{
      this.users = data.filter((user) => user.role !== undefined );
      
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
}

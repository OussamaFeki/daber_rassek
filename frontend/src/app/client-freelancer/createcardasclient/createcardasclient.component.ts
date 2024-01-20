import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormArray} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-createcardasclient',
  templateUrl: './createcardasclient.component.html',
  styleUrls: ['./createcardasclient.component.css']
})
export class CreatecardasclientComponent implements OnInit {
  profileForm: FormGroup;
  selectedFile: File | null = null;
  needsFormArray:any;
  constructor(private userservice:UserService ,private fb: FormBuilder){
    
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      needs: this.fb.array([]), // Assuming needs is an array
      from: ['', Validators.required],
      to: ['', Validators.required],
      phone:['', Validators.required],
      city:['', Validators.required],
      // Add other form controls as needed
    });
  }
  ngOnInit(): void {
    this.userservice.getClientCard().subscribe(
      (user) => {
        if (!user) {
          console.error('User data is null or undefined');
          return;
        }

        this.profileForm.patchValue({
          name: user.name,
          firstname: user.firstname,
          birthday: user.birthday,
          gender: user.gender,
          phone: user.phone,
          city: user.city,
          //if there is the time is in data base not null
          from: user.time?.from || '',
          to: user.time?.to || '',
        });
        console.log('user :',user)
        this.needsFormArray = this.profileForm.get('needs') as FormArray;
        this.needsFormArray.clear();

        if (user.needs && user.needs.length > 0) {
          user.needs.forEach((need: any) => {
            this.needsFormArray.push(this.fb.control(need));
          });
        }
        
      },
      (error) => {
        console.error('Failed to fetch user data', error);
        // Handle error
      }
    );
  }
  // fonction of Add Need button
  addNeed(event: Event): void {
    event.preventDefault(); 
    this.needsFormArray.push(this.fb.control('', Validators.required));
  }
  
  //for images 
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
  }
  updateProfile(): void {
    const user = this.profileForm.value;
    this.userservice.addClientCard(user, this.needsFormArray,this.selectedFile).subscribe(
      (response) => {
        console.log('Profile updated successfully', response);
        // Handle success or navigate to another page
      },
      (error) => {
        console.error('Profile update failed', error);
        // Handle error
      }
    );
  }
}

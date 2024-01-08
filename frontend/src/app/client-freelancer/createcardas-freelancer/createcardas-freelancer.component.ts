import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createcardas-freelancer',
  templateUrl: './createcardas-freelancer.component.html',
  styleUrls: ['./createcardas-freelancer.component.css']
})
export class CreatecardasFreelancerComponent {
  profileForm: FormGroup;
  selectedFile: File | null = null;
  constructor(private userservice:UserService ,private fb: FormBuilder){
    
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      role:['', Validators.required],
      availability:['', Validators.required],
      phone:['', Validators.required],
      city:['', Validators.required]
      // Add other form controls as needed
    });
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
  }
  updateProfile(): void {
    const user = this.profileForm.value;
    this.userservice.updateProfile(user, this.selectedFile).subscribe(
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

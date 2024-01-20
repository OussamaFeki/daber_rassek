import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createcardas-freelancer',
  templateUrl: './createcardas-freelancer.component.html',
  styleUrls: ['./createcardas-freelancer.component.css']
})
export class CreatecardasFreelancerComponent implements OnInit  {
  profileForm: FormGroup;
  selectedFile: File | null = null;
  constructor(private userservice:UserService ,private fb: FormBuilder){
    
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      role:['', Validators.required],  
      phone:['', Validators.required],
      city:['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      // Add other form controls as needed
    });
  }
  ngOnInit(): void {
    // Fetch the user's current data and set it in the form
    this.userservice.getFreelancerCard().subscribe(
      (user) => {
        this.profileForm.patchValue({
          name: user.name,
          firstname: user.firstname,
          birthday: user.birthday,
          gender: user.gender,
          city: user.city,
          phone: user.phone,
          role: user.role,
          from:user.availability.from,
          to:user.availability.to
        });
      },
      (error) => {
        console.error('Failed to fetch user data', error);
        // Handle error
      }
    );
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
  }
  updateProfile(): void {
    const user = this.profileForm.value;
    console.log(user.from);
    console.log(this.profileForm.value)
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

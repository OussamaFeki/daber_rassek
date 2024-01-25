import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
    ){
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Add other form controls and validators as needed
    });
  }
  signUp() {
    const user = this.signupForm.value;
    this.authService.signUp(user).subscribe(
      (response) => {
        console.log('Signup successful', response);
        // Handle success or navigate to another page
        this.authService.setAuthToken(response.token);
        this.router.navigate(['/user']);
      },
      (error) => {
        console.error('Signup failed', error);
        // Handle error
        
        this.toastr.error(error.error.error);
      }
    );
  }
}

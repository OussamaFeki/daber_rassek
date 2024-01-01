import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  signinForm: FormGroup;
  error:any;
  constructor(private authservice:AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
    ){
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Add other form controls and validators as needed
    });

  }
  signIn(dangerTpl:any) {
    const credentials = this.signinForm.value;
    this.authservice.signIn(credentials).subscribe(response => {
      console.log('Signin successful', response);
      // Handle success or navigate to another page
      this.authservice.setAuthToken(response.token);
      this.router.navigate(['/user']);
    }, error => {
      // console.error('Signin failed', error.error.error);
      this.error=error.error.error;
      this.toastr.error(this.error);
    });
  }
  ngOnDestroy(): void {
		this.authservice.clear();
	}
}

import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class isloggedGuard implements CanActivate{
  constructor(private router: Router,private authService: AuthService) {}
  canActivate(): boolean {

    // Check if the user is already logged in (replace with your authentication logic)
    if (this.authService.isAuthenticated()) {
      // If logged in, redirect to the user interface or another appropriate route
      this.router.navigate(['/user']);
      return false
    } else {
      // If not logged in, allow access to the login route
      return true;
    }
  }

  
};

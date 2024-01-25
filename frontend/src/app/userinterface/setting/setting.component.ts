import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  currentPassword: string = '';
  newPassword: string = '';
  constructor(private authService:AuthService,
    private toastr: ToastrService
    ){

  }
  changePassword(): void {
    this.authService.changePassword(this.currentPassword, this.newPassword)
      .subscribe(
        (message) => {
          this.toastr.success(message.message)
          // Optionally, you can redirect the user or perform additional actions
        },
        error => {
          console.error('Failed to change password:', error);
          this.toastr.error(error.error.error);
          // Handle the error (display a message, log, etc.)
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PatternValidator } from '@angular/forms';
import { UserService } from '../../../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  formInput = <any>{};

  createUser() {
    if (this.formInput.password !== this.formInput.confPass)
      alert('Password is not written correctly.');
    else {
      var user = {
        fullName: this.formInput.fullname,
        emailAddress: this.formInput.emailAddress,
        password: this.formInput.password,
        orders: [],
        userType: this.formInput.type
      };

      var self = this;
      this.userService.register(user).subscribe(function (res) {
        self.userService.updateUser(user);
        self.router.navigate(['/']);
      },
        function (error) {
          alert("The email you entered was already used. Please login instead.");
        });
    }
  }

  ngOnInit() {
  }

}

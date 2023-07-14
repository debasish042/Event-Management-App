import { Component } from '@angular/core';
import { AdminOperationsService } from '../admin-operations.service';
import { Admin } from 'src/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  admin: Admin = new Admin();
  testAdmin: Admin = new Admin();
  message = '';
  loggedIn = false;
  passwordArea=false;
  newpwd='';
  constructor(
    private service: AdminOperationsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getAdminDetails().subscribe((data: any) => {
      this.testAdmin = data;
      if (this.testAdmin.loggedIn) {
        this.admin.loggedIn = true;
        this.loggedIn = true;
      }
    });
  }

  login() {
    if (
      this.testAdmin.email === this.admin.email &&
      this.testAdmin.password === this.admin.password
    ) {
      this.admin.loggedIn = true;
      this.loggedIn = true;
      this.message = 'Login successful.';
      this.updateLoggedInStatus(true);
      this.router.navigate(['/home']);
    } else {
      this.admin.loggedIn = false;
      this.loggedIn = false;
      this.message = 'Invalid credentials.';
    }
  }

  updateLoggedInStatus(loggedIn: boolean) {
    this.testAdmin.loggedIn = loggedIn;
    this.service.updateAdminDetails(this.testAdmin).subscribe(() => {
      this.admin.loggedIn = loggedIn;
    });
  }
  update() {
    this.testAdmin.password=this.newpwd;
    this.service.updateAdminDetails(this.testAdmin).subscribe((data:any) => {
      this.admin=data;
    });
    this.passwordArea=true;
  }
}
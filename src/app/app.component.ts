import { Component, OnInit } from '@angular/core';
import { AdminOperationsService } from './admin-operations.service';
import { Admin } from 'src/admin';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'event-management-app';
  admin: Admin = new Admin();

  constructor(
    private service: AdminOperationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateAdminStatus();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateAdminStatus();
      }
    });
  }

  updateAdminStatus() {
    this.service.getAdminDetails().subscribe((data: any) => {
      this.admin = data;
    });
  }

  logout() {
    this.admin.loggedIn = false;
    this.service.updateAdminDetails(this.admin).subscribe(() => {
      this.updateAdminStatus();
      this.router.navigate(['']);
    });
  }
}

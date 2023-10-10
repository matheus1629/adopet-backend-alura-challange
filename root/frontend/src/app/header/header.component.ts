import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  routeEditProfile = `/profile-${localStorage.getItem('user_type_adopet')?.toLocaleLowerCase()}`;

  constructor(private router: Router, public auth: AuthService) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
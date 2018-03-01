import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';
  userLogged: any[] = [{ title: 'Logout' }];
  userForeign: any[] = [{ title: 'Sign up' }, { title: 'Login' }]

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    public service: UserService
  ) { }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  onMenuClick(event) {
    if (event.title === 'Logout') {
      this.service.updateUser(null);
    }
    else if (event.title === 'Sign up') {
      this.router.navigate(['/dashboard/auth/register']);
    }
    else if (event.title === 'Login') {
      this.router.navigate(['/dashboard/auth/login']);
    }
  }
}

import { UserService } from './../../../modules/users/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  constructor(private userService: UserService) {}

  onSearch(keyword: string): void {
    this.userService.queryParamsSubject.next({ search: keyword, page: 1 });
  }
}

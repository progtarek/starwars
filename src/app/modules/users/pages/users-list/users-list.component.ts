import { QueryParams } from './../../../../shared/models/QueryParams';
import { UsersList } from './../../models/UsersList';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, timer } from 'rxjs';
import {
  debounce,
  distinctUntilChanged,
  map,
  mergeMap,
  scan,
  switchMap,
} from 'rxjs/operators';
import { User } from '../../models/User';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  usersList$!: Observable<User[]>;
  hasNext: boolean = true;
  queryParamsSubject = new BehaviorSubject<QueryParams>(new QueryParams());

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.usersList$ = this.queryParamsSubject.pipe(
      debounce((params) => (params.search ? timer(300) : EMPTY)),
      distinctUntilChanged(),
      mergeMap((params) => this.usersService.getUsersList(params)),
      map(({ results, next, ...rest }) => {
        this.hasNext = next ? true : false;
        return results;
      }),
      scan((a, c: any) => a.concat(...c), [])
    );
  }

  onScroll() {
    if (this.hasNext) {
      this.queryParamsSubject.next({
        ...this.queryParamsSubject.value,
        page: ++this.queryParamsSubject.value.page,
      });
    }
  }
}

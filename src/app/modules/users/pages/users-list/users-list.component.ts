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
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  hasNext: boolean = true;

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.usersService.queryParamsSubject
      .pipe(
        debounce((params) => (params.search ? timer(300) : EMPTY)),
        distinctUntilChanged(),
        mergeMap((params) => this.usersService.getUsersList(params)),
        map(({ results, next, ...rest }) => {
          this.hasNext = next ? true : false;
          return results;
        }),
        scan((a, c: any) => {
          return this.usersService.queryParamsSubject.value.page === 1
            ? c
            : a.concat(...c);
        }, [])
      )
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  onScroll() {
    if (this.hasNext) {
      this.usersService.queryParamsSubject.next({
        ...this.usersService.queryParamsSubject.value,
        page: ++this.usersService.queryParamsSubject.value.page,
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
  }
}

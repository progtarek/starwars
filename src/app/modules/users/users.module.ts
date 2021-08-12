import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UsersFilterComponent } from './components/users-filter/users-filter.component';

@NgModule({
  declarations: [UsersListComponent, UserCardComponent, UsersFilterComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    InfiniteScrollModule,
    DragDropModule,
    SharedModule,
  ],
})
export class UsersModule {}

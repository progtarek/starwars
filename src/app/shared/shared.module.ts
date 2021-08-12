import { RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';

@NgModule({
  declarations: [MainNavComponent, DropDownMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainNavComponent, DropDownMenuComponent],
})
export class SharedModule {}

import { RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MainNavComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainNavComponent],
})
export class SharedModule {}

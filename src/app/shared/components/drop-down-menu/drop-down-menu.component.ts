import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss'],
})
export class DropDownMenuComponent implements OnInit {
  @Input() title: string = '';
  @Input() iconPath: string = '';

  isDropDownOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}

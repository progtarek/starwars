import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { User } from '../../models/User';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let user: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    user = {
      name: 'Luke Skywalker',
      height: '172',
      homeworld: {
        name: 'Tatooine',
      },
      url: 'https://swapi.dev/api/people/1/',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct user', () => {
    fixture.componentInstance.user = user;
    expect(fixture.componentInstance.user.name).toEqual('Luke Skywalker');
  });

  it('should render the hero name in heading 4 tag', () => {
    fixture.componentInstance.user = user;
    fixture.detectChanges();

    let deA = fixture.debugElement.query(By.css('h4'));
    expect(deA.nativeElement.textContent).toContain('Luke Skywalker');
  });
});

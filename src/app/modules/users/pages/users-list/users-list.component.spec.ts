import { UserCardComponent } from './../../components/user-card/user-card.component';
import { UserService } from './../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { By } from '@angular/platform-browser';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let mockUserService: UserService;
  let users = [
    {
      name: 'Luke Skywalker',
      height: '172',
      homeworld: {
        name: 'Tatooine',
      },
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'C-3PO',
      height: '167',
      homeworld: {
        name: 'Tatooine',
      },
      url: 'https://swapi.dev/api/people/2/',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent, UserCardComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    mockUserService = jasmine.createSpyObj(['getUsersList']);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should users length match users card length', () => {
    component.users = users;

    fixture.detectChanges();

    const userComponentDEs = fixture.debugElement.queryAll(
      By.directive(UserCardComponent)
    );

    expect(userComponentDEs.length).toEqual(2);
    for (let i = 0; i < userComponentDEs.length; i++) {
      expect(userComponentDEs[i].componentInstance.user.name).toEqual(
        users[i].name
      );
    }
  });

  it('should scroll on has next true', () => {
    component.users = users;
    component.hasNext = false;
    component.ngOnInit();
    component.onScroll();

    fixture.detectChanges();

    expect(component.users.length).toEqual(2);
  });
});

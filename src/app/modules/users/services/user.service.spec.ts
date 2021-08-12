import { environment } from './../../../../environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should has the same base api root url', () => {
    expect(service.peopleUrl).toBe(`${environment.apiRoot}/people`);
  });

  it('should get users list', () => {
    service.getUsersList().subscribe((res) => {
      expect(res.results.length).toBe(10);
    });
  });

  it('Get page 1 of users list', () => {
    service.getUsersList().subscribe((res) => {
      service.getUsersList().subscribe();

      const req = httpTestingController.expectOne('people');

      req.flush({ id: 4, name: 'SuperDude', strength: 100 });
      httpTestingController.verify();
    });
  });

  it('should handle error', () => {
    service.handleError(Error('something went wrong')).subscribe((res) => {
      console.log(res);
    });
  });
});

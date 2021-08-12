import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MainNavComponent } from './main-nav.component';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainNavComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('searchInput should update value when input changes', () => {
    spyOn(fixture.componentInstance, 'onSearch');
    const el: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    const randomValue = 'luke';
    el.value = randomValue;
    el.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    component.onSearch(randomValue);

    expect(component.onSearch).toHaveBeenCalledWith(randomValue);
  });
});

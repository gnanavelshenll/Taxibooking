import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookrideComponent } from './bookride.component';

describe('BookrideComponent', () => {
  let component: BookrideComponent;
  let fixture: ComponentFixture<BookrideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookrideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotImageListComponent } from './bot-image-list.component';

describe('BotImageListComponent', () => {
  let component: BotImageListComponent;
  let fixture: ComponentFixture<BotImageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBotImageComponent } from './edit-bot-image.component';

describe('EditBotImageComponent', () => {
  let component: EditBotImageComponent;
  let fixture: ComponentFixture<EditBotImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBotImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBotImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

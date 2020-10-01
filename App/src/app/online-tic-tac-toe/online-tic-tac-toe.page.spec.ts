import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnlineTicTacToePage } from './online-tic-tac-toe.page';

describe('OnlineTicTacToePage', () => {
  let component: OnlineTicTacToePage;
  let fixture: ComponentFixture<OnlineTicTacToePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineTicTacToePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineTicTacToePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

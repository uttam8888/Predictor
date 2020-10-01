import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleTicTacToePage } from './single-tic-tac-toe.page';

describe('SingleTicTacToePage', () => {
  let component: SingleTicTacToePage;
  let fixture: ComponentFixture<SingleTicTacToePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTicTacToePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleTicTacToePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

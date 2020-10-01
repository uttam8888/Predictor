import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoubleTicTacToePage } from './double-tic-tac-toe.page';

describe('DoubleTicTacToePage', () => {
  let component: DoubleTicTacToePage;
  let fixture: ComponentFixture<DoubleTicTacToePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleTicTacToePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoubleTicTacToePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

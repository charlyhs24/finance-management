import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinanceAccountPage } from './finance-account.page';

describe('FinanceAccountPage', () => {
  let component: FinanceAccountPage;
  let fixture: ComponentFixture<FinanceAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

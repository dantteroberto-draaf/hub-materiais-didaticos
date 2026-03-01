import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gerenciador } from './gerenciador.component';

describe('Gerenciador', () => {
  let component: Gerenciador;
  let fixture: ComponentFixture<Gerenciador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gerenciador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gerenciador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

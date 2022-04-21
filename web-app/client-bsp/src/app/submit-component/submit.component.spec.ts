import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { SubmitComponent } from './submit.component';

describe('SubmitComponent', () => {
  let component: SubmitComponent;
  let fixture: ComponentFixture<SubmitComponent>;

  @Component({selector: 'app-create-ticket', template: ''})
  class CreateTicketStubComponent {}

  @Component({selector: 'app-change-ticket-owner', template: ''})
  class ChangeTicketOwnerStubComponent {}

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [
        SubmitComponent,
        CreateTicketStubComponent,
        ChangeTicketOwnerStubComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set showCreateTicket to true', () => {
    expect(component.showCreateTicket).toEqual(true);
  });

  it('should have a createTicket component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-create-ticket')).toBeTruthy();
  });


  describe('toggle', () => {
    beforeEach(() => {
      component = fixture.componentInstance;
    });

    it('should toggle showChange to true when called with create', () => {
      component.showCreateTicket = false;
      component.toggle('create');
      expect(component.showCreateTicket).toEqual(true);
    });

    it('should toggle showChange to false when called with change', () => {
      component.showCreateTicket = true;
      component.toggle('change');
      expect(component.showCreateTicket).toEqual(false);
    });

    it('should not toggle showChange if it is already the desired value', () => {
      component.showCreateTicket = true;
      component.toggle('create');
      expect(component.showCreateTicket).toEqual(true);

      component.showCreateTicket = false;
      component.toggle('change');
      expect(component.showCreateTicket).toEqual(false);
    });
  });
});

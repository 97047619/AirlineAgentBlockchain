import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CreateTicketFormComponent } from './create-ticket-form.component';
import { ApiService } from '../../../api.service';

describe('CreateTicketFormComponent', () => {
  let component: CreateTicketFormComponent;
  let fixture: ComponentFixture<CreateTicketFormComponent>;
  let service: ApiService;
  const spy: any;
  const http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTicketFormComponent ],
      imports: [FormsModule],
      providers: [{provide: ApiService, UseValue: service}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = new ApiService(http);
    fixture = TestBed.createComponent(CreateTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

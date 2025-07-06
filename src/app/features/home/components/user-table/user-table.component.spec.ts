import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { User } from '../../models/user.model';
import { UiButtonComponent } from '../../../../shared/components/ui/atoms/ui-button/ui-button.component';
import { By } from '@angular/platform-browser';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  // Datos de prueba simplificados
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      website: 'johndoe.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 1',
        city: 'New York',
        zipcode: '10001',
        geo: { lat: '40.7128', lng: '-74.0060' }
      },
      company: {
        name: 'Tech Corp',
        catchPhrase: 'Innovation at its best',
        bs: 'synergize scalable supply-chains'
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableComponent, UiButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept users input', () => {
    component.users = mockUsers;
    expect(component.users).toEqual(mockUsers);
  });

  it('should render table when users exist', () => {
    component.users = mockUsers;
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('.user-table'));
    expect(table).toBeTruthy();
  });

  it('should not render table when users is empty', () => {
    component.users = [];
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('.user-table'));
    expect(table).toBeNull();
  });

  it('should emit userSelected when user is clicked', () => {
    component.users = mockUsers;
    fixture.detectChanges();

    const spy = spyOn(component.userSelected, 'emit');
    const row = fixture.debugElement.query(By.css('.user-table__row'));

    row.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('should return user id in trackByUser', () => {
    const result = component.trackByUser(0, mockUsers[0]);
    expect(result).toBe(1);
  });
});

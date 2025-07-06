import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { UserApiService } from './user-api.service';
import { UserCacheService } from './user-cache.service';
import { User } from '../models/user.model';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

describe('UserService', () => {
  let service: UserService;
  let userApiService: jasmine.SpyObj<UserApiService>;
  let cacheService: jasmine.SpyObj<UserCacheService>;

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

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('UserApiService', ['getUsers']);
    const cacheSpy = jasmine.createSpyObj('UserCacheService', [
      'getUsers', 'setUsers', 'clearUsers'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: UserApiService, useValue: apiSpy },
        { provide: UserCacheService, useValue: cacheSpy }
      ]
    });

    service = TestBed.inject(UserService);
    userApiService = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;
    cacheService = TestBed.inject(UserCacheService) as jasmine.SpyObj<UserCacheService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return cached users when available', (done) => {
      cacheService.getUsers.and.returnValue(mockUsers);
      service.getUsers().pipe(take(1)).subscribe({
        next: (users) => {
          expect(users).toEqual(mockUsers);
          expect(cacheService.getUsers).toHaveBeenCalled();
          expect(userApiService.getUsers).not.toHaveBeenCalled();
          done();
        },
        error: done
      });
    });

    it('should fetch users from API when cache is empty', (done) => {
      cacheService.getUsers.and.returnValue(null);
      userApiService.getUsers.and.returnValue(of(mockUsers));
      service.getUsers().pipe(take(1)).subscribe({
        next: (users) => {
          expect(users).toEqual(mockUsers);
          expect(cacheService.getUsers).toHaveBeenCalled();
          expect(userApiService.getUsers).toHaveBeenCalled();
          expect(cacheService.setUsers).toHaveBeenCalledWith(mockUsers);
          done();
        },
        error: done
      });
    });

    it('should handle API errors gracefully', (done) => {
      cacheService.getUsers.and.returnValue(null);
      userApiService.getUsers.and.returnValue(throwError(() => new Error('API Error')));
      service.getUsers().pipe(take(1)).subscribe({
        next: (users) => {
          expect(users).toEqual([]);
          expect(cacheService.getUsers).toHaveBeenCalled();
          expect(userApiService.getUsers).toHaveBeenCalled();
          done();
        },
        error: done
      });
    });
  });

  describe('refresh', () => {
    it('should clear cache and trigger reload', (done) => {
      cacheService.getUsers.and.returnValue(null);
      userApiService.getUsers.and.returnValue(of(mockUsers));
      service.refresh();
      service.getUsers().pipe(take(1)).subscribe({
        next: (users) => {
          expect(users).toEqual(mockUsers);
          expect(cacheService.clearUsers).toHaveBeenCalled();
          expect(userApiService.getUsers).toHaveBeenCalled();
          done();
        },
        error: done
      });
    });
  });
});

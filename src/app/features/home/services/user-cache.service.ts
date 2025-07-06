import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserCacheService {
  private cache = new Map<string, unknown>();

  set(key: string, data: unknown): void {
    this.cache.set(key, data);
  }

  get(key: string): unknown {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  setUsers(users: User[]): void {
    this.set('users', users);
  }

  getUsers(): User[] | null {
    const users = this.get('users');
    return users as User[] | null;
  }

  hasUsers(): boolean {
    return this.has('users');
  }

  clearUsers(): void {
    this.delete('users');
  }
}

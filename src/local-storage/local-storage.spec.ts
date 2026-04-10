
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve a value', () => {
    service.setValueInStore('testKey', 'testValue');
    const value = service.getValueFromStore('testKey');

    expect(value).toBe('testValue');
  });

  it('should clear storage', () => {
    service.setValueInStore('testKey', 'testValue');
    service.clearAll();

    const value = service.getValueFromStore('testKey');
    expect(value).toBeNull();
  });
});

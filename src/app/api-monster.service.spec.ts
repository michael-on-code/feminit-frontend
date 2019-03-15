import { TestBed } from '@angular/core/testing';

import { ApiMonsterService } from './api-monster.service';

describe('ApiMonsterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiMonsterService = TestBed.get(ApiMonsterService);
    expect(service).toBeTruthy();
  });
});

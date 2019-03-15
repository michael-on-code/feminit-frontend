import { TestBed } from '@angular/core/testing';

import { ApiReturnTypeService } from './api-return-type.service';

describe('ApiReturnTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiReturnTypeService = TestBed.get(ApiReturnTypeService);
    expect(service).toBeTruthy();
  });
});

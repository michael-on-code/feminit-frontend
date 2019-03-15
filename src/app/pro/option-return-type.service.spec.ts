import { TestBed } from '@angular/core/testing';

import { OptionReturnTypeService } from './option-return-type.service';

describe('OptionReturnTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptionReturnTypeService = TestBed.get(OptionReturnTypeService);
    expect(service).toBeTruthy();
  });
});

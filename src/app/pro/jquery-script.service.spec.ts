import { TestBed } from '@angular/core/testing';

import { JqueryScriptService } from './jquery-script.service';

describe('JqueryScriptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JqueryScriptService = TestBed.get(JqueryScriptService);
    expect(service).toBeTruthy();
  });
});

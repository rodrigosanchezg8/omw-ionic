import { TestBed } from '@angular/core/testing';

import { WideSharerService } from './wide-sharer.service';

describe('WideSharerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WideSharerService = TestBed.get(WideSharerService);
    expect(service).toBeTruthy();
  });
});

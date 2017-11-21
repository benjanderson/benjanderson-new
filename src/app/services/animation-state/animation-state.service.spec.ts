import { TestBed, inject } from '@angular/core/testing';

import { AnimationStateService } from './animation-state.service';

describe('AnimationStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationStateService]
    });
  });

  it('should be created', inject([AnimationStateService], (service: AnimationStateService) => {
    expect(service).toBeTruthy();
  }));
});

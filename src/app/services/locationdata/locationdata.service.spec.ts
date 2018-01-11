import { TestBed, inject } from '@angular/core/testing';

import { LocationdataService } from './locationdata.service';

describe('LocationdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationdataService]
    });
  });

  it('should be created', inject([LocationdataService], (service: LocationdataService) => {
    expect(service).toBeTruthy();
  }));
});

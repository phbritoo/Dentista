import { TestBed } from '@angular/core/testing';

import { ProteticoService } from './protetico.service';

describe('ProteticoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProteticoService = TestBed.get(ProteticoService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { WebworkToCanvasService } from './webwork-to-canvas.service';

describe('WebworkToCanvasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebworkToCanvasService = TestBed.get(WebworkToCanvasService);
    expect(service).toBeTruthy();
  });
});

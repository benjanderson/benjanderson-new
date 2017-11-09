import { TestBed, inject } from '@angular/core/testing';

import { AppInsightsService } from './app-insights.service';
import { AppInsights } from 'applicationinsights-js';

describe('AppInsightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppInsightsService]
    });
  });

  interface MockAppInsights {
    downloadAndSetup: jasmine.Spy;
    startTrackPage: jasmine.Spy;
    stopTrackPage: jasmine.Spy;
    trackException: jasmine.Spy;
    setAuthenticatedUserContext: jasmine.Spy;
    trackEvent: jasmine.Spy;
  }
  let mockAppInsights: MockAppInsights;
  let appInsightsService: AppInsightsService;

  beforeEach(inject([AppInsightsService], (service: AppInsightsService) => {
    appInsightsService = service;
    mockAppInsights = {
      downloadAndSetup: spyOn(AppInsights, 'downloadAndSetup'),
      startTrackPage: spyOn(AppInsights, 'startTrackPage'),
      stopTrackPage: spyOn(AppInsights, 'stopTrackPage'),
      trackException: spyOn(AppInsights, 'trackException'),
      setAuthenticatedUserContext: spyOn(AppInsights, 'setAuthenticatedUserContext'),
      trackEvent: spyOn(AppInsights, 'trackEvent'),
    };
  }));

  it('should be created', () => {
    expect(appInsightsService).toBeTruthy();
  });

  it('startTrackPage should be called', () => {
    // act
    appInsightsService.startTrackPage('foo');

    // assert
    expect(AppInsights.startTrackPage).toHaveBeenCalledWith('foo');
  });

  it('stopTrackPage should be called', () => {
    // act
    appInsightsService.stopTrackPage('bar');

    // assert
    expect(AppInsights.stopTrackPage).toHaveBeenCalledWith('bar', undefined, undefined, undefined);
  });

  it('trackException should be called', () => {
    // arrange
    const error: Error = new Error('exception');

    // act
    appInsightsService.trackException(error);

    // assert
    expect(AppInsights.trackException).toHaveBeenCalledWith(error, undefined, undefined, undefined, undefined);
  });

  it('setAuthenticatedUserContext should be called', () => {
    // act
    appInsightsService.setAuthenticatedUserContext('indentifier', 'user');

    // assert
    expect(AppInsights.setAuthenticatedUserContext).toHaveBeenCalledWith('indentifier', 'user');
  });

  it('trackEvent should be called', () => {
    // act
    appInsightsService.trackEvent('event');

    // assert
    expect(AppInsights.trackEvent).toHaveBeenCalledWith('event', undefined, undefined);
  });
});

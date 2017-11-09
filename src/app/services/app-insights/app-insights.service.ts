import { Injectable } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';

@Injectable()
export class AppInsightsService {

  private config: Microsoft.ApplicationInsights.IConfig = {
    instrumentationKey: 'fb7ec282-922c-4d13-8e3b-4ce2282d66be',
  };

  constructor() {
    if (!AppInsights.config) {
      AppInsights.downloadAndSetup(this.config);
    }
  }

  public startTrackPage(name?: string) {
    AppInsights.startTrackPage(name);
  }

  public stopTrackPage(name?: string, url?: string, properties?: { [name: string]: string }, measurements?: { [name: string]: number }) {
    // console.log(name, properties);
    AppInsights.stopTrackPage(name, url, properties, measurements);
  }

  public trackException(exception: Error,
    handledAt?: string,
    properties?: { [name: string]: string },
    measurements?: { [name: string]: number },
    severityLevel?: AI.SeverityLevel) {
    // console.log(exception);
    AppInsights.trackException(exception, handledAt, properties, measurements, severityLevel);
  }

  public setAuthenticatedUserContext(identifier: string, userName: string) {
    AppInsights.setAuthenticatedUserContext(identifier, userName);
  }

  public trackEvent(name: string,
    properties?: { [name: string]: string },
    measurements?: { [name: string]: number }) {
    // console.log(name, properties);
    AppInsights.trackEvent(name, properties, measurements);
  }
}



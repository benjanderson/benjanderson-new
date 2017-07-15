import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppInsightsService } from 'ng2-appinsights';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public showFooter = true;

    public theme: string;

    constructor(private appinsightsService: AppInsightsService, private router: Router) {
    }

    public ngOnInit(): void {
        this.appinsightsService.Init({
            instrumentationKey: '22828057-ee08-4280-a79b-ac327059ffb2'
        });

        this.router.events.map(event => {
            if (event instanceof NavigationEnd) {
                this.appinsightsService.trackPageView(event.url);

                if (event.url === '/') {
                    this.showFooter = true;
                    this.theme = 'theme-nature';
                } else {
                    this.showFooter = false;
                    this.theme = null;
                }
            }
        }).subscribe();
    }
}

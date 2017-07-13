import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppInsightsService } from 'ng2-appinsights';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private appinsightsService: AppInsightsService) {
    }

    public ngOnInit(): void {
        this.appinsightsService.Init({
            instrumentationKey: '22828057-ee08-4280-a79b-ac327059ffb2'
        });
    }
}

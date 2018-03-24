import { Component, OnInit, HostBinding } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { routerTransition, backgroundTransition } from './router.animations';
import { AnimationStateService } from './services/animation-state/animation-state.service';
import { AppInsightsService } from './services/app-insights/app-insights.service';

import { say } from 'cowsay';

@Component({
    selector: 'app-main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routerTransition, backgroundTransition]
})
export class AppComponent implements OnInit {
    public showFooter = true;

    constructor(private router: Router, private animationState: AnimationStateService, private appInsightsService: AppInsightsService) {
    }

    public getState(outlet): string {
        return outlet.activatedRouteData.state;
    }

    public ngOnInit(): void {
        console.log(say({ text: `Hi There! If you are looking in the console you are probably curious how I built this. Well look no more:
Source Code: Github, Host: Azure, Front end: angular, styling: bootstrap, backend: asp.net core. Oh and moo!` }));

        this.router.events.map(event => {
            if (event instanceof NavigationStart) {
                this.appInsightsService.startTrackPage(event.url);
            }
            if (event instanceof NavigationEnd) {
                this.appInsightsService.stopTrackPage(event.url);
                switch (event.url) {
                    case '/':
                    case '/about-me':
                        this.showFooter = true;
                        break;
                    default:
                        this.showFooter = false;
                        break;
                }
            }
        }).subscribe();
    }

    public animationStarted($event): void {
        this.animationState.emit({ name: 'started', $event });
    }

    public animationDone($event): void {
        this.animationState.emit({ name: 'finished', $event });
    }
}

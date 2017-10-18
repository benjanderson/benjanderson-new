import { Component, OnInit, HostBinding } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { routerTransition, backgroundTransition } from './router.animations';
import { AnimationStateService } from './services/animation-state.service';

@Component({
    selector: 'app-main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routerTransition, backgroundTransition]
})
export class AppComponent implements OnInit {
    public showFooter = true;

    constructor(private router: Router, private animationState: AnimationStateService) {
    }

    public getState(outlet): string {
        return outlet.activatedRouteData.state;
    }

    public ngOnInit(): void {
        // this.appinsightsService.Init({
        //     instrumentationKey: '22828057-ee08-4280-a79b-ac327059ffb2'
        // });

        this.router.events.map(event => {
            if (event instanceof NavigationEnd) {
                // this.appinsightsService.trackPageView(event.url);
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
        this.animationState.emit({name: 'started', $event});
    }

    public animationDone($event): void {
        this.animationState.emit({name: 'finished', $event});
    }
}

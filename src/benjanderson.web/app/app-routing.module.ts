import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, NavigationStart, NavigationEnd } from '@angular/router';

import { ColorTestComponent } from './color-test/color-test.component';
import { HomeComponent } from './home/home.component';
import { AppInsightsService } from "ng2-appinsights";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'color-test', component: ColorTestComponent, pathMatch: 'full' },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule implements OnInit {
    constructor(private router: Router, private appinsightsService: AppInsightsService) {
    }

    ngOnInit(): void {
        this.router.events.map(event => {
            if (event instanceof NavigationEnd){
                this.appinsightsService.trackPageView(event.url);
            }
        }).subscribe();
    }
}

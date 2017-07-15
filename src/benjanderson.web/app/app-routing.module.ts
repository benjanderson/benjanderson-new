import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, NavigationStart, NavigationEnd } from '@angular/router';

import { ColorTestComponent } from './color-test/color-test.component';
import { HomeComponent } from './home/home.component';
import { AppInsightsService } from 'ng2-appinsights';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'color-test', component: ColorTestComponent, pathMatch: 'full' },
    { path: 'about-me', component: AboutMeComponent, pathMatch: 'full' },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor() {
    }
}

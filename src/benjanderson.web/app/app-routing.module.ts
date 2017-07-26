import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, NavigationStart, NavigationEnd } from '@angular/router';

import { ColorTestComponent } from './color-test/color-test.component';
import { HomeComponent } from './home/home.component';
import { AppInsightsService } from 'ng2-appinsights';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
    { path: '', component: HomeComponent, data: { state: 'home' }},
    { path: 'color-test', component: ColorTestComponent, pathMatch: 'full', data: { state: 'color-test' }},
    { path: 'about-me', component: AboutMeComponent, pathMatch: 'full', data: { state: 'about-me' } },
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

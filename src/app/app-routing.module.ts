import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule, NavigationStart, NavigationEnd } from '@angular/router';


import { ColorTestComponent } from './color-test/color-test.component';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { DemoComponent } from './demo/demo.component';
import { ChessComponent } from './chess/chess.component';
import { BdayComponent } from './bday/bday.component';

const routes: Routes = [
    { path: '', component: HomeComponent, data: { state: 'home' } },
    { path: 'demo/color-test', component: ColorTestComponent, pathMatch: 'full', data: { state: 'demo' } },
    { path: 'demo/chess', component: ChessComponent, pathMatch: 'full', data: { state: 'demo' } },
    { path: 'demo', component: DemoComponent, pathMatch: 'full', data: { state: 'demo' } },
    { path: 'about-me', component: AboutMeComponent, pathMatch: 'full', data: { state: 'about-me' } },
    { path: 'bday', component: BdayComponent, pathMatch: 'full', data: { state: 'demo' }},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor() {
    }
}

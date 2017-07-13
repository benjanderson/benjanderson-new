import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { D3Service } from 'd3-ng2-service';
import { AppInsightsModule } from 'ng2-appinsights';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorTestComponent } from './color-test/color-test.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ColorTestGraphComponent } from './color-test-graph/color-test-graph.component';

@NgModule({
    declarations: [
        AppComponent,
        ColorTestComponent,
        HomeComponent,
        NavBarComponent,
        ColorTestGraphComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        DndModule.forRoot(),
        NgbModule.forRoot(),
        AppInsightsModule
    ],
    providers: [D3Service],
    bootstrap: [AppComponent]
})
export class AppModule { }

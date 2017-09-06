import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { D3Service } from 'd3-ng2-service';
import { AppInsightsModule } from 'ng2-appinsights';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorTestComponent } from './color-test/color-test.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ColorTestGraphComponent } from './color-test-graph/color-test-graph.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { FooterComponent } from './footer/footer.component';
import { DemoComponent } from './demo/demo.component';
import { AnimationStateService } from './services/animation-state.service';

@NgModule({
    declarations: [
        AppComponent,
        ColorTestComponent,
        HomeComponent,
        NavBarComponent,
        ColorTestGraphComponent,
        AboutMeComponent,
        FooterComponent,
        DemoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        DndModule.forRoot(),
        NgbModule.forRoot(),
        AppInsightsModule,
        BrowserAnimationsModule,
        LazyLoadImageModule
    ],
    providers: [D3Service, AnimationStateService],
    bootstrap: [AppComponent]
})
export class AppModule { }

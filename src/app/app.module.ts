import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DndModule } from 'ng2-dnd';
import { D3Service } from 'd3-ng2-service';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorTestComponent } from './color-test/color-test.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ColorTestGraphComponent } from './color-test-graph/color-test-graph.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { FooterComponent } from './footer/footer.component';
import { DemoComponent } from './demo/demo.component';
import { AnimationStateService } from './services/animation-state/animation-state.service';
import { ChessComponent } from './chess/chess.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppInsightsService } from './services/app-insights/app-insights.service';
import { BdayComponent } from './bday/bday.component';

const firebaseConfig = {
    apiKey: 'AIzaSyCvXguqBaF3o7jLYbphvszZYZGYuGfWvYA',
    authDomain: 'benjaminjanderson-3e4d2.firebaseapp.com',
    databaseURL: 'https://benjaminjanderson-3e4d2.firebaseio.com',
    projectId: 'benjaminjanderson-3e4d2',
    storageBucket: 'benjaminjanderson-3e4d2.appspot.com',
    messagingSenderId: '796516811904'
  };

@NgModule({
    declarations: [
        AppComponent,
        ColorTestComponent,
        HomeComponent,
        NavBarComponent,
        ColorTestGraphComponent,
        AboutMeComponent,
        FooterComponent,
        DemoComponent,
        ChessComponent,
        BdayComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        DndModule.forRoot(),
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule
    ],
    providers: [D3Service, AnimationStateService, AppInsightsService],
    bootstrap: [AppComponent]
})
export class AppModule { }

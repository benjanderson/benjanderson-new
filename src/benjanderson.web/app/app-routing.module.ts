import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorTestComponent } from './color-test/color-test.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'color-test', component: ColorTestComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

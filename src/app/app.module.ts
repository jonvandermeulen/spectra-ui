import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Reflect from 'reflect-metadata';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArrangementComponent } from './arrangement/arrangement.component';
import { ChartsModule } from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { ComposerComponent } from './composer/composer.component';
import { MusicPartComponent } from './music-part/music-part.component';



@NgModule({
  declarations: [
    AppComponent,
    ArrangementComponent,
    GraphComponent,
    ComposerComponent,
    MusicPartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

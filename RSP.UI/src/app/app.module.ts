import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { GamesComponent } from './games/games.component';
import { NgxsModule } from '@ngxs/store';
import { GameService } from './services/gameservice';
import { SignalRService } from './services/signalrservice';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,
    NgxsModule.forRoot([
    ])
  ],
  providers: [GameService,SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }

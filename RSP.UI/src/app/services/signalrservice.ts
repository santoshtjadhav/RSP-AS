import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  bookChanges$ = new Subject<Game>();
  messages$ = new Subject<string>();
  gameComplete$ = new Subject<boolean>();
  remainingtime$ = new Subject<string>();
  baseUrl = environment.signalRUrl;
  signalRUrl = this.baseUrl + 'game';
  connectionId:string;
private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(this.signalRUrl)
                            .configureLogging(signalR.LogLevel.Information)
                            .build();

    this.hubConnection
      .start()      
      .then(() => {console.log('Connection started')})
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  public broadcastgamedata = (game: Game) => {
    this.hubConnection.invoke('broadcastgamedata', game)
    .catch(err => console.error(err));    
  }
  public startgame = (game: Game) => {
    this.hubConnection.invoke('startgame', game)
    .catch(err => console.error(err));    
  }

  public addplayer2 = (groupId: string) => {
    this.hubConnection.invoke('addplayer2', groupId)
    .catch(err => console.error(err));    
  }

  public notify = (groupId: string,message: string) => {
    this.hubConnection.invoke('notify',groupId,message)
    .catch(err => console.error(err));    
  }
  
  public gameComplete = (groupId: string) => {
    this.hubConnection.invoke('gamecomplete',groupId)
    .catch(err => console.error(err));    
  }

  public notifyincrement = (groupId: string,message: string) => {
    this.hubConnection.invoke('notifyincrement',groupId,message)
    .catch(err => console.error(err));    
  }

  public addBroadcastGameDataListener = () => {
    this.hubConnection.on('broadcastgamedata', (game) => {
      this.bookChanges$.next(game);
    })
  }
  public addNotificationListener = () => {
    this.hubConnection.on('notify', (message) => {
      this.messages$.next(message);      
    })
  }  
  public addIncrementNotificationListener = () => {
    this.hubConnection.on('notifyincrement', (message) => {
      this.remainingtime$.next(message);      
    })
  }  
  public gameCompleteListener = () => {
    this.hubConnection.on('gamecomplete', (message) => {
      this.gameComplete$.next(message);      
    })
  }
}
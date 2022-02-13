import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Game } from '../models/game';
import { group } from '@angular/animations';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    baseUrl = environment.apiUrl;
    gameUrl = this.baseUrl ;

    constructor(private http: HttpClient) { }
    getGame(): Observable<Game> {
        return this.http.get<Game>(this.gameUrl + 'game')
            .pipe(
                catchError(this.handleError)
            );
    }
    
    addplayer2(connectionId:string,groupId:string): Observable<Game> {
        return this.http.get<Game>(this.gameUrl + '/addplayer2?cid='+connectionId+'&gid=' +groupId)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            let errMessage = error.error.message;
            return throwError(() => new Error(errMessage));
        }
        return throwError(() => new Error(error.message || 'Node.js server error'));
    }
}

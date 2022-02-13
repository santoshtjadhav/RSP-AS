// import { Injectable, AfterViewInit } from '@angular/core';
// import * as signalR from '@aspnet/signalr';

// @Injectable()
// export class GameService {
// 	public currentPlayersOnline = 0;
// 	public connection: any;

// 	constructor() { this.initConnection(); }

// 	private async initConnection() {
// 		this.connection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/game').build();
		
// 		await this.connection.start().catch(error => console.log(error));
// 	}

// 	public async setChoice(id: number) {
//     console.log(id);
// 		await this.connection.send('SetChoice', id);
// 	}
// }

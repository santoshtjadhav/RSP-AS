import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../services/gameservice';
import { SignalRService } from '../services/signalrservice';
import { Game } from '../models/game';
import { Player } from '../models/Player';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { group } from '@angular/animations';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, OnDestroy {
	public game: Game;
	public messages: string[] = [];
	public isCPU1 = false;
	public isCPU2 = false;
	public isPlayer1 = false;
	public isPlayer2 = false;
	public player1Choice = 0;
	public player2Choice = 0;
	public player2URL:string;
	public showURL=true;		
	public countdownInterv: any;
	public remainingTime = 10;
	public remainingsec:string;
	public outcome = 0;	


	constructor(private signalRService: SignalRService, private gameService: GameService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.signalRService.startConnection();
		this.signalRService.addBroadcastGameDataListener();
		this.signalRService.addIncrementNotificationListener();
		this.signalRService.gameCompleteListener();
		this.signalRService.bookChanges$.subscribe((game: Game) => {
			this.game = game;			
		});
		this.signalRService.gameComplete$.subscribe((complete:Boolean)=>{
			if(complete)		
				this.reset();
		}
		);
		this.signalRService.addNotificationListener();
		this.signalRService.messages$.subscribe((message: string) => {
			this.messages.push(message);
		});
		this.signalRService.remainingtime$.subscribe((message: string) => {
				this.remainingsec =  "You have "+ message + " seconds to complete game"
		});


		this.route.queryParams.subscribe(params => {
			
			let groupId = params['gid'];
			if(groupId)
				{
					setTimeout(() => {
						this.SetPlayer2(groupId)
					 }, 3000);};
		});
		
	}

SetPlayer2(groupId: any) {
	this.signalRService.addplayer2(groupId);
	this.isPlayer2=true;
	this.countdownInterv = setInterval(() => {
		this.remainingTime -= 1;
		console.log(this.remainingTime);
		if (this.remainingTime === 0) {
			clearInterval(this.countdownInterv);
			this.finishGame();
		}
		this.signalRService.notifyincrement(this.game.groupId,this.remainingTime.toString());
	}, 1000);		
	
}


startGame(): void {
	this.game = new Game();
	this.game.isActive = true;
	this.game.groupId = Guid.newGuid();
	this.game.player1 = new Player();
	this.game.player1.name = "Player1";
	this.signalRService.startgame(this.game);
	this.signalRService.broadcastgamedata(this.game);
	this.isPlayer1 = true;
	this.player2URL = environment.appUrl + '?gid=' + this.game.groupId
	this.showURL=false;
}


	public choose(id: number, player: number) {
	if (this.player1Choice === 0 && player == 1) {
		this.player1Choice = id;
		this.game.player1.choice=this.player1Choice;
		this.signalRService.broadcastgamedata(this.game);
		this.signalRService.notify(this.game.groupId,"Player 1 has set the option")
	}

	if (this.player1Choice === 0 && player == 2) {
		this.player2Choice = id;
		this.game.player2.choice=this.player2Choice;
		this.signalRService.broadcastgamedata(this.game);
		this.signalRService.notify(this.game.groupId,"Player 2 has set the option")		
	}
}


	public finishGame() {	
		console.log(this.game.player1.choice);	
		console.log(this.game.player2.choice);
	this.outcome = this.getOutcome(this.game.player1.choice, this.game.player2.choice);
	console.log(this.outcome);
	switch (this.outcome) {
		case 0:
			this.signalRService.notify(this.game.groupId,'It is a draw');
			this.signalRService.gameComplete(this.game.groupId);
			break;
		case 1:
			this.signalRService.notify(this.game.groupId,'Player2 won........');
			this.signalRService.gameComplete(this.game.groupId);
			break;
		case 2:
			this.signalRService.notify(this.game.groupId,'Player1 won........');
			this.signalRService.gameComplete(this.game.groupId);
			break;

		default:
			this.signalRService.gameComplete(this.game.groupId);
			break;
	}
}
  public reset() {		
	this.isCPU1 = false;
	this.isCPU2 = false;
	this.isPlayer1 = false;
	this.isPlayer2 = false;
	this.player1Choice = 0;
	this.player2Choice = 0;
	this.player2URL="";
	this.showURL=true;			
	this.remainingTime = 10;
	this.remainingsec="";
	this.outcome = 0;		
	clearInterval(this.countdownInterv);
}

	public disabledropdown(event: any)
{
	if (event.currentTarget.value == 1)
	{
		this.isCPU1 = event.currentTarget.checked;
		if(this.isCPU1){		
			this.player1Choice=Math.floor(Math.random() * 3) + 1;
			this.signalRService.notify(this.game.groupId,"Player 1 has opted to play as AI :)");
		}
		else
		{
			this.player1Choice=0;
			this.signalRService.notify(this.game.groupId,"Player 1 has opted to play as self :)");
		}
		
	}
	if (event.currentTarget.value == 2)
	{
		this.isCPU2 = event.currentTarget.checked;
		if(this.isCPU2)		
		{
			this.player2Choice=Math.floor(Math.random() * 3) + 1;
			this.signalRService.notify(this.game.groupId,"Player 2 has opted to play as AI :)");
		}
		else
		{
			this.player2Choice=0;
			this.signalRService.notify(this.game.groupId,"Player 2 has opted to play as self :)");
		}
	}	
}
	
	private getOutcome(myChoice, enemyChoice) {
	if (myChoice === enemyChoice) {
		return 0;
	}
	if (myChoice === 1 && enemyChoice === 2) {
		return 1;
	}
	if (enemyChoice === 1 && myChoice === 2) {
		return 2;
	}

	if (myChoice === 2 && enemyChoice === 3) {
		return 1;
	}
	if (enemyChoice === 2 && myChoice === 3) {
		return 2;
	}

	if (myChoice === 3 && enemyChoice === 1) {
		return 1;
	}
	if (enemyChoice === 3 && myChoice === 1) {
		return 2;
	}
}
ngOnDestroy() {
}

}

export class Guid {
	static newGuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}


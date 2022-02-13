// import { State, Action, StateContext, Store } from '@ngxs/store';
// import { Game } from './Game';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { GamesHubService } from '../games/games-hub.service';
// import { GamePushedAction, GameChangedAction, TestAction, SaveAction } from './GameEditActions';
// import { Injectable } from '@angular/core';

// export class OpenGameAction {
//   static readonly type = '[GameEdit] OpenGameAction';
// }

// export class GameEditStateModel {
//   game: Game;
//   users: string[];
//   isChanged: boolean;
// }



// @State<GameEditStateModel>({
//   name: 'gameEdit',
//   defaults: { game: null, users: [], isChanged: false }
// })
// @Injectable()
// export class GameEditState {

//   constructor(
//     private gamesHub: GamesHubService
//   ) {}

//   @Action(GamePushedAction)
//   GamePushed(ctx: StateContext<GameEditStateModel>, action: GamePushedAction) {
//     console.log('GamePushedAction handler ', action);
//     const state = ctx.getState();
//     ctx.setState(action.payload);
//   }

//   @Action(GameChangedAction)
//   GameChanged(ctx: StateContext<GameEditStateModel>, action: GameChangedAction) {
//     this.gamesHub.gameChanged(action.payload);
//   }

//   @Action(SaveAction)
//   SaveAction(ctx: StateContext<GameEditStateModel>, action: SaveAction) {
//     console.log('SaveAction Handler');
//     this.gamesHub.saveGame(action.payload);
//   }

//   @Action(TestAction)
//   TestAction(ctx: StateContext<GameEditStateModel>, action: TestAction) {
//     console.log('TestActionHandler');
//     const state = ctx.getState();
//     ctx.setState({
//       ...state
//     });
//   }

// }

// import { State, Action, StateContext, Store } from '@ngxs/store';
// import { Game } from './Game';
// import { GamesHubService } from '../games/games-hub.service';
// import {
//   SubscribeGameListAction,
//   GameListPushedAction,
//   UnSubscribeGameListAction
//   } from './GameListActions';
// import { Injectable } from '@angular/core';


// export class GameListStateModel {
//   games: Game[];
// }

// @State<GameListStateModel>({
//   name: 'gameList',
// })
// @Injectable()
// export class GameListState {

//   constructor(
//     private gamesHub: GamesHubService
//   ) {}

//   @Action(SubscribeGameListAction)
//   SubscribeGameList(ctx: StateContext<GameListStateModel>, action: SubscribeGameListAction) {
//     this.gamesHub.subscribeGameList();
//   }

//   @Action(UnSubscribeGameListAction)
//   UbSubscribeGameList(ctx: StateContext<GameListStateModel>, action: UnSubscribeGameListAction) {
//     this.gamesHub.unSubscribeGameList();
//   }

//   @Action(GameListPushedAction)
//   GameListPushed(ctx: StateContext<GameListStateModel>, action: GameListPushedAction) {
//     console.log('GameListPushedAction handler');
//     const state = ctx.getState();
//     ctx.setState({
//       ...state,
//       games: action.gameList
//     });
//   }

// }





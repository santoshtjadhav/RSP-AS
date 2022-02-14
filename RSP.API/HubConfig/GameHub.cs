using Microsoft.AspNetCore.SignalR;
using RSP.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSP.HubConfig
{
    public class GameHub : Hub
    {
        public async Task StartGame(Game data)
        {
            data.Player1.ConnectionId = Context.ConnectionId;
            DataStorage.DataManager.Games.Add(data);
            await Groups.AddToGroupAsync(Context.ConnectionId, data.GroupId);
            await Clients.Group(data.GroupId).SendAsync("broadcastgamedata", data);
            await Clients.Group(data.GroupId).SendAsync("notify", $"{ data.Player1.Name} started new game");

        }

        public async Task BroadcastGameData(Game data) 
        { 
            await Clients.Group(data.GroupId).SendAsync("broadcastgamedata", data);            
        }

        public async Task AddPlayer2(string groupId)
        {
            Game data = DataStorage.DataManager.Games.FirstOrDefault(x => x.GroupId == groupId);
            data.Player2 = new Player();
            data.Player2.ConnectionId = Context.ConnectionId;
            data.Player2.Name = "Player2";
            await Groups.AddToGroupAsync(Context.ConnectionId, data.GroupId);
            await Clients.Group(data.GroupId).SendAsync("broadcastgamedata", data);
            await Clients.Group(data.GroupId).SendAsync("notify", $"{ data.Player2.Name} excepted challenge");
        }

        public async Task notify(string groupId,string message)
        {
            await Clients.Group(groupId).SendAsync("notify", message);
        }

        public async Task GameComplete(string groupId)
        {
            var itemToRemove = DataStorage.DataManager.Games.Single(r => r.GroupId == groupId);
            DataStorage.DataManager.Games.Remove(itemToRemove);
            await Clients.Group(groupId).SendAsync("gamecomplete", true);
        }

        public async Task notifyIncrement(string groupId, string message)
        {
            await Clients.Group(groupId).SendAsync("notifyIncrement", message);
        }

    }
}

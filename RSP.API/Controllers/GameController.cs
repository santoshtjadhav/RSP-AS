using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RSP.DataStorage;
using RSP.HubConfig;
using RSP.Models;

namespace RSP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IHubContext<GameHub> _hub; 

        public GameController(IHubContext<GameHub> hub) 
        { 
            _hub = hub;
        }

        public IActionResult Get()
        { 
            //var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transfergamedata", DataManager.GetData())); 
            
            return Ok(new { Message = "Request Completed" }); 
        }

        [HttpGet("addplayer2")]
        public async Task<ActionResult<Game>> AddPlayer2Async(string groupId,string connectionId )
        {
            Game data = DataStorage.DataManager.Games.FirstOrDefault(x => x.GroupId == groupId);
            data.Player2.ConnectionId = connectionId;
            await _hub.Groups.AddToGroupAsync(connectionId, data.GroupId);
            await _hub.Clients.Group(data.GroupId).SendAsync("broadcastgamedata", data);
            await _hub.Clients.Group(data.GroupId).SendAsync("notify", $"{ data.Player1.Name} started new game");
            return Ok("All ok");

        }

    }
}
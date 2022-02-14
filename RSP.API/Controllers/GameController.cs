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
    }
}
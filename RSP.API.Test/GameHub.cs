using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Moq;
using NUnit.Framework;
using RSP.HubConfig;
using RSP.Models;

namespace RSP.API.Test
{
    [TestFixture]
    public class GameHubTest
    {
        [Test]
        public async Task SignalR_OnStartGame_ShouldReturnWithPlayer1()
        {
            // arrange
            Mock<IHubCallerClients> mockClients = new Mock<IHubCallerClients>();
            Mock<IClientProxy> mockClientProxy = new Mock<IClientProxy>();
            mockClients.Setup(clients => clients.All).Returns(mockClientProxy.Object);
            Mock<HubCallerContext> mockClientContext = new Mock<HubCallerContext>();
            mockClientContext.Setup(c => c.ConnectionId).Returns(Guid.NewGuid().ToString);
            var mockGroupManager = new Mock<IGroupManager>();
            var mockClientProxyParticipants = new Mock<IClientProxy>();


            GameHub gameHub = new GameHub()
            {
                Clients = mockClients.Object,
                Context=mockClientContext.Object,
                Groups=mockGroupManager.Object,
            };

            Game game = new Game
            {
                GroupId = "Test",
                Player1 = new Player { Name = "Player1" }
            };
            mockClients.Setup(clients => clients.Group(game.GroupId)).Returns(mockClientProxyParticipants.Object);

            // act
            await gameHub.StartGame(game);


            // assert
            mockClients.Verify(clients => clients.Group("Test"), Times.AtLeast(2));
        }
    }
}
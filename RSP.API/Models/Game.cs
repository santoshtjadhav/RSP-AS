using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RSP.Models
{
    public class Game
    {
        public Player Player1 { get; set; }
        public Player Player2 { get; set; }        
        public string GroupId { get; set; }        
        public bool IsActive { get; set; }

        public void AddPlayer(Player player)
        {
            if (this.Player1 == null)
                this.Player1 = player;
            else
                this.Player2 = player;
        }

        public void AddChoice(Player player, int choice)
        {
            if (this.Player1.Name == player.Name)
                this.Player1.Choice = choice;
            else
                this.Player2.Choice = choice;
        }
    }
}

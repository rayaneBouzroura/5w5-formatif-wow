using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            _pizzaManager.AddUser();
            await Clients.All.SendAsync("updateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _pizzaManager.RemoveUser();
            await Clients.All.SendAsync("updateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
        }

        public async Task SelectChoice(PizzaChoice choice)
        {

            //handle le groupe
            string groupName = _pizzaManager.GetGroupName(choice);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            //gestion data pizza
            int prix = _pizzaManager.PIZZA_PRICES[(int)choice];
            int grpMoney = _pizzaManager.Money[(int)choice];
            int grpPizza = _pizzaManager.NbPizzas[(int)choice];

            await Clients.Caller.SendAsync("UpdatePizzaPrice", prix);
            await Clients.Group(groupName).SendAsync("UpdateNbPizzasAndMoney", new {grpPizza,grpMoney });


        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            //remove user from current group if he is present
            //handle le groupe
            string groupName = _pizzaManager.GetGroupName(choice);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId,groupName);

        }

        public async Task AddMoney(PizzaChoice choice)
        {
            //recup grp
            string groupName = _pizzaManager.GetGroupName(choice);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            //use le service
            _pizzaManager.IncreaseMoney(choice);
            //recup updated data :
            int grpMoney = _pizzaManager.Money[(int)choice];
            int grpPizza = _pizzaManager.NbPizzas[(int)choice];
            //broadcast to grp the new data
            await Clients.Group(groupName).SendAsync("UpdateNbPizzasAndMoney", new { grpPizza, grpMoney });
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            //recup grp
            string groupName = _pizzaManager.GetGroupName(choice);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            //use le service
            _pizzaManager.BuyPizza(choice);
            //recup updated data :
            int grpMoney = _pizzaManager.Money[(int)choice];
            int grpPizza = _pizzaManager.NbPizzas[(int)choice];
            //broadcast to grp the new data
            await Clients.Group(groupName).SendAsync("UpdateNbPizzasAndMoney", new { grpPizza, grpMoney });
        }
    }
}

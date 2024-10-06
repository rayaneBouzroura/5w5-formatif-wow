import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite

    //update nb of connected users :
    this.hubConnection.on('updateNbUsers', (data) => {
      this.nbUsers = data;
    });
    this.hubConnection.on('UpdatePizzaPrice', (data) => {
      console.log('update UpdatePizzaPrice received');
      console.log(data);
      this.pizzaPrice = data;
    });
    this.hubConnection.on('UpdateNbPizzasAndMoney', (data) => {
      console.log('update UpdateNbPizzasAndMoney received');
      console.log(data);
      //manipulate the data
      this.nbPizzas = data.grpPizza;
      this.money = data.grpMoney;

    });








    //we connectto hub
    this.hubConnection
    .start()
    .then(()=>{
      this.isConnected = true;
    })
    .catch(err=> console.log('err while connecting :',err));
  }

  selectChoice(selectedChoice:number) {
    this.hubConnection?.invoke("SelectChoice",selectedChoice)
    this.selectedChoice = selectedChoice;

  }

  unselectChoice() {
    this.selectedChoice = -1;
  }

  addMoney() {
    this.hubConnection?.invoke("AddMoney",this.selectedChoice);
  }

  buyPizza() {
    this.hubConnection?.invoke("BuyPizza",this.selectedChoice);

  }
}

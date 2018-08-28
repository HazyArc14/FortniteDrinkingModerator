const Discord = require('discord.js');
const client = new Discord.Client();

var isReady = true;
var gameInProgress = false;

var zachId = "<@148630426548699136>";
var kelsoId = "<@93105200365043712>";
var loreanId = "<@275384050884280320>";

const embed = {
  "title": "Welcome to the Fortnite Drinking Game",
  "description": "I have been created to guide you through the night. Besides the rules below I will be selecting people at random. When I select someone they will either have to drink or choose someone else to drink, and I will be the one the make that decision!",
  "color": 2919500,
  "footer": {
    "text": "Let the Games Begin and Remember to Drink Responsibly!"
  },
  "image": {
    "url": "https://static.hub.game/i/post/469/content/9ffcee5a15019d38.jpg?740-autov1"
  },
  "fields": [
    {
      "name": "Drinking Rules: (Drink for 5 Seconds Unless Otherwise Specified)",
      "value": "1: Got Knocked?\n2: Did You Just Jump Off the Mountain?\n3: Was that a Wick?\n4: Forced to Dance?\n5: Lorena Killed Someone?!?! Drink 1 Second for Every Kill"
    }
  ]
};

function timeUntilNextDraw() {
  // var returnValue = Math.random() * (600000 - 300000) + 300000;
  var returnValue = Math.random() * (15000 - 5000) + 5000;
  console.log("Next Drawing in " + returnValue);
  return returnValue
}

function startGame(message) {

  client.user.setPresence({
    game: {
      name: "Let's Drink!",
      type: 0
    }
  }).then(console.log)
    .catch(console.error);

  message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);

  message.channel.send({ embed });

}

function gameLoop(message) {

  if (gameInProgress) {

    setTimeout(() => {
      makeDrinkDecision(message);
      gameLoop(message);
    }, timeUntilNextDraw());

  }

}

function makeDrinkDecision(message) {

  switch(Math.floor(Math.random() * 1)) {
    case 0:
      tellPlayerToDrink(message);
      break;
    case 1:
      tellPlayerToChoose(message);
      break;
  }

}

function tellPlayerToDrink(message) {

  switch(Math.floor(Math.random() * 3)) {
    case 0:
      message.channel.send("Switch 0");
      message.channel.send(zachId + "Time to Drink!!!");
      break;
    case 1:
      message.channel.send("Switch 1");
      message.channel.send(zachId + "Time to Drink!!!");
      break;
    case 2:
      message.channel.send("Switch 2");
      message.channel.send(zachId + "Time to Drink!!!");
      break;
  }

}

function tellPlayerToChoose(message) {

  switch(Math.floor(Math.random() * 3)) {
    case 0:
      message.channel.send("Switch 0");
      message.channel.send(zachId + "Choose Who Drinks!!!");
      break;
    case 1:
      message.channel.send("Switch 1");
      message.channel.send(zachId + "Choose Who Drinks!!!");
      break;
    case 2:
      message.channel.send("Switch 2");
      message.channel.send(zachId + "Choose Who Drinks!!!");
      break;
  }

}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {

  if(message.author.bot) return;

  if(isReady) {

    if (message.content.indexOf('!startGame') === 0 && message.author.id == "148630426548699136") {

      gameInProgress = true;
      startGame(message);

      setTimeout(() => {
        message.channel.send(zachId + "Time to Drink!!!");
        // message.channel.send(zachId + " " + kelsoId + " " + loreanId + " Time to Drink!!!");
        gameLoop(message);
      }, 10000);

      // while(gameInProgress) {

      //   setTimeout(() => {
      //     makeDrinkDecision(message);
      //   }, timeUntilNextDraw());

      // }

    }

    if (message.content.indexOf('!stopGame') === 0 && message.author.id == "148630426548699136") {

      gameInProgress = false;

      message.channel.send("The Fortnite Drinking Game is Now Over. Thanks for Playing and Good Luck Tomorrow!");

    }

  }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
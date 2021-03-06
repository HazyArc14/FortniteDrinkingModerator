const Discord = require('discord.js');
const client = new Discord.Client();

var isReady = true;
var gameInProgress = false;

let zachId = "<@148630426548699136>";
let kelsoId = "<@93105200365043712>";
let loreanId = "<@275384050884280320>";

const embed = {
  "title": "Welcome to the Fortnite Drinking Game",
  "description": "I have been created to guide you through this night of celebration and below I have a few drinking rules that you must follow. Besides those rules I will be randomly selecting one person every 2-4 minutes, and when I select that person they will either have to drink or choose someone else to drink. I will be the one the make that decision!",
  "color": 2919500,
  "footer": {
    "text": "Let the Games Begin and Remember to Drink Responsibly!"
  },
  "image": {
    "url": "https://static.hub.game/i/post/469/content/9ffcee5a15019d38.jpg?740-autov1"
  },
  "fields": [
    {
      "name": "Drinking Rules: (Drink for 2 Seconds Unless Otherwise Specified)",
      "value": "1: Got Knocked?\n2: Did You Just Jump Off the Mountain?\n3: Was that a Wick?\n4: Forced to Dance?\n5: Lorena Killed Someone?!?! Drink 5 Seconds for Every Kill\n\nOne Last Note: These rules can stack. For example if you get implused off a mountain and get knocked, then you have to drink for 10 seconds! :)"
    }
  ]
};

function timeUntilNextDraw() {
  var returnValue = Math.random() * (120000 - 240000) + 240000;
  // var returnValue = Math.random() * (15000 - 5000) + 5000;
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
      tellPlayerToDrink(message);
      gameLoop(message);
    }, timeUntilNextDraw());

  }

}

function makeDrinkDecision(message) {

  if (gameInProgress) {

    switch(Math.floor(Math.random() * 2)) {
      case 0:
        tellPlayerToDrink(message);
        break;
      case 1:
        tellPlayerToChoose(message);
        break;
    }

  }

}

function tellPlayerToDrink(message) {

  switch(Math.floor(Math.random() * 3)) {
    case 0:
      // message.channel.send("Switch 0");
      message.channel.send(zachId + " Time to Drink!!!");
      break;
    case 1:
      // message.channel.send("Switch 1");
      message.channel.send(kelsoId + " Time to Drink!!!");
      break;
  }

}

function tellPlayerToChoose(message) {

  switch(Math.floor(Math.random() * 3)) {
    case 0:
      // message.channel.send("Switch 0");
      message.channel.send(zachId + " Choose Who Drinks!!!");
      break;
    case 1:
      // message.channel.send("Switch 1");
      message.channel.send(kelsoId + " Choose Who Drinks!!!");
      break;
  }

}

function clearMessages(message) {

  const botID = "483829568218595339";

  message.channel.fetchMessages({
    limit: 100,
  }).then((messages) => {
   
    messages = messages.filter(m => m.author.id === botID).array();
    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));

  });

}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {

  if(message.author.bot) return;

  if(isReady) {

    if (message.content.indexOf('!startGame') === 0 && message.author.id == "148630426548699136") {

      gameInProgress = true;
      // startGame(message);

      setTimeout(() => {
        // message.channel.send("How About We Get the Night Started on the Right Foot!");
        // message.channel.send(zachId + " Drink for 10 Seconds!!!")
        // message.channel.send(zachId + " " + kelsoId + " " + loreanId + " Drink for 10 Seconds!!!");
        gameLoop(message);
      }, 15000);

    }

    if (message.content.indexOf('!stopGame') === 0 && message.author.id == "148630426548699136") {

      gameInProgress = false;

      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

      message.channel.send("The Fortnite Drinking Game is Now Over. Thanks for Playing and Good Luck Tomorrow!");

    }

    if (message.content.indexOf('!clear') === 0 && message.author.id == "148630426548699136") {

      clearMessages(message);

      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

    }

  }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
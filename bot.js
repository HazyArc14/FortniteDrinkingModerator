const Discord = require('discord.js');
const client = new Discord.Client();

var isReady = true;

var zachId = 148630426548699136;
var kelsoId = 93105200365043712;
var loreanId = 275384050884280320;

const embed = {
  "title": "Welcome to the Fortnite Drinking Game",
  "description": "I have been created to guide you through the night. Besides the rules below I will be selecting people at random. When I select someone they will either have to drink or choose someone else to drink, and I will be the one the make that decison!",
  "color": 2919500,
  "footer": {
    "text": "Let the Games Begin and Remember to Drink Responsibly!"
  },
  "image": {
    "url": "https://static.hub.game/i/post/469/content/9ffcee5a15019d38.jpg?740-autov1"
  },
  "fields": [
    {
      "name": "Drinking Rules:",
      "value": "1: Got Knocked? Drink for 2 Seconds\n2: Lorena Killed Someone?!?! Drink 1 Second for Every Kill\n3: Was that a Wick? Drink for 5 Seconds\n4: Forced to Dance? Drink for 2 Seconds\n5: Did You Just Jump Off the Mountain? Drink for 5 Seconds"
    }
  ]
};

function randomWholeNum(value) {
    return Math.floor(Math.random() * value) + 1;
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

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {

  if(message.author.bot) return;

  if(isReady) {
      
    if (message.content.indexOf('!help') === 0) {

      message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);

      var helpResponse = "```Commands:\n!startGame```";
      
      message.channel.send(helpResponse);

    }

    if (message.content.indexOf('!startGame') === 0 && message.author.id == "148630426548699136") {

      startGame(message);

      setTimeout(() => {
        message.channel.send("```Time to Drink!!!\n@'" + zachId + "'```");
      }, 20000);

      // if (typeof splitMessage[1] === 'undefined') {
      //   triggerAudio(message, "celsoHere", "");
      // } else {
      //   triggerAudio(message, "celsoHere", splitMessage[1]);
      // }

    }

    // message.channel.send(msgResponse);

    // message.delete()
    //     .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    //     .catch(console.error);

    setTimeout(() => {
        // Allows for the Game Name to be Set After 5 Minutes
        allowStatusUpdate = true;
      }, 300000);

    // try {
    //   voiceChannel.join().then(connection => {
    //     const dispatcher = connection.playFile("./assets/audio/" + trigger + ".mp3");
    //     dispatcher.on("end", end => {
    //         voiceChannel.leave();
    //     });
    //   }); 
    // } catch(err) {
    //   return;   
    // }

  }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
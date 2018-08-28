const Discord = require('discord.js');
const client = new Discord.Client();

var isReady = true;

const embed = {
  "title": "Welcome to the Fortnite Drinking Game",
  "description": "I have been created to guide you through the night.",
  "color": 2919500,
  "footer": {
    "text": "Have Fun and Remember to Drink Responsibly!"
  },
  "image": {
    "url": "https://static.hub.game/i/post/469/content/9ffcee5a15019d38.jpg?740-autov1"
  },
  "fields": [
    {
      "name": "Drinking Rules:",
      "value": "1: \n2: \n3: \n4: \n5:"
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

    // setTimeout(() => {
    //     // Allows for the Game Name to be Set After 5 Minutes
    //     allowStatusUpdate = true;
    //   }, 300000);

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
const Discord = require('discord.js');
const client = new Discord.Client();

var isReady = true;

const startGameEmbed = new Discord.RichEmbed()
  .setTitle("Welcome to the Fortnite Drinking Game")
  .setAuthor("Fortnite Drinking Moderator", "./assets/profile.png")
  .setColor(0x2EEB3E)
  .setDescription("I have been created to guide you through the night.")
  .setFooter("Have Fun and Remember to Drink Responsibly!")
  .setThumbnail("./assets/drinking.jpg")
  .setTimestamp()
  .addField("This is a field title, it can hold 256 characters",
    "This is a field value, it can hold 2048 characters.");

const embed = new Discord.RichEmbed()
  .setTitle("Welcome to the Fortnite Drinking Game")
  .setAuthor("Fortnite Drinking Moderator", "./assets/profile.png")
  .setColor(0x2EEB3E)
  .setDescription("I have been created to guide you through the night.")
  .setFooter("Have Fun and Remember to Drink Responsibly!")
  .setThumbnail("./assets/drinking.jpg")
  .setTimestamp()
  .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  .addField("This is a field title, it can hold 256 characters",
    "This is a field value, it can hold 2048 characters.")
  .addField("Inline Field", "They can also be inline.", true)
  .addBlankField(true)
  .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

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

  message.channel.send({embed});

  message.channel.send({startGameEmbed});

}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {

  if(message.author.bot) return;

  if(isReady) {
      
    if (message.content.indexOf('!help') === 0) {

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
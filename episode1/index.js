//? Episode 1: Setting up the bot.
/**
 * !Required modules:
 * ! discord.js
 * ! dotenv
 * ! nodemon
 * ? Built in modules
 * * process
 */

//? Importing modules

//! This part will import the required modules from node.js
const { Client, GatewayIntentBits } = require('discord.js'); //? Discord js allows easier access to use the discord api.
const process = require('process'); //? Process does alot of stuff, but currently we are using it to pull environment variables.
const dotenv = require('dotenv'); //? Dotenv is a module that allows us to load environment variables from a .env file.

//? Setting up environment variables
dotenv.config(); //? This is the function that loads the environment variables from the .env file.

//? Creating a client instance, which is how we control the bot.
const client = new Client({
    intents : [
        GatewayIntentBits.DirectMessageReactions, //Gateway intent variables are used to control what the bot can get from the api.
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
})

//? Client events
client.on('ready', () => { //? This event is called when the bot is ready.
    console.log('Logged in as ' + client.user.tag);
})

client.on('messageCreate', async (message) => { //? This event is called when a message is created.
    if(message.author.bot) return; //? This checks whether the message is from a bot.
    if(message.content.startsWith('.')) { //? This checks whether the message starts with a '.'.
        //Creating the commands.
        const command = message.content.replace(".", "").toLocaleLowerCase().split(" ")[0];
        //? this creates the command by checking the first part off an array created by splitting the message. This also replaces the '.' with nothing.
        if(command === "ping") { //? This checks whether the command has the name of ping.
            message.reply("Pong!"); //? This replies to the message with the text Pong!.
        }
    }
})

//? Logging into the client
client.login(process.env.TOKEN); //? This will log in to the client using the token from the .env file.
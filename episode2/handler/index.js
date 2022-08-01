/**
 * !glob
 * !util
 * * discord.js (optional)
 * ? Built in modules
 * * path
 */

//? Importing modules
const { glob } = require('glob');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const { Client, ClientVoiceManager } = require('discord.js');
const chalk = require('chalk');

//?Declaring variables
const globPromise = promisify(glob);

/**
 * @param {Client} client;
 */

module.exports = async (client) => {
    console.log('[!] Loading commands...');

    //? Set up the message files
    const commandFiles = await globPromise(`${__dirname.replaceAll("\\", "/")}/commands/**/*.js`);

    console.log(commandFiles);
    commandFiles.map((value) => {
        //Getting the file, directory, and splitting the path.
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        //Setting the command
        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }

        //Logging that the file was loaded as a message command, in green and red text.
        console.log(chalk.greenBright(`Loaded ${file.name} as a message command.`));
    })

    //? Slash commands
    const arrayOfSlashCommands = [];
    var i = 0;
    const slashCommands = await globPromise(`${__dirname.replaceAll("\\", "/")}/slashCommands/**/*.js`);

    slashCommands.map((value) => {
        const file = require(value);
        if(!file?.name) return;
        client.slashCommands.set(file.name, file);


        if(["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);

        console.log(chalk.green(`[+] Loaded slash command: ${file.name} `) + chalk.red(`As a slash command command`));
        i++;
    });

    console.log(chalk.yellow(`loaded ${i} slash commands`));
    
    client.once('ready', async () => {
        await client.application.commands.set(arrayOfSlashCommands);
        await client.guilds.cache.get("1003141431118016522").commands.set(arrayOfSlashCommands);
    });


    // * Events
    const eventsPath = path.join(__dirname, 'events'); //? 
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}
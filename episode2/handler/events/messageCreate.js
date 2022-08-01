const client = require('../../index');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute: async (message) => {
        if (message.author.bot) return; //? This checks whether the message is from a bot.
        if (message.content.startsWith('.')) { //? This checks whether the message starts with a '.'.
            //Creating the commands.
            const command = message.content.replace(".", "").toLocaleLowerCase().split(" ")[0];
            //? this creates the command by checking the first part off an array created by splitting the message. This also replaces the '.' with nothing.
            try {
                client.commands.get(command).run(client, message);
            } catch (err) {
                console.log(`[! ERROR ] ` +err);
            }
        }
    }
}
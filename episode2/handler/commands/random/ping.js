module.exports = {
    name : 'ping',
    description : "responds pong",
    run : async (client, message) => {
        message.reply("A!");
    }
}
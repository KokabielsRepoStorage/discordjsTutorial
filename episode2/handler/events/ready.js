module.exports = {
    name : 'ready',
    once : true,
    execute : async (client) => {
        console.clear();

        console.log(`[!] Logged in as ${client.user.tag}!`);
    }
}
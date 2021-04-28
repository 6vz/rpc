const RPC = require('discord-rpc');
const config = require("./config.json")
const fs = require('fs');
const chalk = require('chalk');
const rpc = new RPC.Client({
    transport: "ipc"
})

try {
    const data = fs.readFileSync('welcome.txt', 'utf8');
    console.log(chalk.green(data.toString()));
} catch(e) {
    console.log('Error:', e.stack);
}
console.log(chalk.red(`\nJeśli program nie działa i wywali błąd upewnij się że odpowiednio wypełniłeś plik config.json!\nJeśli masz problemy wejdź na docs.labs.surf, i zapoznaj się z dokumentacją\nJeśli to nie pomoże otwórz Issue na GitHubie\n`))
console.log(chalk.blueBright(`\n#################################################################\nŁadowanie Ustawień\n \n• Opis RPC: ${config.details}\n• Subopis RPC: ${config.state}\n• Duże zdjęcie: ${config.largeImageKey} (${config.largeImageText})\n• Małe zdjęcie: ${config.smallImageKey} (${config.smallImageText})\n\• ClientID: ${config.clientID}\n \nPoczekaj... Wczytywanie konfiguracji\n#################################################################`))
rpc.on("ready", () => {
    rpc.setActivity({
        details: config.details,
        state: config.state,
        startTimestamp: new Date(),
        largeImageKey: config.largeImageKey,
        largeImageText: config.largeImageText,
        smallImageKey: config.smallImageKey,
        smallImageText: config.smallImageText,
    });
    console.log(chalk.green('✔ ') + "RPC started " + chalk.green('successfully!'))

})

rpc.login({
    clientId: config.clientID
})
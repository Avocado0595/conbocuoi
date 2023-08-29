import * as pingSlashCommand from './ping';
import * as goodnightSlashCommand from './goodnight';
import { serverListSlash, helpSlash } from './server';
import { milkSlash, eatSlash, invSlash } from './cow';
import { sellSlash, topSlash, giveSlash } from './money'
import { getJokeSlash, cowSlash, catSlash, evenOddSlash } from './relax'

export const commands = [
    pingSlashCommand.data.toJSON(),
    goodnightSlashCommand.data.toJSON(),
    serverListSlash.data.toJSON(),
    milkSlash.data.toJSON(),
    sellSlash.data.toJSON(),
    giveSlash.data.toJSON(),
    topSlash.data.toJSON(),
    getJokeSlash.data.toJSON(),
    cowSlash.data.toJSON(),
    catSlash.data.toJSON(),
    evenOddSlash.data.toJSON(),
    eatSlash.data.toJSON(),
    invSlash.data.toJSON(),
    helpSlash.data.toJSON()
];

export const executes = {
    pingSlashCommand,
    goodnightSlashCommand,
    serverListSlash,
    milkSlash,
    sellSlash,
    giveSlash,
    topSlash,
    getJokeSlash,
    cowSlash,
    catSlash,
    evenOddSlash,
    eatSlash,
    invSlash,
    helpSlash
}

import * as pingSlashCommand from './ping';
import * as goodnightSlashCommand from './goodnight';
import * as serverSlashCommand from './server/serever-slash';
import * as milkSlashCommand from './milk';
import * as sellSlashCommand from './trading/sell'
import * as getComedyCommand from './relax/getComedy'
import * as cowCommand from './relax/cow'
import * as helpCommand from './server/help'
export const commands = [
    pingSlashCommand.data.toJSON(),
    goodnightSlashCommand.data.toJSON(),
    serverSlashCommand.data.toJSON(),
    milkSlashCommand.data.toJSON(),
    sellSlashCommand.data.toJSON(),
    getComedyCommand.data.toJSON(),
    cowCommand.data.toJSON(),
    helpCommand.data.toJSON()
];

export const executes = {
    pingSlashCommand,
    goodnightSlashCommand,
    serverSlashCommand,
    milkSlashCommand,
    sellSlashCommand,
    getComedyCommand,
    cowCommand,
    helpCommand
}

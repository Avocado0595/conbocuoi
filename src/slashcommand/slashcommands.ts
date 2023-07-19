import * as pingSlashCommand from './ping'
import * as goodnightSlashCommand from './goodnight'

export const commands = [
    pingSlashCommand.data.toJSON(),
    goodnightSlashCommand.data.toJSON()
];

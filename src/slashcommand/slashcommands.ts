import * as pingSlashCommand from './ping'
import * as goodnightSlashCommand from './goodnight'
import * as serverSlashCommand from './server/serever-slash'

export const commands = [
    pingSlashCommand.data.toJSON(),
    goodnightSlashCommand.data.toJSON(),
    serverSlashCommand.data.toJSON()
];

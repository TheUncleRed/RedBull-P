const { client, db } = require('../index');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientID = '1324878864593457225';

const commands = [
    {
        name: 'check',
        description: 'To check if a member is a scammer',
        options: [
            {
                name: 'user',
                description: 'Id of the member',
                type: 3,
                required: true
            }
        ]
    },
    {
        name: 'reason',
        description: 'To see The Reason of Scammer',
        options: [
        {
        type: 3,
        name: 'user',
        description: 'id of the scammer',
        required: true,
      }
    ]
  },
    {
        name: 'setup',
        description: 'Setup Server',
        options: [
            {
                name: 'send',
                type: 3,
                description: 'Type of message',
                required: false,
                choices: [
                    { name: 'Apply', value: 'apply' },
                    { name: 'Info', value: 'info' },
                    { name: 'Tickets', value: 'supp' },
                    { name: 'Ticket T', value: 'test' },
                    { name: 'Ticket W', value: 'wset' }
                ]
            },
            {
                name: 'close-open',
                type: 3,
                description: 'Choose open-close apply',
                required: false,
                choices: [
                    { name: 'Open', value: 'open' },
                    { name: 'Close', value: 'close' }
                ]
            },
            {
                name: 'type',
                type: 3,
                description: 'Choose type apply',
                required: false,
                choices: [
                    { name: 'Staff', value: 'sf' },
                    { name: 'Judge', value: 'jd' },
                    { name: 'Mediator', value: 'med' },
                    { name: 'All', value: 'all' }
                ]
            }
        ]
    }
];

const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(clientID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error refreshing application (/) commands:', error);
    }
})();

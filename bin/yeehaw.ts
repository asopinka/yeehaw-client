#!/usr/bin/env node

sendMessage({
    type: "cli-initialise",
    data: {
        nodeVersion: process.version ? process.version : "Unknown",
        platform: process.platform ? process.platform : "Unknown"
    }
});

// sourceMapSupport makes TypeScript line numbers show up in stack traces, making debugging much easier
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import program from 'commander';
import dispatchCommand from '../src/cli/dispatch-command.js';
import { sendMessage } from '../src/telemetry/send-message.js';
import { initStorage } from '../src/node-persist/storage.js';
import { initialiseClientId } from '../src/identity/client-id-service.js';
import { version } from '../version.js';

// This will make yeehaw appear in the process list
process.title = "yeehaw";

async function run()
{
    await initStorage();
    await initialiseClientId();

    program
        .name('yeehaw')
        .usage(
`

Get a random public URL: "yeehaw <port>"
For example you would run "yeehaw 80" (without the quotes) if your local server is running on port 80.
Your server will then be accessible under a random URL like https://f38fg.yeehaw.sh which will be shown in the output.
This method is free and is a good way to get started.

Get a public URL that does not change: "yeehaw <port> as <subdomain>.yeehaw.sh"
For example you would run "yeehaw 80 as myapi.yeehaw.sh" (without the quotes) if your server runs on port 80 and you want to make it available with the domain myapi.yeehaw.sh
This method requires a subscription which comes with an API key. Get one at https://yeehaw.sh and support the development of this app.

yeehaw.sh URLs are accessible from any unrestricted internet connection in the world. You don't need special firewall rules or network config, all traffic is routed through this client app from our servers to your local server.
`
        )
        .version(version)
        .arguments('[arg0]')
        .option('--set-api-key <apiKey>', 'Set your API key.')
        .option('--unreserve-subdomain <subdomain>', 'Unreserve a subdomain, for example if the number of subdomains you have reserved exceeds your limit')
        .description('Yee-Haw - Tunneling Service')
        .action(dispatchCommand);

    program.parse(process.argv);
}

(async function() {
    await run();
})();

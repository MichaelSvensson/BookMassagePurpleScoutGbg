/* WebClient
   The @slack/web-api package contains a simple, convenient, and configurable HTTP client 
   for making requests to Slack's Web API  
*/
//const { WebClient } = require('@slack/web-api');
// Converted to an es-module
import { WebClient } from '@slack/web-api';

/* Create EventAdapter
   The package exports a createEventAdapter () function, which returns an instance of 
   the SlackEventAdapter class. The function requires one parameter, the request signing secret, 
   which it uses to enforce that all events are coming from Slack to keep your app secure.
*/
import { createEventAdapter } from '@slack/events-api';

// const signingSecret =  "1ecd2572bd0657bbb07ac59e1fa3350d";
// Declaration environment variabels
// A Node app that uses the Events API would initialize a listener for events using the following code:
// Listen on messages from the slack channel
//const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);

// Read a token from the environment variables
const slackToken = process.env.SLACK_TOKEN;
const port = process.env.SLACK_PORT || 3000;

// Initialize the client
const slackClient = new WebClient(slackToken);
 
// Start listening for messages 
slackEvents.on('app_mention', (event) => {
    console.log(`Got message from user ${event.user}: ${event.text}`);
    (async () => {
        try {
            await slackClient.chat.postMessage({ channel: event.channel, text: `Hello <@${event.user}>! :tada:` })
        } catch (error) {
            console.log(error.data)
        }
    })();
});

slackEvents.on('error', console.error);

// Start the webserver
slackEvents.start(port).then(() => {
    console.log(`Server started on port ${port}`)
});

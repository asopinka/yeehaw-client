import InvalidSubscriptionMessage from "../messages/invalid-subscription-message.js";

export default function invalidSubscription(message: InvalidSubscriptionMessage): void {
    if (typeof message.apiKey === 'string') {
        console.info(
            'You have set an invalid api key ' + message.apiKey + '.\n\n' +
            'Please set an api key for a valid account with "yeehaw --set-api-key <your_new_api_key>"\n\n'
        );
    } else {
        console.info(
            'Falling back to free mode with a random subdomain.\n\n'
        );
    }
}
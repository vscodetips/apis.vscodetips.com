import { getTwitchStatus } from "../utilities/twitch";

const { TWITCH_TOKEN, TWITCH_CLIENT_ID } = process.env;

const handler = async (event, context) => {
  const twitchStatus = await getTwitchStatus(TWITCH_TOKEN, TWITCH_CLIENT_ID);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://community.vscodetips.com",
      "Cache-Control": "max-age=180", // 3 minutes
    },
    body: JSON.stringify(twitchStatus),
  };
};

exports.handler = handler;

import fetch from "node-fetch";

const { TWITCH_TOKEN, TWITCH_CLIENT_ID } = process.env;

const handler = async (event, context) => {
  const response = await fetch(
    "https://api.twitch.tv/helix/streams?user_login=nickytonline",
    {
      headers: {
        Authorization: `Bearer ${TWITCH_TOKEN}`,
        "Client-Id": TWITCH_CLIENT_ID,
      },
    }
  );

  const { data } = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://community.vscodetips.com",
      "Cache-Control": "max-age=180", // 3 minutes
    },
    body: JSON.stringify({ isOnline: data.length > 0 }),
  };
};

exports.handler = handler;

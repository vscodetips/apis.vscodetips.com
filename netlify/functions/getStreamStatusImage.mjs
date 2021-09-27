import path from "path";
import fetch from "node-fetch";
import { getTwitchStatus } from "../utilities/twitch";

const fs = require("fs").promises;
const { TWITCH_TOKEN, TWITCH_CLIENT_ID } = process.env;
const headers = {
  "Access-Control-Allow-Origin": "https://community.vscodetips.com",
  "Cache-Control": "max-age=180", // 3 minutes
};

const handler = async (event, context) => {
  const { isOnline = false } = getTwitchStatus(TWITCH_TOKEN, TWITCH_CLIENT_ID);

  let image;
  try {
    const twitchStatusImageFilePath = `https://apis.vscodetips.com/assets/images/${
      isOnline ? "online" : "offline"
    }.png`;
    const result = await fetch(twitchStatusImageFilePath);
    image = await result.buffer();
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      ...headers,
      "Content-type": "image/png",
    },
    body: image.toString("base64"),
    isBase64Encoded: true,
  };
};

exports.handler = handler;

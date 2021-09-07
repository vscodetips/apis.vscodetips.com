const { builder } = require("@netlify/functions");

const playlists = [
  '2NcUkqmS0yT9U5FJSXMRs2',
  '2ALbeqn1aDPutYOozVRres',
  '7enUd2kkn1q0iSqME6M9bj',
  '7KWYiMbxzJH8WqPvdEf3mg',
  '4WoKK6c19U7aIcJdhRVMQe',
  '3ZcUYitIClqAJY0YHwcHo7',
  '0yZb2lQLmDWl33aRcSSOSu'
]

const handler = async (event, context) => {
  const match = event.path.match(/\d+/)[0];
  const day = match == null ? 0 : Number(match[0]);

  // If a number is out of range for the day, set the playlist index to the first item index.
  const playlistIndex = day > 7 || day < 1 ? 0 : day - 1;
  const playlist = `https://open.spotify.com/embed/playlist/${playlists[playlistIndex]}?theme=0`

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://community.vscodetips.com',
    },
    body: playlist,
  };
};

exports.handler = builder(handler);

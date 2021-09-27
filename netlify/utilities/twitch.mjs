import fetch from "node-fetch";

export async function getTwitchStatus(token, clientId) {
  const response = await fetch("https://api.twitch.tv/helix/streams?user_login=nickytonline", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": clientId,
    },
  });

  const { data } = await response.json();
  const payload = { isOnline: data.length > 0 };

  return payload;
}

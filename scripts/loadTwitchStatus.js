const twitchStatusImage = document.querySelector('.twitch-status-panel img');
const twitchMessageStatus = document.getElementById('twitch-status-message');
const offlineMessage = "nickytonline is offline from Twitch"
const onlineMessage = "nickytonline is online on Twitch"

async function checkTwitchStatus() {
  const response = await fetch('/twitch')
  const { isOnline } = await response.json()

  if (isOnline) {
    twitchMessageStatus.setAttribute('aria-label', onlineMessage);
    twitchStatusImage.classList.add('twitch-status--online');
  } else {
    twitchStatusImage.classList.remove('twitch-status--online');
    twitchMessageStatus.setAttribute('aria-label', offlineMessage);
  }


  setTimeout(checkTwitchStatus, 15000)
}

checkTwitchStatus();
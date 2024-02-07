import { Flusher } from '../flusher/flusher.js';
import { createChat } from '../interface/overlay.js';
class Rumble {

  static init() {
    console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Initialize');
    const channelName = window.location.pathname.slice(1);
    let stopObserver = false;
    let video;

    video = document.getElementById("videoPlayer");

    if (video) {
      console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Rumble video found');
      console.log(video.querySelectorAll('ul'));  

      const flusher = new Flusher(video, "RUMBLE", channelName);
      createChat(flusher);
      return;
    }

    console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Rumble start video observer');
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (!stopObserver && mutation.addedNodes) {
          mutation.addedNodes.forEach(function (node) {
            video = document.getElementById("videoPlayer");
            /* if (video && video.querySelectorAll('ul')[0]) { */
            if (video) {
              console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Rumble stop video observer');
              console.log(video.querySelectorAll('ul'));  
              observer.disconnect();
              stopObserver = true;
              video = document.getElementById("videoPlayer");
              const flusher = new Flusher(video, "RUMBLE", channelName);
              createChat(flusher);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

export default Rumble;
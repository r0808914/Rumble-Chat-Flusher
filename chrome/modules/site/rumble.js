import { Flusher } from '../flusher/flusher.js';
import { createChat } from '../interface/overlay.js';
class Rumble {

  static init() {
    /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Initialize'); */
    let stopObserver = false;
    let video;

    video = document.getElementById("videoPlayer");

    if (video) {
      /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Rumble video found'); */
      if (document.querySelector('.video-header-live-info')) {
        const channelName = document.querySelector('.media-heading-name').textContent.trim();
        const flusher = new Flusher(video, "RUMBLE", channelName);
        createChat(flusher);
        return;
      }
    }

    /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Rumble start video observer'); */
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (!stopObserver && mutation.addedNodes) {
          mutation.addedNodes.forEach(function (node) {
            video = document.getElementById("videoPlayer");
            const live = document.querySelector('.video-header-live-info');
            if (video && live) {
              /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Rumble stop video observer'); */
              const channelName = document.querySelector('.media-heading-name').textContent.trim();
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
import { checkResize } from '../utils/resize.js';
import { getFont } from '../utils/utils.js';

export async function createChat(flusher) {
   if (flusher.video.hasAttribute('flusher')) return;
   flusher.video.setAttribute('flusher', "")
   console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Create Chat');

   const chatFlusher = document.createElement("div");
   chatFlusher.classList.add("flusher");

   const flusherDiv = document.createElement("div");
   flusherDiv.classList.add("flusher-messages");

   const shadowRoot = flusher.props.external ? chatFlusher.attachShadow({ mode: 'open' }) : null;
   const b = typeof browser !== 'undefined' ? browser : chrome;

   const mainStylesDom = document.getElementById('flusher-css-overlay');
   if (!mainStylesDom) {
      const overlayStyle = document.createElement('link');
      overlayStyle.href = b.runtime.getURL('lib/flusher/main.css');
      overlayStyle.id = 'flusher-css-overlay';
      overlayStyle.rel = 'stylesheet';
      document.head.appendChild(overlayStyle);

      const font = getFont();
      document.head.appendChild(font);
   }

   const menuStylesDom = document.getElementById('flusher-css');
   if (!menuStylesDom || flusher.props.external) {
      const menuStyle = document.createElement('link');
      menuStyle.href = b.runtime.getURL('lib/flusher/overlay.css');
      menuStyle.rel = 'stylesheet';
      menuStyle.id = 'flusher-css';
      flusher.props.external ? shadowRoot.appendChild(menuStyle) : document.head.append(menuStyle);
   }

   flusher.container = flusherDiv;

   flusher.states.chatEnabled = await getExtensionStorageItem('flusher-enable', flusher.states.chatEnabled);
   flusher.states.flushState = await getExtensionStorageItem('flusher-flush', flusher.states.flushState);
   flusher.states.avatar = await getExtensionStorageItem('flusher-avatar', flusher.states.avatar);
   flusher.states.spamState = await getExtensionStorageItem('flusher-spam', flusher.states.spamState);
   flusher.states.positionState = await getExtensionStorageItem('flusher-position', flusher.states.positionState);
   flusher.states.fontState = await getExtensionStorageItem('flusher-font', flusher.states.fontState);
   flusher.states.sizeState = await getExtensionStorageItem('flusher-size', flusher.states.sizeState);
   flusher.states.backgroundState = await getExtensionStorageItem('flusher-background', flusher.states.backgroundState);
   flusher.states.timeState = await getExtensionStorageItem('flusher-time', flusher.states.timeState);

   const video = flusher.video.querySelector('video');
   video.parentNode.insertBefore(chatFlusher, video);
   flusher.props.external ? shadowRoot.appendChild(flusherDiv) : chatFlusher.append(flusherDiv);
   checkResize(flusher);

   function getExtensionStorageItem(key, defaultValue) {
      return new Promise((resolve) => {
         chrome.storage.local.get([key], (result) => {
            const storedValue = result[key];
            resolve(storedValue !== undefined ? storedValue : defaultValue);
         });
      });
   }
}

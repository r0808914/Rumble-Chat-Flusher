import { processElementQueue } from "../queue/queue.js";
import { togglePointerEvents } from '../interface/menu/menu.js'

export class FlusherMessages {
   constructor() {
      /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Create MessageProvider'); */
      this.socket = null;
      this.nativeChatObserver = null;
      this.channels = new Set();

      const b = typeof browser !== "undefined" ? browser : chrome;
      this.defaultAvatar = b.runtime.getURL("lib/flusher/icon.png");
   }

   async interceptNative(flusher) {
      /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Intercept Native Chat'); */
      const nativeChat = await waitForChat(flusher.props.isVod ? document.querySelector('#chat-history-list') : document.querySelector('#chat-history-list'));

      togglePointerEvents(flusher);

      if (!flusher.states.flushState) setTimeout(() => {
         /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Parse existing'); */
         nativeChat.childNodes.forEach(addedNode => addMessage(addedNode));
      }, 150);

      this.nativeChatObserver = new MutationObserver(mutations => {
         mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
               mutation.addedNodes.forEach(addedNode => setTimeout(() => addMessage(addedNode, this.defaultAvatar), 150))
            }
         });
      });

      const observerConfig = { childList: true, subtree: false };
      this.nativeChatObserver.observe(nativeChat, observerConfig);

      function addMessage(node, defaultAvatar) {
         let clonedNode = node.cloneNode(true);

         if (!clonedNode || clonedNode.nodeName !== "LI") return;

         const id = clonedNode.getAttribute('data-message-id');
         const userId = clonedNode.getAttribute('data-message-user-id');

         const classLength = clonedNode.classList.length;
         /* if (flusher.states.flushState && classLength > 1) return; */
         if (classLength > 1) clonedNode.classList.add('flusher-background');
         if (userId) {
            if ((!flusher.states.spamState || flusher.states.flushState) && !flusher.props.isVod) {
               let uniqueString = '';
               uniqueString += userId + '-';

               const divTextContent = clonedNode.querySelector('.chat-history--message')?.textContent;
               uniqueString += divTextContent + '-';

               const emoteElements = clonedNode.querySelectorAll('.chat-history--emote');
               emoteElements.forEach((emoteElement) => {
                  const emoteValue = emoteElement.getAttribute('title');
                  uniqueString += emoteValue;
               });

               const exist = flusher.props.displayedMessages.find(obj => {
                  return obj.key === uniqueString
               })

               if (exist) return true;

               clonedNode.querySelectorAll('.chat-history--message').forEach(function (element) {
                  if (element.textContent.trim().length > 0) {
                     const regexSentence = /(\b.+?\b)\1+/g;
                     const sentence = element.textContent.replace(regexSentence, '$1');
                     const regexChar = /(.)(\1{10,})/g;
                     element.textContent = sentence.replace(regexChar, '$1$1$1$1$1$1$1$1$1$1');
                  }
               });

               flusher.props.displayedMessages.push({ id: id, key: uniqueString });
            }
         }

         const avatar = clonedNode.querySelector('.chat-history--user-avatar');

         if (avatar) {
            if (!flusher.states.avatar) avatar.style.display = 'none';

            if (avatar.getAttribute('src') === undefined) {
               this.src = defaultAvatar;
            }
            avatar.onerror = function () {
               this.style.display = "none";
               this.onerror = null;
               this.src = defaultAvatar;
               this.style.display = "block";
            };
         }

         flusher.props.elementQueue.push(clonedNode);
         processElementQueue(flusher);
      }

      function waitForChat(parent) {
         /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Looking for Native Chat'); */
         if (!parent) parent = document.body;

         const chatEntry = parent.querySelector('.chat-history--row');
         if (chatEntry) {
            /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Native Chat found'); */
            return chatEntry.parentNode;
         }

         return new Promise(resolve => {
            const config = { attributes: true, childList: true, subtree: true };

            const mutationCallback = function (mutationsList, observer) {
               for (const mutation of mutationsList) {
                  if (mutation.type === 'childList') {
                     mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.classList.contains('chat-history--row')) {
                           observer.disconnect();
                           resolve(node.parentNode);
                           /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Native Chat found'); */
                        }
                     });
                  }
               }
            };

            const observer = new MutationObserver(mutationCallback);
            observer.observe(parent, config);
         });
      }
   }

   async bindRequests(flusher) {
      /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Bind Requests'); */
      if (!flusher) return;
      if (!flusher.props.external && !this.nativeChatObserver) this.interceptNative(flusher);
   }

   unbindRequests(flusher) {
      /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Unbind Requests'); */
      if (!flusher?.props?.external) {
         /* console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Dispose Native Chat'); */
         if (this.nativeChatObserver) this.nativeChatObserver.disconnect();
         this.nativeChatObserver = null;
      }
   }
}
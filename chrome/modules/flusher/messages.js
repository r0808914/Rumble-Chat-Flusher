import { processMessageQueue, processElementQueue } from "../queue/queue.js";
import { togglePointerEvents } from '../interface/menu/menu.js'

export class FlusherMessages {
   constructor() {
      console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Create MessageProvider');
      this.socket = null;
      this.nativeChatObserver = null;
      this.channels = new Set();
   }

   subscribeChannel(flusher) {
      const id = flusher.props.chatroomId;
      if (!id) return;
      if (this.channels.has(id)) {
         console.log(`\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Channel ${id} is already subscribed.`);
         return;
      }

      const subscriptionMessage = { event: 'pusher:subscribe', data: { auth: '', channel: `chatrooms.${id}.v2` } };

      if (!this.socket) {
         this.setupWebSocket(flusher, subscriptionMessage, id);
         return;
      }

      console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Subscribe Channel: ' + id);
      this.socket.send(JSON.stringify(subscriptionMessage));
      this.channels.add(id);

      if (flusher.props.external) this.getHistory(flusher);
   }

   async getHistory(flusher) {
      const apiUrl = `https://rumble.com/api/v2/channels/${flusher.props.hostId}/messages`;

      try {
         const response = await fetch(apiUrl);

         if (!response.ok) {
            throw new Error(`Failed to fetch messages. Status: ${response.status}`);
         }

         const data = await response.json();

         if (data && data.data && data.data.messages) {
            console.log(`\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m History has ${data.data.messages.length} messages`);
            data.data.messages.forEach((message) => {
               flusher.props.messageQueue.push(message);
            });
            processMessageQueue(flusher);
         } else {
            console.log('No messages found in the response.');
         }
      } catch (error) {
         console.error('Error fetching messages:', error.message);
      }
   }

   setupWebSocket(flusher) {
      console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Setup WebSocket');

      if (this.socket) return;

      const webSocketUrl = 'wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.6.0&flash=false';

      this.socket = new WebSocket(webSocketUrl);

      this.socket.onmessage = (event) => {
         const data = JSON.parse(event.data);
         document.body.contains(flusher.video) ? this.onMessage(data, flusher) : this.disposeChannel();
      };

      this.socket.addEventListener('open', (event) => {
         console.log(`\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m WebSocket connection opened ${flusher.props.channelName}:`, event);
         this.subscribeChannel(flusher);
      });

      this.socket.addEventListener('close', (event) => {
         console.log(`\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m WebSocket connection closed ${flusher.props.channelName}:`, event);
         this.channels.clear();
      });

      this.socket.addEventListener('error', (event) => {
         console.error('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m WebSocket error:', event);
      });
   }

   onMessage(data, flusher) {
      if (!flusher.states.chatEnabled || data === null || flusher.props.loading) return;
      flusher.props.messageQueue.push(data);
      processMessageQueue(flusher);
   }

   disposeChannel() {
      if (this.socket) {
         this.socket.close();
         this.socket = null;
         return;
      }
   }

   async interceptNative(flusher) {
      console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Intercept Native Chat');
      const nativeChat = await waitForChat(flusher.props.isVod ? document.querySelector('#chat-history-list') : document.querySelector('#chat-history-list'));

      togglePointerEvents(flusher);

      if (!flusher.states.flushState) setTimeout(() => {
         console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Parse existing');
         nativeChat.childNodes.forEach(addedNode => addMessage(addedNode));
      }, 150);

      this.nativeChatObserver = new MutationObserver(mutations => {
         mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
               mutation.addedNodes.forEach(addedNode => setTimeout(() => addMessage(addedNode), 150))
            }
         });
      });

      const observerConfig = { childList: true, subtree: false };
      this.nativeChatObserver.observe(nativeChat, observerConfig);

      function addMessage(node) {
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

         flusher.props.elementQueue.push(clonedNode);
         processElementQueue(flusher);
      }

      function waitForChat(parent) {
         console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Looking for Native Chat');
         if (!parent) parent = document.body;

         const chatEntry = parent.querySelector('.chat-history--row');
         if (chatEntry) {
            console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Native Chat found');
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
                           console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Native Chat found');
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
      console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Bind Requests');

      if (!flusher) return;

      if (!flusher.props.external && !this.nativeChatObserver) this.interceptNative(flusher);

      /* setTimeout(async () => {
         if (!flusher) return;

         if (!flusher.props.chatroomId && !flusher.props.isVod) {
            try {
               const response = await fetch(`https://rumble.com/api/v1/channels/${flusher.props.channelName}`);
               const data = await response.json();

               flusher.props.chatroomId = data && data.chatroom && data.chatroom.id;
               console.log(`\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m chatroomId: ${flusher.props.chatroomId} ${flusher.props.channelName}`);

               flusher.props.hostId = data.id;

               if (flusher.props.external) {
                  console.log(`\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Badges`, data.subscriber_badges);
                  flusher.props.badgeCache.push(...data.subscriber_badges);
               }
            } catch (error) {
               console.error('Error fetching data:', error);
            }
         }

         if (!this.socket && !flusher.props.isVod) this.subscribeChannel(flusher);

      }, flusher.props.external ? 0 : 5000); */
   }

   unbindRequests(flusher) {
      console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Unbind Requests');
      this.disposeChannel(flusher);
      if (!flusher?.props?.external) {
         console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Dispose Native Chat');
         if (this.nativeChatObserver) this.nativeChatObserver.disconnect();
         this.nativeChatObserver = null;
      }
   }
}
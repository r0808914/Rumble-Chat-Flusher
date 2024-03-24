/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./modules/flusher/states.js
class FlusherStates {
  constructor() {
    this.backgroundStates = ['SMALL', 'LARGE', 'OFF'];
    this.positionStates = ['TOP LEFT', 'LEFT', 'BOTTOM LEFT', 'TOP RIGHT', 'RIGHT', 'BOTTOM RIGHT'];
    this.sizeStates = ['SMALL', 'NORMAL', 'LARGE'];
    this.backgroundState = 2;
    this.positionState = 4;
    this.sizeState = 1;
    this.fontState = 0;
    this.avatar = true;
    this.flushState = false;
    this.chatEnabled = true;
    this.spamState = true;
    this.timeState = false;
  }
}
;// CONCATENATED MODULE: ./modules/flusher/props.js
class FlusherProps {
  constructor() {
    this.chatroomId = null;
    this.clickOutsideHandlerFunction = null;
    this.domain = null;
    this.displayedMessages = [];
    this.elementQueue = [];
    this.external = false;
    this.intervalScroll = null;
    this.isFullscreen = false;
    this.isProcessingElements = false;
    this.isProcessingMessages = false;
    this.isVod = false;
    this.loading = false;
    this.messageQueue = [];
    this.badgeCache = [];
    this.lastPositionPerRow = [];
    this.rowQueue = [];
    this.scrolling = false;
    this.timeoutIds = [];
    this.video = null;
    this.lastRow = 0;
    this.maxRows = 99;
  }
}
;// CONCATENATED MODULE: ./modules/layout/horizontal.js
function selectRow(message, flusher) {
  let selectedRow = 0;
  const positions = flusher.props.lastPositionPerRow.length ?? 0;
  if (positions > 0) {
    for (let i = 0; i < positions; i++) {
      const item = flusher.props.lastPositionPerRow[i];
      if (item === undefined || item.run === true) {
        selectedRow = i;
        break;
      }
      if (flusher.props.rowQueue[i].length < 2) {
        message.row = i;
        message = prepareAnimation(message, flusher);
        if (message !== null) flusher.props.rowQueue[i].push(message);
        return;
      }
      selectedRow = i + 1;
    }
  }
  message.row = selectedRow;
  flusher.props.rowQueue[selectedRow] = flusher.props.rowQueue[selectedRow] ?? [];
  message = prepareAnimation(message, flusher);
  if (message !== null) startAnimation(message, flusher);
}
function startAnimation(messageData, flusher) {
  const message = messageData.container;
  const space = 4;
  const rowIndex = messageData.row;
  const lastItem = flusher.props.lastPositionPerRow?.[rowIndex];
  !flusher.props.lastPositionPerRow ? flusher.props.lastPositionPerRow = [] : null;
  flusher.props.lastPositionPerRow[rowIndex] = {
    container: message,
    run: false
  };
  let overlap = 0;
  let messageWidth;
  const lastContainer = lastItem !== undefined ? lastItem.container : undefined;
  if (lastContainer !== undefined) {
    requestAnimationFrame(() => {
      flusher.container.appendChild(message);
      messageWidth = message.offsetWidth;
      message.style.marginRight = `-${messageWidth}px`;
      const rect1 = message.getBoundingClientRect();
      const rect2 = lastContainer.getBoundingClientRect();
      overlap = rect2.right - rect1.left;

      /* queue running */
      if (lastItem.run === false) {
        message.style.marginRight = `-${messageWidth + overlap + space}px`;
        message.classList.add('flusher-animation');
      }

      /* queue ended */else {
        if (overlap > -8) {
          /* append last queue */
          message.style.marginRight = `-${messageWidth + overlap + space}px`;
          message.classList.add('flusher-animation');
        } else {
          /* new queue */
          message.style.marginRight = `-${messageWidth + space}px`;
          message.classList.add('flusher-animation');
          overlap = 0;
        }
      }
      requestNext(messageWidth, overlap, messageData, flusher);
    });
  }

  /* new row */else {
    flusher.container.appendChild(message);
    messageWidth = message.offsetWidth;
    message.style.marginRight = `-${messageWidth + space}px`;
    message.classList.add('flusher-animation');
    overlap = 0;
    requestNext(messageWidth, overlap, messageData, flusher);
  }
  async function requestNext(messageWidth, overlap, messageData, flusher) {
    let timeNeeded = Math.ceil((messageWidth + space + overlap) / flusher.props.parentWidth * 16000);
    const timeoutId = setTimeout(() => {
      checkQueue(messageData, flusher);
      const index = flusher.props.timeoutIds.indexOf(timeoutId);
      if (index !== -1) {
        flusher.props.timeoutIds.splice(index, 1);
      }
    }, timeNeeded);
    flusher.props.timeoutIds.push(timeoutId);
  }
  function checkQueue(messageData, flusher) {
    const index = messageData.row;
    if (!flusher?.props?.rowQueue) return;
    const queueItem = flusher.props.rowQueue[index].shift();
    if (queueItem) {
      checkRow(queueItem, index, flusher);
    } else {
      flusher.props.lastRow = flusher.props.lastRow - 1;
      flusher.props.lastPositionPerRow[index] = {
        container: messageData.container,
        run: true
      };
    }
  }
  function checkRow(messageData, rowIndex, flusher) {
    /* To be Fixed */

    /* if ((rowIndex + 1) > flusher.props.lastRow) {
    	for (let i = 0; i < rowIndex; i++) {
    		if (flusher.props.lastPositionPerRow[i] === undefined || flusher.props.lastPositionPerRow[i].run === true) {
    			if (messageData.message !== null) {
    				flusher.props.lastPositionPerRow[rowIndex] = undefined;
    				messageData.container.style.setProperty('--row', i);
    				messageData.container.classList.add('flusher-green');
    					startAnimation(messageData, flusher);
    			}
    			return;
    		}
    		if (flusher.props.rowQueue[i].length < 1) {
    			if (messageData.container !== null) {
    				flusher.props.lastPositionPerRow[i] = undefined;
    				messageData.container.style.setProperty('--row', i);
    				flusher.props.rowQueue[i].push(messageData);
    			}
    			return;
    		}
    	}
    } */

    startAnimation(messageData, flusher);
  }
}
function prepareAnimation(data, flusher) {
  if (!data.container) data.container = data;
  flusher.props.external ? data.container.classList.add('flusher-message') : data.container.classList.add('flusher-rumble');
  data.container.style.setProperty('--row', data.row);
  data.container.addEventListener("animationend", function () {
    try {
      const oldest = flusher.container.firstChild;
      const entryId = oldest?.getAttribute('data-message-id');
      if (entryId) flusher.props.displayedMessages = flusher.props.displayedMessages.filter(message => message.id !== entryId);
      oldest.remove();
    } catch {}
  });
  return data;
}
;// CONCATENATED MODULE: ./modules/layout/vertical.js
function appendVertical(message, flusher) {
  if (!message) return;
  const lastItem = flusher.container.firstChild;
  if (flusher.props.external) {
    const messageId = message.container.getAttribute('data-message-id');
    if (!messageId) return;
    if (lastItem) {
      const lastMessageId = lastItem.getAttribute('data-message-id');
      if (lastMessageId && messageId < lastMessageId) {
        flusher.container.append(message.container);
      } else {
        let current = lastItem;
        while (current) {
          const currentMessageId = current.getAttribute('data-message-id');
          if (currentMessageId && messageId > currentMessageId) {
            flusher.container.insertBefore(message.container, current);
            break;
          }
          current = current.previousSibling;
        }
        if (!current) flusher.container.insertBefore(message.container, lastItem);
      }
    } else {
      flusher.container.append(message.container);
    }
  } else {
    if (lastItem) {
      flusher.container.insertBefore(message.container || message, lastItem);
    } else {
      flusher.container.append(message);
    }
  }
  while (flusher.container.children.length > flusher.props.maxRows) {
    const oldest = flusher.container.lastChild;
    if (!flusher.states.spamState) {
      const entryId = oldest?.getAttribute('data-message-id');
      if (entryId) flusher.props.displayedMessages = flusher.props.displayedMessages.filter(message => message.id !== entryId);
    }
    oldest.remove();
  }
}
;// CONCATENATED MODULE: ./modules/queue/queue.js


function getMessageKey(key, value, messageId, flusher) {
  const keyValue = key + "-" + value;
  const dupe = flusher.props.displayedMessages.find(obj => {
    return obj.key === keyValue;
  });
  const ignore = !flusher.states.spamState && dupe && flusher.lastRow > 1 ? true : false;
  if (!ignore) flusher.props.displayedMessages.push({
    id: messageId,
    key: keyValue
  });
  return {
    key: keyValue,
    ignore: ignore
  };
}
async function processMessageQueue(flusher) {
  try {
    if (flusher.props.isProcessingMessages) return;
    flusher.props.isProcessingMessages = true;
    let queueItem = flusher.props.messageQueue.shift();
    if (!queueItem) {
      flusher.props.isProcessingMessages = false;
      return;
    }
    queueItem.chatroom_id = flusher.external ? queueItem?.chatroom_id : 0;
    const lastRow = flusher.props.lastRow;
    const maxRows = flusher.props.maxRows;
    if (lastRow === null || lastRow >= maxRows) {
      flusher.props.isProcessingMessages = false;
      return;
    }
    const eventType = queueItem.event ?? queueItem.eventName;
    if (eventType === "App\\Events\\ChatMessageEvent" && flusher.props.external) {
      createMessage(JSON.parse(queueItem.data), flusher);
    } else if (queueItem.type === "message" && flusher.props.external) {
      createMessage(queueItem, flusher);
    } else if (eventType === "App\\Events\\UserBannedEvent") {
      createUserBanMessage(JSON.parse(queueItem.data), flusher);
    } else if (eventType === "App\\Events\\GiftedSubscriptionsEvent") {
      createGiftedMessage(JSON.parse(queueItem.data), flusher);
    } else if (eventType === "App\\Events\\FollowersUpdated") {
      createFollowersMessage(JSON.parse(queueItem.data), flusher);
    } else if (eventType === "App\\Events\\StreamHostEvent") {
      createHostMessage(JSON.parse(queueItem.data), flusher);
    } else if (eventType === "App\\Events\\SubscriptionEvent") {
      createSubMessage(JSON.parse(queueItem.data), flusher);
    } else {
      flusher.props.isProcessingMessages = false;
      processMessageQueue(flusher);
    }
  } catch (error) {
    flusher.props.isProcessingMessages = false;
    processMessageQueue(flusher);
    console.log(error);
  }
}
function processElementQueue(flusher) {
  try {
    if (flusher.props.isProcessingElements) return;
    flusher.props.isProcessingElements = true;
    const queueItem = flusher.props.elementQueue.shift();
    if (!queueItem) {
      flusher.props.isProcessingElements = false;
      return;
    }
    const flushState = flusher.states.flushState;
    if (!flusher.states.chatEnabled) {
      flusher.props.isProcessingElements = false;
      return;
    }
    flushState ? selectRow(queueItem, flusher) : appendVertical(queueItem, flusher);
    flusher.props.isProcessingElements = false;
    processElementQueue(flusher);
  } catch (error) {
    flusher.props.isProcessingElements = false;
    processElementQueue(flusher);
    console.log(error);
  }
}
;// CONCATENATED MODULE: ./modules/interface/menu/element.js
const menuHtml = `<div class="flusher-menu">
<ul class="flusher-menu-base" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
  <li class="flusher-enable" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Overlay <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;">
        <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
          <g>
            <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
            <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
          </g>
          <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-flush" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Flush <span style="right: 4px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;">
        <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
          <g>
            <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
            <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
          </g>
          <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-layoutMenu" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Layout <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-settings" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Settings <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
</ul>
<ul class="flusher-menu-settings" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
  <li class="flusher-spam" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Spam <span style="right: 4px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;">
        <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
          <g>
            <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
            <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
          </g>
          <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-font" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Font <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
    </div>
  </li>
  <li class="flusher-store" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Web Store <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-home" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Report Bug <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
</ul>
<ul class="flusher-menu-layout" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
  <li class="flusher-messageMenu" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Message <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-overlayMenu" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Overlay <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
</ul>
<ul class="flusher-menu-message" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
<li class="flusher-avatar" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
<div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
  <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
    <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
      <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
    </svg>
  </span>Avatar <span style="right: 4px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;">
    <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
      <g>
        <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
        <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
      </g>
      <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
    </svg>
  </span>
</div>
</li>
  <li class="flusher-time" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border-top: none; border-right: none; border-bottom: 0px; border-left: none; border-image: initial; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s; display: block;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 16px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer; transition: opacity 100ms ease 0s; display: flex;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Show Time <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="18px" viewBox="0 0 28 18">
        <g>
          <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
          <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
        </g>
        <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
      </svg>
    </div>
  </li>
  <li class="flusher-background" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 115px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Background <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
    </div>
  </li>
</ul>
<ul class="flusher-menu-overlay" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
  <li class="flusher-position" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 115px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Position <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
    </div>
  </li>
  <li class="flusher-size" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Size <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
    </div>
  </li>
</ul>
</div>`;
const parser = new DOMParser();
const doc = parser.parseFromString(menuHtml, 'text/html');
const menu = doc.body.firstChild;
;// CONCATENATED MODULE: ./modules/utils/drag.js
function dragElement(flusher) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var isResizing = false;
  flusher.container.onmousedown = function (e) {
    e = e || window.event;
    e.preventDefault();
    if (isInResizeHandle(e)) {
      isResizing = true;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeResize;
      document.onmousemove = resizeElement;
    } else {
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = dragElement;
    }
  };
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    flusher.container.style.top = flusher.container.offsetTop - pos2 + "px";
    flusher.container.style.left = flusher.container.offsetLeft - pos1 + "px";
  }
  function resizeElement(e) {
    e = e || window.event;
    e.preventDefault();
    flusher.container.style.width = flusher.container.offsetWidth - (pos3 - e.clientX) + "px";
    flusher.container.style.height = flusher.container.offsetHeight - (pos4 - e.clientY) + "px";
    pos3 = e.clientX;
    pos4 = e.clientY;
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  function closeResize() {
    isResizing = false;
    document.onmouseup = null;
    document.onmousemove = null;
  }
  function isInResizeHandle(e) {
    var rect = flusher.container.getBoundingClientRect();
    var handleSize = 10;
    return e.clientX >= rect.right - handleSize && e.clientY >= rect.bottom - handleSize;
  }
}
;// CONCATENATED MODULE: ./modules/interface/menu/menu.js


const originalPath = `
   <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
      <g>
         <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
         <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
      </g>
      <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
   </svg>
`;
const newPath = `
   <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
      <g>
         <path opacity="0.4" d="m16.46183,14.03325l6.516,0a5,5 0 1 0 0,-10l-6.515,0a8.96,8.96 0 0 1 1.515,5a8.96,8.96 0 0 1 -1.515,5l-0.001,0z" id="svg_1"></path>
         <path opacity="0.7" fill-rule="evenodd" d="m8.97783,0.03325a9,9 0 1 0 0,18a9,9 0 1 0 0,-18zm-3.61,5.412c-0.14,0.21 -0.14,0.503 -0.14,1.088l0,5c0,0.585 0,0.878 0.14,1.088c0.061,0.091 0.139,0.169 0.23,0.23c0.21,0.14 0.503,0.14 1.088,0.14s0.878,0 1.088,-0.14c0.091,-0.061 0.169,-0.139 0.23,-0.23c0.141,-0.21 0.141,-0.503 0.141,-1.088l0,-5c0,-0.585 0,-0.878 -0.141,-1.088c-0.061,-0.091 -0.139,-0.169 -0.23,-0.23c-0.21,-0.14 -0.503,-0.14 -1.088,-0.14s-0.878,0 -1.088,0.14c-0.091,0.061 -0.169,0.139 -0.23,0.23zm4.583,0c-0.141,0.21 -0.141,0.503 -0.141,1.088l0,5c0,0.585 0,0.878 0.141,1.088c0.061,0.091 0.139,0.169 0.23,0.23c0.21,0.14 0.503,0.14 1.088,0.14s0.878,0 1.088,-0.14c0.091,-0.061 0.169,-0.139 0.23,-0.23c0.14,-0.21 0.14,-0.503 0.14,-1.088l0,-5c0,-0.585 0,-0.878 -0.14,-1.088c-0.061,-0.091 -0.139,-0.169 -0.23,-0.23c-0.21,-0.14 -0.503,-0.14 -1.088,-0.14s-0.878,0 -1.088,0.14c-0.091,0.061 -0.169,0.139 -0.23,0.23z" id="svg_2"></path>
      </g>
   </svg>
`;
const originalPathFragment = new DOMParser().parseFromString(originalPath, 'text/html').body.firstChild;
const newPathFragment = new DOMParser().parseFromString(newPath, 'text/html').body.firstChild;
function createMenu(flusher, nativeMenu, menuItem) {
  flusher.video = flusher.props.external ? flusher.video.closest('.video-js') : flusher.video;
  const domMenu = flusher.video.querySelector('.flusher-menu');
  if (domMenu === null) {
    let parent = flusher.props.external ? flusher.video : nativeMenu.parentElement;
    const shadowBox = document.createElement('div');
    shadowBox.id = 'shadowbox';
    const shadowRoot = shadowBox.attachShadow({
      mode: 'open'
    });
    const b = typeof browser !== 'undefined' ? browser : chrome;
    const clonedMenu = menu.cloneNode(true);
    shadowRoot.append(...clonedMenu.children);
    flusher.menu = shadowRoot;
    parent.append(shadowBox);
    parent = flusher.menu;
    let settingsMenu = parent.querySelector('.flusher-menu-settings');
    let layoutMenu = parent.querySelector('.flusher-menu-layout');
    let messageMenu = parent.querySelector('.flusher-menu-message');
    let overlayMenu = parent.querySelector('.flusher-menu-overlay');
    const homeBtn = parent.querySelector('.flusher-home');
    homeBtn.addEventListener('mousedown', function (event) {
      hideMenu(flusher);
      window.open('https://github.com/r0808914/Rumble-Chat-Flusher/issues', '_blank');
    });
    const storeBtn = parent.querySelector('.flusher-store');
    storeBtn.addEventListener('mousedown', function (event) {
      hideMenu(flusher);
      const userAgent = navigator.userAgent.toLowerCase();
      userAgent.includes("firefox") ? window.open('https://addons.mozilla.org/en-US/firefox/addon/rumblechatflusher/', '_blank') : window.open('https://chromewebstore.google.com/detail/Rumble-Chat-Flusher/cefplanllnmdnnhncpopljmcjnlafdke', '_blank');
    });
    const positionBtn = overlayMenu.querySelector('.flusher-position');
    const divInsidePosition = positionBtn.querySelector('span:empty');
    divInsidePosition.textContent = toTitleCase(flusher.states.positionStates[flusher.states.positionState]);
    positionBtn.addEventListener('mousedown', function (event) {
      flusher.states.positionState = (flusher.states.positionState + 1) % flusher.states.positionStates.length;
      setExtensionStorageItem('flusher-position', flusher.states.positionState);
      divInsidePosition.textContent = toTitleCase(flusher.states.positionStates[flusher.states.positionState]);
      flusher.container.setAttribute('position', flusher.states.positionStates[flusher.states.positionState].replace(/\s/g, ""));
      flusher.resetPosition();
    });
    const sizeBtn = overlayMenu.querySelector('.flusher-size');
    const divInsideSize = sizeBtn.querySelector('span:empty');
    divInsideSize.textContent = toTitleCase(flusher.states.sizeStates[flusher.states.sizeState]);
    sizeBtn.addEventListener('mousedown', function (event) {
      flusher.states.sizeState = (flusher.states.sizeState + 1) % flusher.states.sizeStates.length;
      setExtensionStorageItem('flusher-size', flusher.states.sizeState);
      divInsideSize.textContent = toTitleCase(flusher.states.sizeStates[flusher.states.sizeState]);
      flusher.container.setAttribute('size', flusher.states.sizeStates[flusher.states.sizeState].replace(/\s/g, ""));
      flusher.setVerticalWidth();
    });
    const backgroundBtn = messageMenu.querySelector('.flusher-background');
    const divInsideBackground = backgroundBtn.querySelector('span:empty');
    divInsideBackground.textContent = toTitleCase(flusher.states.backgroundStates[flusher.states.backgroundState]);
    backgroundBtn.addEventListener('mousedown', function (event) {
      flusher.states.backgroundState = (flusher.states.backgroundState + 1) % flusher.states.backgroundStates.length;
      setExtensionStorageItem('flusher-background', flusher.states.backgroundState);
      divInsideBackground.textContent = toTitleCase(flusher.states.backgroundStates[flusher.states.backgroundState]);
      flusher.container.setAttribute('background', flusher.states.backgroundStates[flusher.states.backgroundState]);
    });
    const baseMenu = parent.querySelector('.flusher-menu-base');
    const settingsBtn = parent.querySelector('.flusher-settings');
    settingsBtn.addEventListener('mousedown', function (event) {
      settingsMenu.style.display = 'block';
      baseMenu.style.display = 'none';
    });
    const layoutMenuBtn = parent.querySelector('.flusher-layoutMenu');
    layoutMenuBtn.addEventListener('mousedown', function (event) {
      layoutMenu.style.display = 'block';
      baseMenu.style.display = 'none';
    });
    const messageMenuBtn = parent.querySelector('.flusher-messageMenu');
    messageMenuBtn.addEventListener('mousedown', function (event) {
      messageMenu.style.display = 'block';
      layoutMenu.style.display = 'none';
    });
    const overlayMenuBtn = parent.querySelector('.flusher-overlayMenu');
    overlayMenuBtn.addEventListener('mousedown', function (event) {
      overlayMenu.style.display = 'block';
      layoutMenu.style.display = 'none';
    });
    flusher.states.flushState || !flusher.states.chatEnabled ? overlayMenuBtn.style.display = 'none' : overlayMenuBtn.style.display = 'flex';
    flusher.states.flushState || !flusher.states.chatEnabled ? backgroundBtn.style.display = 'none' : backgroundBtn.style.display = 'flex';
    const spamBtnContainer = parent.querySelector('.flusher-spam');
    const spamBtn = spamBtnContainer.querySelector('.flusher-toggle');
    spamBtn.addEventListener('mousedown', function (event) {
      flusher.states.spamState = !flusher.states.spamState;
      toggleButton(spamBtn, flusher.states.spamState);
      setExtensionStorageItem('flusher-spam', flusher.states.spamState);
      flusher.props.displayedMessages = [];
    });
    flusher.states.flushState || !flusher.states.chatEnabled ? spamBtnContainer.style.display = 'none' : spamBtnContainer.style.display = 'flex';
    toggleButton(spamBtn, flusher.states.spamState);
    const fontBtn = settingsMenu.querySelector('.flusher-font');
    const divInsideFont = fontBtn.querySelector('span:empty');
    divInsideFont.textContent = toTitleCase(flusher.states.sizeStates[flusher.states.fontState]);
    fontBtn.addEventListener('mousedown', function (event) {
      flusher.states.fontState = (flusher.states.fontState + 1) % flusher.states.sizeStates.length;
      setExtensionStorageItem('flusher-font', flusher.states.fontState);
      divInsideFont.textContent = toTitleCase(flusher.states.sizeStates[flusher.states.fontState]);
      flusher.container.setAttribute('font', flusher.states.sizeStates[flusher.states.fontState].replace(/\s/g, ""));
      if (flusher.states.flushState) flusher.clear();
    });

    /* (!flusher.states.chatEnabled) ? fontBtn.style.display = 'none' : fontBtn.style.display = 'flex'; */

    const avatarToggleContainer = parent.querySelector('.flusher-avatar');
    const avatarToggle = avatarToggleContainer.querySelector('.flusher-toggle');
    avatarToggle.addEventListener('mousedown', function (event) {
      flusher.states.avatar = !flusher.states.avatar;
      toggleButton(avatarToggle, flusher.states.avatar);
      flusher.container.childNodes.forEach(childNode => {
        const avatar = childNode.querySelector('.chat-history--user-avatar');
        if (avatar) avatar.style.display = flusher.states.avatar ? 'flex' : 'none';
      });
      setExtensionStorageItem('flusher-avatar', flusher.states.avatar);
    });
    toggleButton(avatarToggle, flusher.states.avatar);
    const timeToggleContainer = messageMenu.querySelector('.flusher-time');
    const timeToggle = timeToggleContainer.querySelector('.flusher-toggle');
    timeToggle.addEventListener('mousedown', function (event) {
      flusher.states.timeState = !flusher.states.timeState;
      toggleButton(timeToggle, flusher.states.timeState);
      flusher.container.childNodes.forEach(childNode => {
        const chatEntry = childNode.querySelector('.chat-entry div');
        chatEntry.firstElementChild.style.display = flusher.states.timeState ? 'initial' : 'none';
      });
      flusher.container.setAttribute('enabled', flusher.states.timeState);
      setExtensionStorageItem('flusher-time', flusher.states.timeState);
    });
    toggleButton(timeToggle, flusher.states.timeState);
    !flusher.props.isVod || flusher.states.flushState ? timeToggleContainer.style.display = 'none' : timeToggleContainer.style.display = 'flex';
    const flusherToggleContainer = parent.querySelector('.flusher-flush');
    const flushToggle = flusherToggleContainer.querySelector('.flusher-toggle');
    flushToggle.addEventListener('mousedown', function (event) {
      flusher.states.flushState = !flusher.states.flushState;
      flusher.states.flushState ? overlayMenuBtn.style.display = 'none' : overlayMenuBtn.style.display = 'flex';
      flusher.states.flushState ? backgroundBtn.style.display = 'none' : backgroundBtn.style.display = 'flex';
      toggleButton(flushToggle, flusher.states.flushState);
      flusher.states.flushState || !flusher.states.chatEnabled ? spamBtnContainer.style.display = 'none' : spamBtnContainer.style.display = 'flex';
      if (flusher.states.chatEnabled && !flusher.states.flushState) dragElement(flusher);
      togglePointerEvents(flusher);
      flusher.clear();
      flusher.container.setAttribute('layout', flusher.states.flushState ? 'horizontal' : 'vertical');
      setExtensionStorageItem('flusher-flush', flusher.states.flushState);
    });
    !flusher.states.chatEnabled ? flusherToggleContainer.style.display = 'none' : flusherToggleContainer.style.display = 'flex';
    toggleButton(flushToggle, flusher.states.flushState);
    const flusherToggle = parent.querySelector('.flusher-enable .flusher-toggle');
    flusherToggle.addEventListener('mousedown', function (event) {
      flusher.states.chatEnabled = !flusher.states.chatEnabled;
      toggleButton(flusherToggle, flusher.states.chatEnabled);
      flusher.states.chatEnabled ? flusher.provider.bindRequests(flusher) : flusher.provider.unbindRequests(flusher);
      if (flusher.states.chatEnabled && flusher.container.attributes['layout'].nodeValue === 'vertical') dragElement(flusher);
      flusher.clear();
      togglePointerEvents(flusher);
      flusher.states.flushState || !flusher.states.chatEnabled ? spamBtnContainer.style.display = 'none' : spamBtnContainer.style.display = 'flex';
      flusher.states.flushState || !flusher.states.chatEnabled ? overlayMenuBtn.style.display = 'none' : overlayMenuBtn.style.display = 'flex';
      flusher.states.flushState || !flusher.states.chatEnabled ? backgroundBtn.style.display = 'none' : backgroundBtn.style.display = 'flex';
      !flusher.states.chatEnabled ? flusherToggleContainer.style.display = 'none' : flusherToggleContainer.style.display = 'flex';
      !flusher.states.chatEnabled ? fontBtn.style.display = 'none' : fontBtn.style.display = 'flex';
      flusher.container.setAttribute('enabled', flusher.states.chatEnabled);
      setExtensionStorageItem('flusher-enable', flusher.states.chatEnabled);
    });
    toggleButton(flusherToggle, flusher.states.chatEnabled);
    togglePointerEvents(flusher);
    menuItem.addEventListener('click', function (event) {
      const children = nativeMenu.querySelectorAll('li');
      const hasInvisibleChild = Array.from(children).some(child => {
        if (child.hasAttribute('flusher')) return false;
        return window.getComputedStyle(child).getPropertyValue('display') === 'none';
      });
      hasInvisibleChild ? hideMenu(flusher) : showMenu();
    });
    menuItem.setAttribute('flusher', '');
    flusher.menuItem = menuItem;
    nativeMenu.appendChild(flusher.menuItem);
    const handleStyleChanges = () => {
      const children = nativeMenu.parentElement.querySelectorAll('ul');
      const hasVisibleChild = Array.from(children).slice(1).some(child => {
        return window.getComputedStyle(child).getPropertyValue('display') === 'block';
      });
      menuItem.style.display = hasVisibleChild ? 'none' : 'block';
    };

    /* put global for dispose */
    const observer = new MutationObserver(handleStyleChanges);
    const observerConfig = {
      attributes: true,
      subtree: true
    };
    observer.observe(nativeMenu.parentElement, observerConfig);
    function showMenu() {
      flusher.nativeMenu = nativeMenu;
      const liElements = nativeMenu.querySelectorAll('li');
      liElements.forEach(li => {
        if (li.hasAttribute('flusher')) {
          li.setAttribute('style', 'width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border-top: none; border-right: none; border-bottom: 1px solid rgb(255, 255, 255); border-left: none; border-image: initial; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s; display: block;');
          const spans = li.querySelectorAll('span');
          spans[0].style.display = 'inline-block';
          spans[1].style.display = 'none';
          const div = li.querySelector('div');
          div.setAttribute('style', 'width: auto; height: auto; margin: 0px; padding: 6px 5px 6px 18px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer; transition: opacity 100ms ease 0s;');
          return;
        }
        li.style.display = 'none';
      });
      baseMenu.style.display = 'block';
      /* flusher.clickOutsideHandlerFunction = (event) => clickOutsideHandler(event, flusher);
      document.addEventListener('mousedown', flusher.clickOutsideHandlerFunction); */
    }
  }
  function toggleButton(button, toggle) {
    const newPath = toggle ? originalPathFragment : newPathFragment;
    while (button.firstChild) {
      button.removeChild(button.firstChild);
    }
    for (const element of newPath.children) {
      button.appendChild(element.cloneNode(true));
    }
  }
  function toTitleCase(str) {
    if (!str) return 'undefined';
    if (str === 'OFF' || str === 'ON') return str;
    const words = str.split(' ');
    if (words.length > 0 && words[0].toUpperCase() === 'BOTTOM') {
      words[0] = 'BOT';
    }
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }
  function setExtensionStorageItem(key, value) {
    const data = {
      [key]: value
    };
    chrome.storage.local.set(data, () => {
      console.log(`Value for key ${key} has been set to ${value} in extension storage.`);
    });
  }
}
function hideMenu(flusher) {
  const baseMenu = flusher.menu.querySelector('.flusher-menu-base');
  const settingsMenu = flusher.menu.querySelector('.flusher-menu-settings');
  const layoutMenu = flusher.menu.querySelector('.flusher-menu-layout');
  const overlayMenu = flusher.menu.querySelector('.flusher-menu-overlay');
  const messageMenu = flusher.menu.querySelector('.flusher-menu-message');
  flusher.menuItem.style.display = 'none';
  settingsMenu.style.display = 'none';
  baseMenu.style.display = 'none';
  layoutMenu.style.display = 'none';
  overlayMenu.style.display = 'none';
  messageMenu.style.display = 'none';
  const liElements = flusher.nativeMenu.querySelectorAll('li');
  liElements.forEach(li => {
    if (li.hasAttribute('flusher')) {
      li.setAttribute('style', 'width: auto; height: auto; margin: 0px; padding: 0px; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;');
      const spans = li.querySelectorAll('span');
      spans[0].style.display = 'none';
      spans[1].style.display = 'inline-block';
      const div = li.querySelector('div');
      div.setAttribute('style', 'width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;');
      return;
    }
    li.style.display = 'list-item';
  });

  /* document.removeEventListener('mousedown', flusher.clickOutsideHandlerFunction); */
}
function clickOutsideHandler(event, flusher) {
  if (flusher.menu !== null && !flusher.menu.contains(event.target) && flusher.menu.style.display === 'block' && !isClickInsideShadowBox(event.target)) {
    if (flusher.toggle.contains(event.target) || event.target === flusher.toggle) return;
    hideMenu(flusher);
  }
  function isClickInsideShadowBox(target) {
    const path = event.composedPath();
    return path.some(node => node.id === 'shadowbox');
  }
}
function togglePointerEvents(flusher) {
  console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m togglePointerEvents');
  if (flusher.states.flushState || !flusher.states.chatEnabled) {
    flusher.container.classList.remove('flusher-grab');
    flusher.container.classList.add('flusher-no-grab');
    return;
  }
  flusher.props.lastRow = 2;
  dragElement(flusher);
  flusher.container.classList.remove('flusher-no-grab');
  flusher.container.classList.add('flusher-grab');
}
;// CONCATENATED MODULE: ./modules/flusher/messages.js


class FlusherMessages {
  constructor() {
    console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Create MessageProvider');
    this.socket = null;
    this.nativeChatObserver = null;
    this.channels = new Set();
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
          mutation.addedNodes.forEach(addedNode => setTimeout(() => addMessage(addedNode), 150));
        }
      });
    });
    const observerConfig = {
      childList: true,
      subtree: false
    };
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
          emoteElements.forEach(emoteElement => {
            const emoteValue = emoteElement.getAttribute('title');
            uniqueString += emoteValue;
          });
          const exist = flusher.props.displayedMessages.find(obj => {
            return obj.key === uniqueString;
          });
          if (exist) return true;
          clonedNode.querySelectorAll('.chat-history--message').forEach(function (element) {
            if (element.textContent.trim().length > 0) {
              const regexSentence = /(\b.+?\b)\1+/g;
              const sentence = element.textContent.replace(regexSentence, '$1');
              const regexChar = /(.)(\1{10,})/g;
              element.textContent = sentence.replace(regexChar, '$1$1$1$1$1$1$1$1$1$1');
            }
          });
          flusher.props.displayedMessages.push({
            id: id,
            key: uniqueString
          });
        }
      }
      if (!flusher.states.avatar) {
        const avatar = clonedNode.querySelector('.chat-history--user-avatar');
        if (avatar) avatar.style.display = 'none';
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
        const config = {
          attributes: true,
          childList: true,
          subtree: true
        };
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
  }
  unbindRequests(flusher) {
    console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Unbind Requests');
    if (!flusher?.props?.external) {
      console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Dispose Native Chat');
      if (this.nativeChatObserver) this.nativeChatObserver.disconnect();
      this.nativeChatObserver = null;
    }
  }
}
;// CONCATENATED MODULE: ./modules/utils/utils.js
function visibilityChange(flusher) {
  console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Add visibilityChange');
  document.addEventListener('visibilitychange', function handleVisibilityChange() {
    if (!flusher || !flusher.states.flushState) return;
    if (document.hidden) {
      flusher.props.chatEnabledVisible = flusher.states.chatEnabled;
      flusher.states.chatEnabled = false;
      flusher.clear();
    } else {
      flusher.states.chatEnabled = flusher.props.chatEnabledVisible;
    }
  });
}
function getFont() {
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
  return fontLink;
}
;// CONCATENATED MODULE: ./modules/flusher/flusher.js




class Flusher {
  constructor(video, domain, channelName) {
    this.video = video;
    this.states = new FlusherStates();
    this.props = new FlusherProps();
    this.provider = new FlusherMessages();
    this.props.domain = domain;
    this.props.channelName = channelName;
    this.props.external = domain === 'RUMBLE' ? false : true;
    /* this.props.isVod = window.location.href.includes('/video/'); */
    visibilityChange(this);
  }
  resetConnection() {
    console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Reset Connection');
    if (!this.props.flusher) return;
    clearChat(this.props.flusher);
    isVod = false;
    if (this.props.flusher && this.props.resizeObserver) {
      this.props.resizeObserver.disconnect();
    }
  }
  clear() {
    if (this.container) {
      this.container.style.display = 'none';
      this.resetPosition();
    }
    const isEnabled = this.states.chatEnabled;
    this.states.chatEnabled = false;
    this.props.elementQueue.length = 0;
    this.props.messageQueue.length = 0;
    this.props.lastRow = 0;
    for (const id of this.props.timeoutIds) {
      clearTimeout(id);
    }
    this.props.scrolling = false;
    if (this.container !== null) {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
    }
    this.props.displayedMessages = [];
    if (this.props.lastPositionPerRow) {
      this.props.lastPositionPerRow.length = 0;
    } else {
      this.props.lastPositionPerRow = [];
    }
    if (this.props.rowQueue) {
      this.props.rowQueue.length = 0;
    } else {
      this.props.rowQueue = [];
    }
    this.props.timeoutIds.length = 0;
    if (this.container !== null) this.container.style.display = 'flex';
    this.states.chatEnabled = isEnabled;
    this.props.isProcessingElements = false;
    this.props.isProcessingMessages = false;
  }
  resetPosition() {
    this.container.style.height = '';
    this.container.style.width = '';
    this.container.style.top = '';
    this.container.style.left = '';
  }
  setVerticalWidth() {
    const elementHeight = this.props.elementHeight;
    switch (this.states.sizeStates[this.states.sizeState]) {
      case 'LARGE':
        this.container.style.setProperty('--flusher-vertical-width', `${elementHeight * 14}px`);
        break;
      case 'NORMAL':
        this.container.style.setProperty('--flusher-vertical-width', `${elementHeight * 14}px`);
        break;
      case 'SMALL':
        this.container.style.setProperty('--flusher-vertical-width', `${elementHeight * 9}px`);
        break;
      default:
        break;
    }
  }
}
;// CONCATENATED MODULE: ./modules/utils/resize.js



function checkResize(flusher) {
  console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Check Resize');
  const target = flusher.props.external ? flusher.video : flusher.video.querySelector('video');
  flusher.resizeTimer = null;
  if (flusher.resizeObserver) flusher.resizeObserver.disconnect();
  flusher.resizeObserver = new ResizeObserver(entries => {
    if (flusher.container !== null) flusher.container.style.display = 'none';
    for (let entry of entries) {
      if (flusher.resizeTimer) clearTimeout(flusher.resizeTimer);
      flusher.resizeTimer = setTimeout(() => {
        for (let entry of entries) {
          const rect = target.getBoundingClientRect();
          let width = rect.width;
          let height = rect.height;
          window.currentUrl = window.location.href;
          if ((width === null || width === 0) && (!height || height === 0)) {
            if (flusher !== null) {
              console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Remove Chat');
              const init = !flusher.props.external;
              flusher.resizeObserver.disconnect();
              flusher.resizeObserver = null;
              flusher.provider.unbindRequests();
              flusher = null;
              if (init) rumble.init();
            }
            return;
          }
          console.log(`\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Width ${width} height ${height}`);
          const oldWidth = flusher.props.parentWidth;
          flusher.props.parentWidth = Math.trunc(width) * 2;
          flusher.props.parentHeight = Math.trunc(height);
          flusher.container.style.setProperty('--flusher-width', `-${flusher.props.parentWidth}px`);
          /* flusher.toggle.setAttribute('domain', flusher.props.domain); */

          const newFlushState = flusher.states.flushState !== undefined ? flusher.states.flushState ? 'horizontal' : 'vertical' : flusher.states.flushState ? 'horizontal' : 'vertical';
          flusher.container.setAttribute('layout', newFlushState);
          flusher.container.setAttribute('enabled', flusher.states.chatEnabled);
          flusher.container.setAttribute('position', flusher.states.positionStates[flusher.states.positionState].replace(/\s/g, ""));
          flusher.container.setAttribute('size', flusher.states.sizeStates[flusher.states.sizeState].replace(/\s/g, ""));
          flusher.container.setAttribute('background', flusher.states.backgroundStates[flusher.states.backgroundState]);
          flusher.container.setAttribute('font', flusher.states.sizeStates[flusher.states.fontState].replace(/\s/g, ""));

          /* toggleEnableMenu(); */

          const documentWidth = document.documentElement.clientWidth;
          if (documentWidth < flusher.props.parentWidth / 2 + 10) {
            flusher.props.isFullscreen = true;
            flusher.props.scrolling = false;
            debouncedScroll(flusher);
            flusher.props.intervalScroll = setInterval(debouncedScroll(flusher), 10000);
          } else {
            flusher.props.isFullscreen = false;
            if (flusher.props.intervalScroll !== null) {
              clearInterval(flusher.props.intervalScroll);
              flusher.props.intervalScroll = null;
            }
          }
          flusher.props.elementHeight = null;
          flusher.container.style.display = 'flex';
          createIntroMessage(flusher);
          if (oldWidth == null || oldWidth == 0) {
            if (flusher.container === null) return;
            if (flusher.states.chatEnabled) flusher.provider.bindRequests(flusher);
            flusher.props.loading = false;
            processMessageQueue(flusher);
            document.addEventListener('click', handleClick);
            function handleClick(event) {
              const svg = event.target.closest('svg');
              var targetSvg = svg && svg.querySelector('path')?.getAttribute('d').includes('M20');
              if (targetSvg) {
                document.removeEventListener('click', handleClick);
                var parentDiv = document.querySelector('div[title="Playback settings"]');
                setTimeout(function () {
                  var closestUl = parentDiv?.querySelector('ul');
                  if (closestUl) {
                    var firstLi = closestUl.querySelector('li');
                    if (firstLi) {
                      var clonedLi = firstLi.cloneNode(true);
                      clonedLi.firstChild.childNodes.forEach(function (node) {
                        if (node.textContent.trim() === 'Speed') node.textContent = 'Chat Flusher';
                      });
                      var secondLastSpan = clonedLi.firstChild.childNodes[clonedLi.firstChild.childNodes.length - 2];
                      if (secondLastSpan && secondLastSpan.tagName === 'SPAN') secondLastSpan.remove();
                      createMenu(flusher, closestUl, clonedLi);
                    }
                  }
                }, 150); /* change to observer */
              }
            }
            console.info(`\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m (${flusher.props.channelName} ${flusher.props.domain} ${flusher.props.isVod ? 'VOD' : 'LIVE'}): Report bugs or collaborate at https://github.com/r0808914/Rumble-Chat-Flusher`);
          } else {
            flusher.states.flushState ? flusher.clear() : flusher.resetPosition();
          }
        }
      }, 750);
    }
  });
  flusher.resizeObserver.observe(flusher.video);
  function createIntroMessage(flusher) {
    const introContent = document.createElement("div");
    introContent.classList.add("flusher-message");
    const emojiSpan = document.createElement('span');
    emojiSpan.textContent = String.fromCodePoint(0x1F389) + ' ';
    const introSpan = document.createElement("span");
    introSpan.textContent = `thanks for testing`;
    const introMessageSpan = document.createElement("span");
    introMessageSpan.append(emojiSpan, introSpan);
    introContent.appendChild(introMessageSpan);
    introContent.style.setProperty('--row', 0);
    introContent.classList.add('flusher-rumble');
    introContent.classList.add('chat-history--row');
    const parent = flusher.props.external ? flusher.container : document.body;
    parent.append(introContent);
    flusher.props.elementHeight = introContent.clientHeight;
    flusher.props.maxRows = Math.ceil(flusher.props.parentHeight / flusher.props.elementHeight);
    parent.removeChild(introContent);
    flusher.setVerticalWidth();
  }
}

/* 10 sec scroll loop if fullscreen */
function debouncedScroll(flusher) {
  if (flusher.props?.scrolling === true) return;
  flusher.props.scrolling = true;
  const chatContainer = document.getElementById('chat-history-list');
  if (flusher.props.isFullscreen && !flusher.props.isVod) {
    if (chatContainer !== null) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
  const timeoutId = setTimeout(() => {
    flusher.props.scrolling = false;
  }, 10000);
  flusher.props.timeoutIds.push(timeoutId);
}
;// CONCATENATED MODULE: ./modules/interface/overlay.js


async function createChat(flusher) {
  if (flusher.video.hasAttribute('flusher')) return;
  flusher.video.setAttribute('flusher', "");
  console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Create Chat');
  const chatFlusher = document.createElement("div");
  chatFlusher.classList.add("flusher");
  const flusherDiv = document.createElement("div");
  flusherDiv.classList.add("flusher-messages");
  const shadowRoot = flusher.props.external ? chatFlusher.attachShadow({
    mode: 'open'
  }) : null;
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
    return new Promise(resolve => {
      chrome.storage.local.get([key], result => {
        const storedValue = result[key];
        resolve(storedValue !== undefined ? storedValue : defaultValue);
      });
    });
  }
}
;// CONCATENATED MODULE: ./modules/site/rumble.js


class Rumble {
  static init() {
    console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Initialize');
    let stopObserver = false;
    let video;
    video = document.getElementById("videoPlayer");
    if (video) {
      console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Rumble video found');
      if (document.querySelector('.video-header-live-info')) {
        const channelName = document.querySelector('.media-heading-name').textContent.trim();
        const flusher = new Flusher(video, "RUMBLE", channelName);
        createChat(flusher);
        return;
      }
    }
    console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Rumble start video observer');
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (!stopObserver && mutation.addedNodes) {
          mutation.addedNodes.forEach(function (node) {
            video = document.getElementById("videoPlayer");
            const live = document.querySelector('.video-header-live-info');
            if (video && live) {
              console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Rumble stop video observer');
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
/* harmony default export */ const site_rumble = (Rumble);
;// CONCATENATED MODULE: ./modules/content.js

window.location.hostname.includes('rumble.com') ? site_rumble.init() : null;
/******/ })()
;
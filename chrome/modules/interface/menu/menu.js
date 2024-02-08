import { menu } from './element.js';
import { dragElement } from '../../utils/drag.js';

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

export function createMenu(flusher, nativeMenu, menuItem) {
   flusher.video = flusher.props.external ? flusher.video.closest('.video-js') : flusher.video;
   const domMenu = flusher.video.querySelector('.flusher-menu');

   if (domMenu === null) {
      let parent = flusher.props.external ? flusher.video : nativeMenu.parentElement;

      const shadowBox = document.createElement('div');
      shadowBox.id = 'shadowbox';
      const shadowRoot = shadowBox.attachShadow({ mode: 'open' });
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
         userAgent.includes("firefox") ?
            window.open('https://addons.mozilla.org/en-US/firefox/addon/rumblechatflusher/', '_blank') :
            window.open('https://chromewebstore.google.com/detail/Rumble-Chat-Flusher/cefplanllnmdnnhncpopljmcjnlafdke', '_blank');
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

      (flusher.states.flushState || !flusher.states.chatEnabled) ? overlayMenuBtn.style.display = 'none' : overlayMenuBtn.style.display = 'flex';
      (flusher.states.flushState || !flusher.states.chatEnabled) ? backgroundBtn.style.display = 'none' : backgroundBtn.style.display = 'flex';

      const spamBtnContainer = parent.querySelector('.flusher-spam');
      const spamBtn = spamBtnContainer.querySelector('.flusher-toggle');
      spamBtn.addEventListener('mousedown', function (event) {
         flusher.states.spamState = !flusher.states.spamState;
         toggleButton(spamBtn, flusher.states.spamState);
         setExtensionStorageItem('flusher-spam', flusher.states.spamState);
         flusher.props.displayedMessages = [];
      });

      (flusher.states.flushState || !flusher.states.chatEnabled) ? spamBtnContainer.style.display = 'none' : spamBtnContainer.style.display = 'flex';
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
      (!flusher.props.isVod || flusher.states.flushState) ? timeToggleContainer.style.display = 'none' : timeToggleContainer.style.display = 'flex';

      const flusherToggleContainer = parent.querySelector('.flusher-flush');
      const flushToggle = flusherToggleContainer.querySelector('.flusher-toggle');
      flushToggle.addEventListener('mousedown', function (event) {
         flusher.states.flushState = !flusher.states.flushState;

         flusher.states.flushState ? overlayMenuBtn.style.display = 'none' : overlayMenuBtn.style.display = 'flex';
         flusher.states.flushState ? backgroundBtn.style.display = 'none' : backgroundBtn.style.display = 'flex';

         toggleButton(flushToggle, flusher.states.flushState);

         (flusher.states.flushState || !flusher.states.chatEnabled) ? spamBtnContainer.style.display = 'none' : spamBtnContainer.style.display = 'flex';

         if (flusher.states.chatEnabled && !flusher.states.flushState) dragElement(flusher);

         togglePointerEvents(flusher);
         flusher.clear();
         flusher.container.setAttribute('layout', flusher.states.flushState ? 'horizontal' : 'vertical');

         setExtensionStorageItem('flusher-flush', flusher.states.flushState);
      });

      (!flusher.states.chatEnabled) ? flusherToggleContainer.style.display = 'none' : flusherToggleContainer.style.display = 'flex';
      toggleButton(flushToggle, flusher.states.flushState);

      const flusherToggle = parent.querySelector('.flusher-enable .flusher-toggle');
      flusherToggle.addEventListener('mousedown', function (event) {
         flusher.states.chatEnabled = !flusher.states.chatEnabled;

         toggleButton(flusherToggle, flusher.states.chatEnabled);

         flusher.states.chatEnabled ? flusher.provider.bindRequests(flusher) : flusher.provider.unbindRequests(flusher)

         if (flusher.states.chatEnabled && flusher.container.attributes['layout'].nodeValue === 'vertical') dragElement(flusher);

         flusher.clear();

         togglePointerEvents(flusher);

         (flusher.states.flushState || !flusher.states.chatEnabled) ? spamBtnContainer.style.display = 'none' : spamBtnContainer.style.display = 'flex';
         (flusher.states.flushState || !flusher.states.chatEnabled) ? overlayMenuBtn.style.display = 'none' : overlayMenuBtn.style.display = 'flex';
         (flusher.states.flushState || !flusher.states.chatEnabled) ? backgroundBtn.style.display = 'none' : backgroundBtn.style.display = 'flex';
         (!flusher.states.chatEnabled) ? flusherToggleContainer.style.display = 'none' : flusherToggleContainer.style.display = 'flex';
         (!flusher.states.chatEnabled) ? fontBtn.style.display = 'none' : fontBtn.style.display = 'flex';

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
      const observerConfig = { attributes: true, subtree: true };
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
      const data = { [key]: value };
      chrome.storage.local.set(data, () => {
         console.log(`Value for key ${key} has been set to ${value} in extension storage.`);
      });
   }
}

export function hideMenu(flusher) {
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

export function clickOutsideHandler(event, flusher) {
   if (flusher.menu !== null && !flusher.menu.contains(event.target)
      && flusher.menu.style.display === 'block'
      && !isClickInsideShadowBox(event.target)) {
      if (flusher.toggle.contains(event.target) || event.target === flusher.toggle) return;
      hideMenu(flusher);
   }
   function isClickInsideShadowBox(target) {
      const path = event.composedPath();
      return path.some((node) => node.id === 'shadowbox');
   }
}

export function togglePointerEvents(flusher) {
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

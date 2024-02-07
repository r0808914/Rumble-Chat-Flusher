import { createMenu, toggleEnableMenu } from "../interface/menu/menu.js";
import { processMessageQueue } from "../queue/queue.js"
import RUMBLE from '../site/rumble.js';

export function checkResize(flusher) {
	console.log('\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m Check Resize');
	const target = flusher.props.external ? flusher.video : flusher.video.querySelector('video');

	flusher.resizeTimer = null;
	if (flusher.resizeObserver) flusher.resizeObserver.disconnect();
	flusher.resizeObserver = new ResizeObserver(entries => {
		if (flusher.container !== null)
			flusher.container.style.display = 'none';

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

					const newFlushState = flusher.states.flushState !== undefined ? (flusher.states.flushState ? 'horizontal' : 'vertical') : (flusher.states.flushState ? 'horizontal' : 'vertical');

					flusher.container.setAttribute('layout', newFlushState);
					flusher.container.setAttribute('enabled', flusher.states.chatEnabled);
					flusher.container.setAttribute('position', flusher.states.positionStates[flusher.states.positionState].replace(/\s/g, ""));
					flusher.container.setAttribute('size', flusher.states.sizeStates[flusher.states.sizeState].replace(/\s/g, ""));
					flusher.container.setAttribute('background', flusher.states.backgroundStates[flusher.states.backgroundState]);
					flusher.container.setAttribute('font', flusher.states.sizeStates[flusher.states.fontState].replace(/\s/g, ""));

					/* toggleEnableMenu(); */

					const documentWidth = document.documentElement.clientWidth;
					if (documentWidth < ((flusher.props.parentWidth / 2) + 10)) {
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
							var targetSvg = event.target.closest('svg')?.tagName === 'svg' && event.target.querySelector('path')?.getAttribute('d').includes('M20');

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
								}, 250);
							}
						}

						console.info(`\x1b[42m\x1b[97m Rumble Chat Flusher \x1b[49m\x1b[0m (${flusher.props.channelName} ${flusher.props.domain} ${flusher.props.isVod ? 'VOD' : 'LIVE'}): Report bugs or collaborate at https://github.com/r0808914/rumble-Chat-Flusher`);
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
		introSpan.textContent = `thanks for testing (version 0.8.3)`;
		const introMessageSpan = document.createElement("span");

		introMessageSpan.append(emojiSpan, introSpan);

		introContent.appendChild(introMessageSpan);
		introContent.style.setProperty('--row', 0);
		introContent.classList.add('flusher-message');

		const parent = flusher.props.external ? flusher.container : document.body;
		parent.append(introContent);
		flusher.props.elementHeight = introContent.clientHeight;
		flusher.props.maxRows = Math.ceil(flusher.props.parentHeight / flusher.props.elementHeight);
		parent.removeChild(introContent);
		flusher.setVerticalWidth();
	}
}

/* 10 sec scroll loop if fullscreen */
export function debouncedScroll(flusher) {
	if (flusher.props?.scrolling === true) return;
	flusher.props.scrolling = true;

	const chatBtn = document.querySelector('#chatroom .justify-center.absolute');
	const chatContainer = document.querySelector('#chatroom [data-chat-entry]');
	if (flusher.props.isFullscreen && !flusher.props.isVod) {
		if (chatBtn !== null) {
			chatBtn.click();
		} if (chatContainer !== null) {
			const chatContainerParent = chatContainer.closest('.overflow-y-scroll');
			if (chatContainerParent !== null) {
				chatContainerParent.scrollTop = chatContainerParent.scrollHeight;
			}
		}
	}

	const timeoutId = setTimeout(() => {
		flusher.props.scrolling = false;
	}, 5000);

	flusher.props.timeoutIds.push(timeoutId);
}
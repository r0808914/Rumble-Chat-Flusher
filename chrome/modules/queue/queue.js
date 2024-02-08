import { selectRow } from '../layout/horizontal.js';
import { appendVertical } from "../layout/vertical.js";

export function getMessageKey(key, value, messageId, flusher) {
	const keyValue = key + "-" + value;
	const dupe = flusher.props.displayedMessages.find(obj => { return obj.key === keyValue });
	const ignore = (!flusher.states.spamState && dupe && flusher.lastRow > 1) ? true : false;
	if (!ignore) flusher.props.displayedMessages.push({ id: messageId, key: keyValue });
	return { key: keyValue, ignore: ignore };
}

export async function processMessageQueue(flusher) {
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

		if ((lastRow === null || lastRow >= maxRows)) {
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
	}
	catch (error) {
		flusher.props.isProcessingMessages = false;
		processMessageQueue(flusher);
		console.log(error);
	}
}

export function processElementQueue(flusher) {
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
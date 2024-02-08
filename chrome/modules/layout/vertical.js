export function appendVertical(message, flusher) {
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
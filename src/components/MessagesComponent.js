import React from 'react';
import MessageComponent from './MessageComponent';

export default function MessagesComponent({
  messages,
  selectedMessageIds,
  onStarMessage,
  onUnstarMessage,
  onSelectMessage,
  onDeselectMessage,
  onMarkAsReadMessage
}) {
  console.log(messages);
  return (
    <div>
      {messages.map(message =>
        <MessageComponent
          key={message.id}
          selected={selectedMessageIds.forEach(
            selId => (selId === message.id ? true : false)
          )}
          message={message}
          onStarMessage={onStarMessage}
          onUnstarMessage={onUnstarMessage}
          onSelectMessage={onSelectMessage}
          onDeselectMessage={onDeselectMessage}
          onMarkAsReadMessage={onMarkAsReadMessage}
        />
      )}
    </div>
  );
}

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
  return (
    <div>
      {messages.map(message =>
        <MessageComponent
          key={message.id}
          selected={selectedMessageIds.includes(message.id)}
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

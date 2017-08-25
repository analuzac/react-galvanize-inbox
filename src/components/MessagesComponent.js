import React from 'react';
import MessageComponent from './MessageComponent';

export default function MessagesComponent({ messages, selectedMessageIds }) {
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
        />
      )}
    </div>
  );
}

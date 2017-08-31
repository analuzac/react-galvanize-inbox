import React from 'react';
import InboxPageLayout from './InboxPageLayout';
import ToolbarComponent from './ToolbarComponent';
import MessagesComponent from './MessagesComponent';
import ComposeFormComponent from './ComposeFormComponent';

export default function InboxPage({
  messages,
  selectedMessageIds,
  showComposeForm,
  onStarMessage,
  onUnstarMessage,
  onSelectMessage,
  onDeselectMessage,
  onMarkAsReadMessage,
  onSelectAllMessages,
  onDeselectAllMessages,
  onMarkAsReadSelectedMessages,
  onMarkAsUnreadSelectedMessages,
  onApplyLabelSelectedMessages,
  onRemoveLabelSelectedMessages,
  onDeleteSelectedMessages,
  onOpenComposeForm,
  onComposeFormSubmit,
  onComposeFormCancel
}) {
  return (
    <div className="InboxPage">
      <InboxPageLayout>
        <ToolbarComponent
          messages={messages}
          selectedMessageCount={selectedMessageIds && selectedMessageIds.length}
          onSelectAllMessages={onSelectAllMessages}
          onDeselectAllMessages={onDeselectAllMessages}
          onMarkAsReadSelectedMessages={onMarkAsReadSelectedMessages}
          onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
          onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
          onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
          onDeleteSelectedMessages={onDeleteSelectedMessages}
          onOpenComposeForm={onOpenComposeForm}
        />
        <MessagesComponent
          messages={messages}
          selectedMessageIds={selectedMessageIds}
          onStarMessage={onStarMessage}
          onUnstarMessage={onUnstarMessage}
          onSelectMessage={onSelectMessage}
          onDeselectMessage={onDeselectMessage}
          onMarkAsReadMessage={onMarkAsReadMessage}
        />
        {showComposeForm &&
          <ComposeFormComponent
            onComposeFormSubmit={onComposeFormSubmit}
            onComposeFormCancel={onComposeFormCancel}
          />}
      </InboxPageLayout>
    </div>
  );
}

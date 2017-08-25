import React from 'react';
import InboxPageLayout from './InboxPageLayout';
import ToolbarComponent from './ToolbarComponent';
import MessagesComponent from './MessagesComponent';
import ComposeFormComponent from './ComposeFormComponent';

export default function InboxPage({
  messages,
  selectedMessageIds,
  showComposeForm
}) {
  return (
    <div className="InboxPage">
      <InboxPageLayout>
        <ToolbarComponent
          messages={messages}
          selectedMessageCount={selectedMessageIds && selectedMessageIds.length}
        />
        <MessagesComponent
          messages={messages}
          selectedMessageIds={selectedMessageIds}
        />
        {showComposeForm && <ComposeFormComponent />}
      </InboxPageLayout>
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InboxPage from './components/InboxPage';

let messages = [
  {
    id: 1,
    subject:
      "You can't input the protocol without calculating the mobile RSS protocol!",
    read: false,
    starred: true,
    labels: ['dev', 'personal']
  },
  {
    id: 2,
    subject:
      "connecting the system won't do anything, we need to input the mobile AI panel!",
    read: false,
    starred: false,
    labels: []
  },
  {
    id: 3,
    subject:
      'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
    read: false,
    starred: true,
    labels: ['dev']
  },
  {
    id: 4,
    subject: 'We need to program the primary TCP hard drive!',
    read: true,
    starred: false,
    labels: []
  },
  {
    id: 5,
    subject:
      'If we override the interface, we can get to the HTTP feed through the virtual EXE interface!',
    read: false,
    starred: false,
    labels: ['personal']
  },
  {
    id: 6,
    subject: 'We need to back up the wireless GB driver!',
    read: true,
    starred: true,
    labels: []
  },
  {
    id: 7,
    subject: 'We need to index the mobile PCI bus!',
    read: true,
    starred: false,
    labels: ['dev', 'personal']
  },
  {
    id: 8,
    subject:
      'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!',
    read: true,
    starred: true,
    labels: []
  }
];

let selectedMessageIds = [];

let shouldShowComposeForm = false;

function render() {
  ReactDOM.render(
    <InboxPage
      messages={messages}
      selectedMessageIds={selectedMessageIds}
      showComposeForm={shouldShowComposeForm}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
      onSelectAllMessages={onSelectAllMessages}
      onDeselectAllMessages={onDeselectAllMessages}
      onMarkAsReadSelectedMessages={onMarkAsReadSelectedMessages}
      onMarkAsUnreadSelectedMessages={onMarkAsUnreadSelectedMessages}
      onApplyLabelSelectedMessages={onApplyLabelSelectedMessages}
      onRemoveLabelSelectedMessages={onRemoveLabelSelectedMessages}
      onDeleteSelectedMessages={onDeleteSelectedMessages}
      onOpenComposeForm={onOpenComposeForm}
      onComposeFormSubmit={onComposeFormSubmit}
      onComposeFormCancel={onComposeFormCancel}
    />,
    document.getElementById('root')
  );
}

//Calling render once at the beginning to initialize page
render();

function onMarkAsReadMessage(messageId) {
  console.log('inside onMarkAsReadMessage');
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id === messageId) {
      messages[i].read = true;
    }
  }
  render();
}

function onStarMessage(messageId) {
  console.log('inside onStarMessage');
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id === messageId) {
      messages[i].starred = true;
    }
  }
  render();
}

function onUnstarMessage(messageId) {
  console.log('inside onUnstarMessage');
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id === messageId) {
      messages[i].starred = false;
    }
  }
  render();
}

function onSelectMessage(messageId) {
  selectedMessageIds.push(messageId);
  console.log(selectedMessageIds);
  render();
}

function onDeselectMessage(messageId) {
  selectedMessageIds.splice(selectedMessageIds.indexOf(messageId), 1);
  console.log(selectedMessageIds);
  render();
}

function onSelectAllMessages() {
  selectedMessageIds = messages.map(message => message.id);
  render();
}

function onDeselectAllMessages() {
  selectedMessageIds = [];
  render();
}

function onMarkAsReadSelectedMessages() {
  //make selected messages turn read
  selectedMessageIds = messages.map(message => onMarkAsReadMessage(message.id));
  //render();
}

//Helper function for onMarkAsUnreadSelectedMessages
function onMarkAsUnreadMessage(messageId) {
  console.log('inside onMarkAsReadMessage');
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id === messageId) {
      messages[i].read = false;
    }
  }
  render();
}

function onMarkAsUnreadSelectedMessages() {
  //make selected messages turn read
  selectedMessageIds = messages.map(message =>
    onMarkAsUnreadMessage(message.id)
  );
  //render();
}

function onApplyLabelSelectedMessages(label) {
  for (let j = 0; j < selectedMessageIds.length; j++) {
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id === selectedMessageIds[j]) {
        console.log(messages[i]);
        console.log(selectedMessageIds[j]);
        if (messages[i].labels.includes(label)) {
          //nothing happens
        } else {
          messages[i].labels.push(label);
        }
      }
    }
  }
  render();
}

function onRemoveLabelSelectedMessages(label) {
  for (let j = 0; j < selectedMessageIds.length; j++) {
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id === selectedMessageIds[j]) {
        console.log(messages[i]);
        console.log(selectedMessageIds[j]);
        if (messages[i].labels.includes(label)) {
          messages[i].labels.splice(messages[i].labels.indexOf(label), 1);
        }
      }
    }
  }
  render();
}

function onDeleteSelectedMessages() {
  for (let j = 0; j < selectedMessageIds.length; j++) {
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id === selectedMessageIds[j]) {
        // console.log(messages[i]);
        // console.log(selectedMessageIds[j]);
        messages.splice(messages.indexOf(messages[i]), 1);
      }
    }
  }
  render();
}

function onOpenComposeForm() {
  console.log('made it to onOpenComposeForm inside index.js');
  shouldShowComposeForm = true;
  render();
}

function onComposeFormSubmit(subject, body) {
  console.log(subject);
  console.log(body);
  // let newMessage = {
  //   id: 9,
  //   subject: subject,
  //   read: false,
  //   starred: false,
  //   labels: []
  // };
  // console.log(newMessage);
  // messages.push({ newMessage });
  // render();
}

function onComposeFormCancel() {
  console.log('made it to onComposeFormCancel');
  shouldShowComposeForm = false;
  render();
}

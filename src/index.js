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

let selectedMessageIds = [1, 3, 7];

function render() {
  ReactDOM.render(
    <InboxPage
      messages={messages}
      selectedMessageIds={selectedMessageIds}
      showComposeForm={true}
      onStarMessage={onStarMessage}
      onUnstarMessage={onUnstarMessage}
      onSelectMessage={onSelectMessage}
      onDeselectMessage={onDeselectMessage}
      onMarkAsReadMessage={onMarkAsReadMessage}
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
  //selected = true;
  render();
}

function onDeselectMessage(messageId) {
  //selected = false;
  render();
}

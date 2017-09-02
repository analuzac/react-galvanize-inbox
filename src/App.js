import React, { Component } from 'react';
import InboxPage from './components/InboxPage';
//import getMessages from './requests/getMessages';

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

export default class App extends Component {
  state = {
    messages: messages,
    selectedMessageIds: [],
    shouldShowComposeForm: false
  };
  render() {
    return (
      <InboxPage
        messages={this.state.messages}
        selectedMessageIds={this.state.selectedMessageIds}
        showComposeForm={this.state.shouldShowComposeForm}
        onStarMessage={this._starMessage}
        onUnstarMessage={this._unstarMessage}
        onSelectMessage={this._selectMessage}
        onDeselectMessage={this._deselectMessage}
        onMarkAsReadMessage={this._markAsReadMessage}
        onSelectAllMessages={this._selectAllMessages}
        onDeselectAllMessages={this._deselectAllMessages}
        onMarkAsReadSelectedMessages={this._markAsReadSelectedMessages}
        onMarkAsUnreadSelectedMessages={this._markAsUnreadSelectedMessages}
        onApplyLabelSelectedMessages={this._applyLabelSelectedMessages}
        onRemoveLabelSelectedMessages={this._removeLabelSelectedMessages}
        onDeleteSelectedMessages={this._deleteSelectedMessages}
        onOpenComposeForm={this._openComposeForm}
        onComposeFormSubmit={this._composeFormSubmit}
        onComposeFormCancel={this._composeFormCancel}
      />
    );
  }

  //   componentDidMount() {
  //   getMessages().then(messages => {
  //     this.setState({
  //       messages
  //     });
  //   });
  // }

  _markAsReadMessage = messageId => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      newMessages.find(newMessage => newMessage.id === messageId).read = true;
      return { messages: newMessages };
    });
  };

  _starMessage = messageId => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      newMessages.find(
        newMessage => newMessage.id === messageId
      ).starred = true;
      return { messages: newMessages };
    });
  };

  _unstarMessage = messageId => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      newMessages.find(
        newMessage => newMessage.id === messageId
      ).starred = false;
      return { messages: newMessages };
    });
  };

  _selectMessage = messageId => {
    console.log('got into selectMessage');
    this.setState(prevState => {
      const newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds.push(messageId);
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _deselectMessage = messageId => {
    this.setState(prevState => {
      const newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds.splice(newSelectedMessageIds.indexOf(messageId), 1);
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _selectAllMessages = () => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds = messages.map(message => message.id);
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _deselectAllMessages = () => {
    this.setState(prevState => {
      let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      newSelectedMessageIds = [];
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _markAsReadSelectedMessages = () => {
    this.setState(prevState => {
      let newMessages = prevState.messages.slice(0);
      newMessages.map(message => this._markAsReadMessage(message.id));
      return { messages: newMessages };
    });
  };

  //Helper function for _markAsUnreadSelectedMessages
  _markAsUnReadMessage = messageId => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      newMessages.find(newMessage => newMessage.id === messageId).read = false;
      return { newMessages };
    });
  };

  _markAsUnreadSelectedMessages = () => {
    this.setState(prevState => {
      let newMessages = prevState.messages.slice(0);
      newMessages.map(message => this._markAsUnreadMessage(message.id));
      return { messages: newMessages };
    });
  };

  _applyLabelSelectedMessages = label => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      const newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      for (let j = 0; j < newSelectedMessageIds.length; j++) {
        for (let i = 0; i < newMessages.length; i++) {
          if (newMessages[i].id === newSelectedMessageIds[j]) {
            // console.log(newMessages[i]);
            // console.log(newSelectedMessageIds[j]);
            if (newMessages[i].labels.includes(label)) {
              //nothing happens
            } else {
              newMessages[i].labels.push(label);
            }
          }
        }
      }

      return { messages: newMessages };
    });
  };

  _removeLabelSelectedMessages = label => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      const newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      for (let j = 0; j < newSelectedMessageIds.length; j++) {
        for (let i = 0; i < newMessages.length; i++) {
          if (newMessages[i].id === newSelectedMessageIds[j]) {
            // console.log(newMessages[i]);
            // console.log(newSelectedMessageIds[j]);
            if (newMessages[i].labels.includes(label)) {
              newMessages[i].labels.splice(
                newMessages[i].labels.indexOf(label),
                1
              );
            }
          }
        }
      }
      return { messages: newMessages };
    });
  };

  _deleteSelectedMessages = () => {
    this.setState(prevState => {
      const newMessages = prevState.messages.slice(0);
      const newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      for (let j = 0; j < newSelectedMessageIds.length; j++) {
        for (let i = 0; i < newMessages.length; i++) {
          if (newMessages[i].id === newSelectedMessageIds[j]) {
            // console.log(messages[i]);
            // console.log(selectedMessageIds[j]);
            newMessages.splice(newMessages.indexOf(newMessages[i]), 1);
          }
        }
      }
      return { messages: newMessages };
    });
  };

  _openComposeForm = () => {
    this.setState({ shouldShowComposeForm: true });
  };

  _composeFormCancel = () => {
    this.setState({ shouldShowComposeForm: false });
  };

  _composeFormSubmit = ({ subject, body }) => {
    console.log(`this is the subject:${subject}`);
    this.setState(prevState => {
      let newMessages = prevState.messages.slice(0);
      let oneMessage = {
        id: newMessages.length + 1,
        subject: subject,
        read: false,
        starred: false,
        labels: []
      };
      newMessages.unshift(oneMessage);
      return {
        messages: newMessages,
        shouldShowComposeForm: false
      };
    });
  };
}

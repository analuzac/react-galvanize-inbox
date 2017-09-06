import React, { Component } from 'react';
import InboxPage from './components/InboxPage';
import getMessages from './api/getMessages';
import updateMessage from './api/updateMessage';
import deleteMessage from './api/deleteMessage';
import createMessage from './api/createMessage';

export default class App extends Component {
  state = {
    messages: [],
    selectedMessageIds: [],
    shouldShowComposeForm: false,
    showApiError: false
  };

  componentDidMount() {
    getMessages().then(records => {
      this.setState({
        messages: records
      });
    });
  }
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

  _markAsReadMessage = newMessageId => {
    let changes = {
      fields: {
        read: true
      }
    };
    //making changes to API with updateMessage
    updateMessage(newMessageId, changes).then(messages => {
      this.setState(prevState => {
        const newMessages = prevState.messages.slice(0);
        newMessages.find(
          newMessage => newMessage.id === newMessageId
        ).read = true;
        return { messages: newMessages };
      });
    });
  };

  _starMessage = messageId => {
    let changes = {
      fields: {
        starred: true
      }
    };
    //making changes to API with updateMessage
    updateMessage(messageId, changes).then(messages => {
      this.setState(prevState => {
        const newMessages = prevState.messages.slice(0);
        newMessages.find(
          newMessage => newMessage.id === messageId
        ).starred = true;
        return { messages: newMessages };
      });
    });
  };

  _unstarMessage = messageId => {
    let changes = {
      fields: {
        starred: false
      }
    };
    //making changes to API with updateMessage
    updateMessage(messageId, changes).then(messages => {
      this.setState(prevState => {
        const newMessages = prevState.messages.slice(0);
        newMessages.find(
          newMessage => newMessage.id === messageId
        ).starred = false;
        return { messages: newMessages };
      });
    });
  };

  _selectMessage = messageId => {
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
      //let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      //Here I don't need to do line above because map creates new array
      //and I don't need the previous values of selected messages ids
      let newSelectedMessageIds = this.state.messages.map(
        message => message.id
      );
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _deselectAllMessages = () => {
    this.setState(prevState => {
      //let newSelectedMessageIds = prevState.selectedMessageIds.slice(0);
      //Here I don't need to do line above because I don't need the
      //previous values of selected messages ids
      let newSelectedMessageIds = [];
      return { selectedMessageIds: newSelectedMessageIds };
    });
  };

  _markAsReadSelectedMessages = () => {
    //first checkout which messages have been selected in array selectedMessageIds
    //second use method markAsRead to make selected messages be read
    //note that markAsReadMessage takes care of the state so we don't need
    //to set the state here
    this.state.selectedMessageIds.forEach(messageId =>
      this._markAsReadMessage(messageId)
    );
  };

  //Helper function for _markAsUnreadSelectedMessages
  _markAsUnreadMessage = newMessageId => {
    let changes = {
      fields: {
        read: false
      }
    };
    //making changes to API with updateMessage
    updateMessage(newMessageId, changes).then(messages => {
      this.setState(prevState => {
        const newMessages = prevState.messages.slice(0);
        newMessages.find(
          newMessage => newMessage.id === newMessageId
        ).read = false;
        return { messages: newMessages };
      });
    });
  };

  _markAsUnreadSelectedMessages = () => {
    //Same logic as markAsReadMessage above
    this.state.selectedMessageIds.forEach(messageId =>
      this._markAsUnreadMessage(messageId)
    );
  };

  _applyLabelSelectedMessages = label => {
    this.state.selectedMessageIds.forEach(messageId => {
      this.state.messages.forEach(message => {
        if (messageId === message.id) {
          if (message.labels.includes(label)) {
            //nothing happens
          } else {
            let labelArray = message.labels;
            labelArray.push(label);
            let newLabels = labelArray.join(',');
            let changes = {
              fields: {
                labels: newLabels
              }
            };
            //making changes to API with updateMessage
            updateMessage(messageId, changes).then(messages => {
              this.setState(prevState => {
                const newMessages = prevState.messages.slice(0);
                const newSelectedMessageIds = prevState.selectedMessageIds.slice(
                  0
                );
                for (let j = 0; j < newSelectedMessageIds.length; j++) {
                  for (let i = 0; i < newMessages.length; i++) {
                    if (newMessages[i].id === newSelectedMessageIds[j]) {
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
            });
          }
        }
      });
    });
  };

  _removeLabelSelectedMessages = label => {
    this.state.selectedMessageIds.forEach(messageId => {
      this.state.messages.forEach(message => {
        if (messageId === message.id) {
          if (message.labels.includes(label)) {
            let labelArray = message.labels;
            labelArray.splice(labelArray.indexOf(label), 1);
            let newLabels = labelArray.join(',');
            let changes = {
              fields: {
                labels: newLabels
              }
            };
            //making changes to API with updateMessage
            updateMessage(messageId, changes).then(messages => {
              this.setState(prevState => {
                const newMessages = prevState.messages.slice(0);
                const newSelectedMessageIds = prevState.selectedMessageIds.slice(
                  0
                );
                for (let j = 0; j < newSelectedMessageIds.length; j++) {
                  for (let i = 0; i < newMessages.length; i++) {
                    if (newMessages[i].id === newSelectedMessageIds[j]) {
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
            });
          }
        }
      });
    });
  };

  _deleteSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId => {
      this.state.messages.forEach(message => {
        if (messageId === message.id) {
          //making changes to API with updateMessage
          deleteMessage(messageId).then(messages => {
            this.setState(prevState => {
              const newMessages = prevState.messages.slice(0);
              for (let j = 0; j < this.state.selectedMessageIds.length; j++) {
                for (let i = 0; i < newMessages.length; i++) {
                  if (newMessages[i].id === this.state.selectedMessageIds[j]) {
                    newMessages.splice(newMessages.indexOf(newMessages[i]), 1);
                  }
                }
              }
              return {
                messages: newMessages,
                selectedMessageIds: []
              };
            });
          });
        }
      });
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
    let composedMessage = {
      fields: {
        subject: subject,
        read: false,
        starred: false,
        labels: 'new'
      }
    };
    console.log(composedMessage);
    //making changes to API with createMessage
    createMessage(composedMessage).then(message => {
      this.setState(prevState => {
        let newMessages = prevState.messages.slice(0);
        newMessages.unshift(message);
        return {
          messages: newMessages,
          shouldShowComposeForm: false
        };
      });
    });
  };
}

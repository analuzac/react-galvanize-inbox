import React, { Component } from 'react';

//import env from './env';

import InboxPage from './components/InboxPage';
import getMessages from './api/getMessages';
import updateMessage from './api/updateMessage';
import deleteMessage from './api/deleteMessage';
import createMessage from './api/createMessage';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      selectedMessageIds: [],
      shouldShowComposeForm: false,
      showApiError: false
    };

    this.props.store.subscribe(() => {
      this.setState(this.props.store.getState());
    });
  }

  render() {
    console.log('this is state', this.state);
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

  componentDidMount() {
    getMessages().then(records => {
      //   {
      //   databaseId: env.AIRTABLE_DATABASE_ID,
      //   token: env.AIRTABLE_TOKEN
      // }
      this.props.store.dispatch({ type: 'GET_MESSAGES', messages: records });
    });
  }

  _markAsReadMessage = messageId => {
    let changes = {};
    changes.read = true;
    updateMessage(messageId, changes).then(updatedMessage => {
      this.props.store.dispatch({
        type: 'MARK_AS_READ',
        message: updatedMessage
      });
    });
  };

  _starMessage = messageId => {
    let changes = {};
    changes.starred = true;
    updateMessage(messageId, changes).then(updatedMessage => {
      console.log(updatedMessage);
      this.props.store.dispatch({
        type: 'STAR_MESSAGE',
        updatedMessage
      });
    });
  };

  _unstarMessage = messageId => {
    let changes = {};
    changes.starred = false;
    updateMessage(messageId, changes).then(updatedMessage => {
      this.props.store.dispatch({
        type: 'UNSTAR_MESSAGE',
        message: updatedMessage
      });
    });
  };

  _selectMessage = messageId => {
    this.props.store.dispatch({
      type: 'SELECT_MESSAGE',
      messageId
    });
  };

  _deselectMessage = messageId => {
    this.props.store.dispatch({
      type: 'DESELECT_MESSAGE',
      messageId
    });
  };

  _selectAllMessages = () => {
    this.props.store.dispatch({
      type: 'SELECT_ALL_MESSAGES'
    });
  };

  _deselectAllMessages = () => {
    this.props.store.dispatch({
      type: 'DESELECT_ALL_MESSAGES'
    });
  };

  _markAsReadSelectedMessages = () => {
    this.props.store.getState(
      this.state.selectedMessageIds.forEach(messageId =>
        this._markAsReadMessage(messageId)
      )
    );
  };

  //Helper function for _markAsUnreadSelectedMessages
  _markAsUnreadMessage = messageId => {
    let changes = {};
    changes.read = false;
    updateMessage(messageId, changes).then(updatedMessage => {
      this.props.store.dispatch({
        type: 'MARK_AS_UNREAD',
        message: updatedMessage
      });
    });
  };

  _markAsUnreadSelectedMessages = () => {
    this.props.store.getState(
      this.state.selectedMessageIds.forEach(messageId =>
        this._markAsUnreadMessage(messageId)
      )
    );
  };

  //Helper function for _applyLabelSelectedMessages
  _applyLabel = ({ label, messageId }) => {
    //debugger;
    this.state.messages.forEach(message => {
      if (messageId === message.id) {
        if (message.labels.includes(label)) {
          //nothing happens
        } else {
          let labelArray = message.labels;
          labelArray.push(label);
          let newLabels = labelArray.join(',');

          let changes = {};
          changes.labels = newLabels;
          updateMessage(messageId, changes).then(updatedMessage => {
            this.props.store.dispatch({
              type: 'APPLY_LABEL',
              message: updatedMessage
            });
          });
        }
      }
    });
  };

  _applyLabelSelectedMessages = label => {
    this.props.store.getState(
      this.state.selectedMessageIds.forEach(messageId =>
        this._applyLabel({ label, messageId })
      )
    );
  };

  //Helper function for _removeLabelSelectedMessages
  _removeLabel = ({ label, messageId }) => {
    this.state.messages.forEach(message => {
      if (messageId === message.id) {
        if (message.labels.includes(label)) {
          let labelArray = message.labels;
          labelArray.splice(labelArray.indexOf(label), 1);
          let newLabels = labelArray.join(',');

          let changes = {};
          changes.labels = newLabels;
          updateMessage(messageId, changes).then(updatedMessage => {
            this.props.store.dispatch({
              type: 'REMOVE_LABEL_SELECTED_MESSAGES',
              message: updatedMessage
            });
          });
        }
      }
    });
  };

  _removeLabelSelectedMessages = label => {
    this.props.store.getState(
      this.state.selectedMessageIds.forEach(messageId =>
        this._removeLabel({ label, messageId })
      )
    );
  };

  _deleteSelectedMessages = () => {
    this.state.selectedMessageIds.forEach(messageId => {
      this.state.messages.forEach(message => {
        if (messageId === message.id) {
          deleteMessage(messageId).then(wasDeleted => {
            this.props.store.dispatch({
              type: 'DELETE_SELECTED_MESSAGES',
              messageId: message.id
            });
          });
        }
      });
    });
  };

  _openComposeForm = () => {
    this.props.store.dispatch({
      type: 'OPEN_COMPOSE_FORM',
      shouldShowComposeForm: true
    });
  };

  _composeFormCancel = () => {
    this.props.store.dispatch({
      type: 'COMPOSE_FORM_CANCEL',
      shouldShowComposeForm: false
    });
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
    createMessage(composedMessage).then(createdMessage => {
      this.props.store.dispatch({
        type: 'COMPOSE_FORM_SUBMIT',
        shouldShowComposeForm: false,
        message: createdMessage
      });
    });
  };
}

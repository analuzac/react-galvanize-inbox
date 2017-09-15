import React, { Component } from 'react';

import InboxPage from './components/InboxPage';

import getMessagesProcess from './redux/thunks/getMessagesProcess';
import updateMessageProcess from './redux/thunks/updateMessageProcess';
import deleteMessageProcess from './redux/thunks/deleteMessageProcess';
import createMessageProcess from './redux/thunks/createMessageProcess';

// import env from './env';
//
// import getMessages from './api/getMessages';
// import updateMessage from './api/updateMessage';
// import deleteMessage from './api/deleteMessage';
// import createMessage from './api/createMessage';

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
    this.props.store.dispatch(getMessagesProcess());
  }

  _markAsReadMessage = messageId => {
    let changes = {};
    changes.read = true;
    let actionType = 'MARK_AS_READ';
    this.props.store.dispatch(
      updateMessageProcess(messageId, changes, actionType)
    );
  };

  _starMessage = messageId => {
    let changes = {};
    changes.starred = true;
    let actionType = 'STAR_MESSAGE';
    this.props.store.dispatch(
      updateMessageProcess(messageId, changes, actionType)
    );
  };

  // Future refactor example to combine functions:
  // toggleStar = messageId => {
  //
  //   let changes = {};
  //   changes.starred = !messageId.starred;

  _unstarMessage = messageId => {
    let changes = {};
    changes.starred = false;
    let actionType = 'UNSTAR_MESSAGE';
    this.props.store.dispatch(
      updateMessageProcess(messageId, changes, actionType)
    );
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
    let actionType = 'MARK_AS_UNREAD';
    this.props.store.dispatch(
      updateMessageProcess(messageId, changes, actionType)
    );
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

          let actionType = 'APPLY_LABEL';

          this.props.store.dispatch(
            updateMessageProcess(messageId, changes, actionType)
          );
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

          let actionType = 'REMOVE_LABEL';

          this.props.store.dispatch(
            updateMessageProcess(messageId, changes, actionType)
          );
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
          this.props.store.dispatch(deleteMessageProcess(messageId));
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
    //console.log(composedMessage);
    this.props.store.dispatch(createMessageProcess(composedMessage));
  };
}

import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import InboxPage from '../../components/InboxPage';

import getMessagesProcess from '../thunks/getMessagesProcess';
import updateMessageProcess from '../thunks/updateMessageProcess';
import deleteMessageProcess from '../thunks/deleteMessageProcess';
import createMessageProcess from '../thunks/createMessageProcess';

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages,
    selectedMessageIds: state.selectedMessageIds,
    shouldShowComposeForm: state.shouldShowComposeForm,
    showApiError: state.showApiError
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMount: () => dispatch(getMessagesProcess()),
    onOpenComposeForm: () =>
      dispatch({
        type: 'OPEN_COMPOSE_FORM',
        shouldShowComposeForm: true
      }),
    onComposeFormCancel: () =>
      dispatch({
        type: 'COMPOSE_FORM_CANCEL',
        shouldShowComposeForm: false
      }),
    onComposeFormSubmit: ({ subject, body }) =>
      dispatch(
        // createMessageProcess({
        //   fields: {
        //     subject: subject,
        //     read: false,
        //     starred: false,
        //     labels: 'new'
        //   }
        // })
        createMessageProcess({
          subject: subject,
          read: false,
          starred: false,
          labels: 'new'
        })
      ),
    onMarkAsReadMessage: messageId =>
      dispatch(updateMessageProcess(messageId, { read: true }, 'MARK_AS_READ')),
    onMarkAsUnreadMessage: messageId =>
      dispatch(
        updateMessageProcess(messageId, { read: false }, 'MARK_AS_UNREAD')
      ),
    onStarMessage: messageId =>
      dispatch(
        updateMessageProcess(messageId, { starred: true }, 'STAR_MESSAGE')
      ),
    onUnstarMessage: messageId =>
      dispatch(
        updateMessageProcess(messageId, { starred: false }, 'UNSTAR_MESSAGE')
      ),
    onSelectMessage: messageId =>
      dispatch({
        type: 'SELECT_MESSAGE',
        messageId
      }),
    onDeselectMessage: messageId =>
      dispatch({
        type: 'DESELECT_MESSAGE',
        messageId
      }),
    onSelectAllMessage: () =>
      dispatch({
        type: 'SELECT_ALL_MESSAGES'
      }),
    onDeselectAllMessage: () =>
      dispatch({
        type: 'DESELECT_ALL_MESSAGES'
      }),
    onMarkAsReadSelectedMessages: ({
      selectedMessageIds,
      onMarkAsReadMessage
    }) =>
      selectedMessageIds.forEach(messageId => onMarkAsReadMessage(messageId)),
    onMarkAsUnreadSelectedMessages: ({
      selectedMessageIds,
      onMarkAsUnreadMessage
    }) =>
      selectedMessageIds.forEach(messageId => onMarkAsUnreadMessage(messageId)),
    //Helper function for _applyLabelSelectedMessages
    onApplyLabel: ({ label, messageId, messages }) => {
      //debugger;
      messages.forEach(message => {
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

            dispatch(updateMessageProcess(messageId, changes, actionType));
          }
        }
      });
    },

    onApplyLabelSelectedMessages: ({
      label,
      selectedMessageIds,
      onApplyLabel
    }) => {
      selectedMessageIds.forEach(messageId =>
        onApplyLabel({ label, messageId })
      );
    },

    //Helper function for _removeLabelSelectedMessages
    onRemoveLabel: ({ label, messageId, messages }) => {
      messages.forEach(message => {
        if (messageId === message.id) {
          if (message.labels.includes(label)) {
            let labelArray = message.labels;
            labelArray.splice(labelArray.indexOf(label), 1);
            let newLabels = labelArray.join(',');

            let changes = {};
            changes.labels = newLabels;

            let actionType = 'REMOVE_LABEL';

            dispatch(updateMessageProcess(messageId, changes, actionType));
          }
        }
      });
    },

    onRemoveLabelSelectedMessages: ({
      label,
      selectedMessageIds,
      onRemoveLabel
    }) => {
      selectedMessageIds.forEach(messageId =>
        onRemoveLabel({ label, messageId })
      );
    },

    onDeleteSelectedMessages: ({ selectedMessageIds, messages }) => {
      selectedMessageIds.forEach(messageId => {
        messages.forEach(message => {
          if (messageId === message.id) {
            dispatch(deleteMessageProcess(messageId));
          }
        });
      });
    }

    //);
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const onDidMount = lifecycle({
  componentDidMount() {
    this.props.onMount();
  }
});

export default compose(connectToStore, onDidMount)(InboxPage);

import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import InboxPage from '../../components/InboxPage';

import getMessagesProcess from '../thunks/getMessagesProcess';
import updateMessageProcess from '../thunks/updateMessageProcess';
import deleteMessageProcess from '../thunks/deleteMessageProcess';
import createMessageProcess from '../thunks/createMessageProcess';
import updateMarkAsReadUnreadSelectedMessagesProcess from '../thunks/updateMarkAsReadUnreadSelectedMessagesProcess';
import updateApplyLabelsProcess from '../thunks/updateApplyLabelsProcess';
import updateRemoveLabelsProcess from '../thunks/updateRemoveLabelsProcess';

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages,
    selectedMessageIds: state.selectedMessageIds,
    showComposeForm: state.shouldShowComposeForm,
    showApiError: state.showApiError
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onMount: () => dispatch(getMessagesProcess()),
    onOpenComposeForm: () => {
      dispatch({
        type: 'OPEN_COMPOSE_FORM',
        shouldShow: true
      });
    },
    onComposeFormCancel: () =>
      dispatch({
        type: 'COMPOSE_FORM_CANCEL',
        shouldShowComposeForm: false
      }),
    onComposeFormSubmit: ({ subject, body }) =>
      dispatch(
        createMessageProcess({
          fields: {
            subject: subject,
            read: false,
            starred: false,
            labels: 'new'
          }
        })
      ),
    onMarkAsReadMessage: messageId =>
      dispatch(updateMessageProcess(messageId, { read: true }, 'MARK_AS_READ')),
    onMarkAsUnreadMessage: messageId =>
      dispatch(
        updateMessageProcess(messageId, { read: false }, 'MARK_AS_UNREAD')
      ),

    onMarkAsReadSelectedMessages: messageId =>
      dispatch(
        updateMarkAsReadUnreadSelectedMessagesProcess(
          messageId,
          { read: true },
          'MARK_AS_READ'
        )
      ),
    onMarkAsUnreadSelectedMessages: messageId =>
      dispatch(
        updateMarkAsReadUnreadSelectedMessagesProcess(
          messageId,
          { read: false },
          'MARK_AS_UNREAD'
        )
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

    onApplyLabelSelectedMessages: label =>
      dispatch(updateApplyLabelsProcess(label)),

    onRemoveLabelSelectedMessages: label => {
      dispatch(updateRemoveLabelsProcess(label));
    },

    onDeleteSelectedMessages: messageId => {
      dispatch(deleteMessageProcess(messageId));
    }
  };
}

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const onDidMount = lifecycle({
  componentDidMount() {
    this.props.onMount();
  }
});

export default compose(connectToStore, onDidMount)(InboxPage);

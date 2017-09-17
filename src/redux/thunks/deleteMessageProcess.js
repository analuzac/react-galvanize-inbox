import deleteMessage from '../.././api/deleteMessage';

export default function deleteMessageProcess(messageId) {
  //We dont use getState or env here but leaving as placeholder
  // as a reminder that it's available to me:
  //return (dispatch, getState, env) => {
  return (dispatch, getState) => {
    return deleteMessage(messageId).then(wasDeleted => {
      dispatch({ type: 'DELETE_SELECTED_MESSAGES', messageId: messageId });
      getState();
      return wasDeleted;
    });
  };
}

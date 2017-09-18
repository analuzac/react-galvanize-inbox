// thunk(messageId, changes, actionType);

import updateMessage from '../.././api/updateMessage';

export default function updateMarkAsReadUnreadSelectedMessagesProcess(
  messageId,
  changes,
  actionType
) {
  //We dont use env here but leaving as placeholder
  // as a reminder that it's available to me:
  //return (dispatch, getState, env) => {
  return (dispatch, getState) => {
    getState().selectedMessageIds.forEach(messageId => {
      console.log(getState(), '<<<<<< getState');
      return updateMessage(messageId, changes).then(updatedMessage => {
        dispatch({ type: actionType, message: updatedMessage });
        return updatedMessage;
      });
    });
  };
}

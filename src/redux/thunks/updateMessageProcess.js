// thunk(messageId, changes, actionType);

import updateMessage from '../.././api/updateMessage';

export default function updateMessageProcess(messageId, changes, actionType) {
  //We dont use getState or env here but leaving as placeholder
  // as a reminder that it's available to me:
  //return (dispatch, getState, env) => {
  return (dispatch, getState) => {
    return updateMessage(messageId, changes).then(updatedMessage => {
      dispatch({ type: actionType, message: updatedMessage });
      getState();
      return updatedMessage;
    });
  };
}

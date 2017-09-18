// thunk(messageId, changes, actionType);

import updateMessage from '../.././api/updateMessage';

export default function updateRemoveLabelsProcess(messageId, label) {
  //We dont use env here but leaving as placeholder
  // as a reminder that it's available to me:
  //return (dispatch, getState, env) => {
  return (dispatch, getState) => {
    getState().selectedMessageIds.forEach(messageId =>
      getState().messages.forEach(message => {
        if (messageId === message.id) {
          if (message.labels.includes(label)) {
            let labelArray = message.labels;
            labelArray.splice(labelArray.indexOf(label), 1);
            let newLabels = labelArray.join(',');

            let changes = {};
            changes.labels = newLabels;

            let actionType = 'REMOVE_LABEL';

            return updateMessage(messageId, changes).then(updatedMessage => {
              dispatch({ type: actionType, message: updatedMessage });
              return updatedMessage;
            });
          }
        }
      })
    );
  };
}

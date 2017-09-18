// thunk(messageId, changes, actionType);

import updateMessage from '../.././api/updateMessage';

export default function updateApplyLabelsProcess(messageId, label) {
  //We dont use env here but leaving as placeholder
  // as a reminder that it's available to me:
  //return (dispatch, getState, env) => {
  return (dispatch, getState) => {
    getState().selectedMessageIds.forEach(messageId =>
      getState().messages.forEach(message => {
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

            //console.log(getState(), '<<<<<< getState');
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

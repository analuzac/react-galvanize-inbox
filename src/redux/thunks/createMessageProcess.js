import createMessage from '../.././api/createMessage';

export default function createMessageProcess(composedMessage) {
  //We dont use getState or env here but leaving as placeholder
  // as a reminder that it's available to me:
  //return (dispatch, getState, env) => {
  return (dispatch, getState) => {
    return createMessage(composedMessage).then(createdMessage => {
      dispatch({
        type: 'COMPOSE_FORM_SUBMIT',
        shouldShowComposeForm: false,
        message: createdMessage
      });
      return createdMessage;
    });
  };
}

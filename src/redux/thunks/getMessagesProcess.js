import getMessages from '../.././api/getMessages';

export default function getMessagesProcess() {
  //We dont use getState or env here but leaving as placeholder
  // as a reminder that it's available to me:
  //return (dispatch, getState, env) => {
  return (dispatch, getState) => {
    // This part would be useful for loading:
    // dispatch({ type: 'GET_MESSAGES_STARTED' });
    return getMessages().then(records => {
      // This part would be useful if env is setup:
      // {
      //   databaseId: env.AIRTABLE_DATABASE_ID,
      //   token: env.AIRTABLE_TOKEN
      // }
      dispatch({ type: 'GET_MESSAGES', messages: records });
      return records;
    });
    // Currently only doing 'happy path' but in practice we
    // should also account for failed attempts
    // .catch(error => {
    //   dispatch({ type: 'GET_MESSAGES_FAILED' });
    // });
  };
}

export default function rootReducer(
  currentState = {
    messages: [],
    selectedMessageIds: [],
    shouldShowComposeForm: false,
    showApiError: false
  },
  action
) {
  switch (action.type) {
    case 'GET_MESSAGES':
      return { ...currentState, messages: action.messages };
    case 'MARK_AS_READ':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'MARK_AS_UNREAD':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'STAR_MESSAGE':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'UNSTAR_MESSAGE':
      return {
        ...currentState,
        messages: currentState.messages.map(
          message =>
            message.id === action.message.id ? action.message : message
        )
      };
    case 'SELECT_MESSAGE':
      return {
        ...currentState,
        selectedMessageIds: [
          ...currentState.selectedMessageIds,
          action.messages
        ]
      };
    case 'DESELECT_MESSAGE':
      return {
        ...currentState,
        selectedMessageIds: currentState.selectedMessageIds.filter(
          messageId => messageId !== action.selectedMessageId
        )
      };
    case 'SELECT_ALL_MESSAGES':
      return {
        ...currentState,
        selectedMessageIds: currentState.messages.map(
          message => action.message.id
        )
      };
    case 'DESELECT_ALL_MESSAGES':
      return { ...currentState, selectedMessageIds: [] };
    case 'APPLY_LABEL_SELECTED_MESSAGES':
      return { ...currentState, messages: action.messages };
    case 'REMOVE_LABEL_SELECTED_MESSAGES':
      return { ...currentState, messages: action.messages };
    case 'DELETE_SELECTED_MESSAGES':
      return {
        ...currentState,
        selectedMessageIds: [],
        messages: currentState.messages.filter(
          message => message.id !== action.messageId
        )
      };
    case 'OPEN_COMPOSE_FORM':
      return {
        ...currentState,
        shouldShowComposeForm: action.shouldShowComposeForm
      };
    case 'COMPOSE_FORM_CANCEL':
      return {
        ...currentState,
        shouldShowComposeForm: action.shouldShowComposeForm
      };
    case 'COMPOSE_FORM_SUBMIT':
      return {
        ...currentState,
        shouldShowComposeForm: action.shouldShowComposeForm,
        messages: [action.message, ...currentState.messages]
      };
    default:
      return currentState;
  }
}

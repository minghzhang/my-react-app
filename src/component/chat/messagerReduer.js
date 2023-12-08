export const initialState = {
    selectedId: 0,
    message: 'Hello'
}

export function messagerReducer(state, action) {
    switch (action.type) {
        case 'changed_selection': {
            return {
                ...state,
                selectedId: action.contactId,
                message: ''
            };
        }
        case 'edited_message': {
            return {
                ...state,
                message: action.message,
            }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
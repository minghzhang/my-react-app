export function messagerReducer(state, action) {
    switch (action.type) {
        case 'changed_selection': {
            return {
                ...state,
                selectedId: action.id,
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
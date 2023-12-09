import Chat from "./Chat"
import ContactList from "./ContactList";
import {messagerReducer} from "./messagerReduer"
import {useReducer} from "react";

export default function Messager() {
    const [state, dispatch] = useReducer(messagerReducer, initialState);
    const message = state.message;
    const contact = contacts.find((c) => c.id === state.selectedId);

    return (
        <div>
            <ContactList contacts={contacts} selectedId={state.selectedId} dispatch={dispatch}/>
            <Chat  message={message} contact={contact} dispatch={dispatch}/>
        </div>
    );
}

const contacts = [
    {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
    {id: 1, name: 'Alice', email: 'alice@mail.com'},
    {id: 2, name: 'Bob', email: 'bob@mail.com'},
];

const initialState = {
    selectedId: contacts[0].id,
    message: ''
};
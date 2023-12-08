export default function Chat({contact, message, dispatch}) {
    return (
        <>
            <section className="chat">
            <textarea value={message} placeholder={'Chat to' + contact.name} onChange={(e) => {
                //todo : dispatch edited_message
                // read the input value from e.target.value
            }}/>
                <br/>
                <button>
                    Send to {contact.email}
                </button>
            </section>
        </>
    );
}
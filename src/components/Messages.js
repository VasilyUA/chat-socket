import React, {useContext} from 'react';
import _ from 'lodash';
import {Context} from "../my-hook/context";

export default function Messages({chat, me = {}}) {
    const {onSendMessage} = useContext(Context);
    const [messageValue, setMessageValue] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const messagesRef = React.useRef(null);

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages]);

    React.useEffect(() => {
        const msg = _.get(chat, 'messages', []);
        setMessages(msg);
    }, [chat]);

    const handlerSubmit = () => {
        onSendMessage({message: messageValue, chatId: chat._id, userId: me._id});
        setMessageValue('');
    }

    return <div className="chat-messages">
        <div ref={messagesRef} className="messages">
            {Boolean(messages.length) ? messages.map(item => <div className={item.userId !== me._id ? "message user_messages": "message"} key={item._id}>
                    <p>{item.message}</p>
                    <div>
                        <span>login: {_.get(item, 'user.email', 'Not found!')}</span>
                    </div>
                </div>
            ) : null}
        </div>
        <form>
            <textarea
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                className="form-control"
                rows="3"/>
            <button
                onClick={handlerSubmit}
                type="button"
                className="btn btn-primary"
            >
                Отправить
            </button>
        </form>
    </div>;
};
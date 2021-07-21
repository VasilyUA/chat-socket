import React, { useContext } from 'react';
import _ from 'lodash';
import { Context } from '../my-hook/context';

export default function Messages({ chat, me = {} }) {
	const { onSendMessage } = useContext(Context);
	const [messageValue, setMessageValue] = React.useState('');
	const [err, setErr] = React.useState('');
	const [messages, setMessages] = React.useState([]);
	const messagesRef = React.useRef(null);

	React.useEffect(() => {
		messagesRef.current.scrollTo(0, 99999);
	}, [messages]);

	React.useEffect(() => {
		const msg = _.get(chat, 'messages', []);
		setMessages(msg);
	}, [chat]);

	const submit = () => {
		if (messageValue.length === 0 || messageValue.length === 1) {
			setErr('is-invalid');
			setTimeout(() => {
				setErr('');
			}, 5000);
		}
		if (messageValue.length !== 0 && messageValue.length !== 1) {
			console.log(messageValue);
			onSendMessage({ message: messageValue, chatId: chat._id, userId: me._id });
			setMessageValue('');
		}
	};
	const handleKeyDown = (e) => {
		console.log(e.shiftKey && e.key === 'Enter');

		if (e.key === 'Enter') {
			if (!e.shiftKey) submit();
		}
	};
	const handlerSubmit = () => submit();

	return (
		<div className='chat-messages'>
			<div ref={messagesRef} className='messages'>
				{Boolean(messages.length) ? (
					<>
						{messages.map((item) => (
							<div className={item.userId !== me._id ? 'message user_messages' : 'message'} key={item._id}>
								<p>{item.message}</p>
								<div>
									<span>user: {_.get(item, 'user.email', 'Not found!')}</span>
								</div>
							</div>
						))}
						<form className='form-messeges'>
							<textarea
								onKeyDown={handleKeyDown}
								value={messageValue}
								onChange={(e) => setMessageValue(e.target.value)}
								className={`form-control form-feald ${err}`}
								rows='1'
								required
							/>
							<button onClick={handlerSubmit} type='button' className='btn btn-primary'>
								Отправить
							</button>
						</form>
					</>
				) : (
					<span>Добро пожаловать вибирете чат! </span>
				)}
			</div>
		</div>
	);
}

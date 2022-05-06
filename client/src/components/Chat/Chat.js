import React, { useState, useEffect } from "react";
import Message from "../Message/Message";
import "./Chat.css";
import { Input } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

export default function Chat({ socket }) {
	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket.on("receiveMessage", (data) => {
			setMessageList((list) => [...list, data]);
			scrollDown();
		});
	}, [socket]);

	const sendMessage = () => {
		if (message.trim() === "") return;
		socket.emit("message", { userId: socket.id, name: socket.name, message });
		setMessage("");
		clearInput();
	};

	const clearInput = () => {
		document.querySelector("#input").value = "";
	};

	const scrollDown = () => {
		const div = document.querySelector('.chat-body');
		div.scrollTop = div.scrollHeight;
	}

	return (
		<div className="chat-container">
			<div className="chat-body">
				<div className="messages">
					<div className="messages-list">
						{messageList.map((data, i) => (
							<Message key={i} text={data.message} author={data.name} bot={data.bot} socket={socket} authorId={data.userId} />
						))}
					</div>
				</div>
			</div>
			<div className="chat-footer">
				<Input className="message-input" placeholder="Write a message..." type="text" id="input" onChange={(e) => setMessage(e.target.value)} />
				<SendIcon className="btn-send" color="primary" onClick={() => sendMessage()} />
			</div>
		</div>
	);
}

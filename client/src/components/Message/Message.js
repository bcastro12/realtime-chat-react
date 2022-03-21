import React from "react";

export default function Message({ text, author, bot, socket, authorId }) {
	return (
		<>
			{bot ? (
				<span className="message-bot">{text}</span>
			) : (
				<span className={"message-container " + (authorId === socket.id ? "message-mine" : "")}>
					<p className="author">{author}</p>
					<span className="message">{text}</span>
				</span>
			)}
		</>
	);
}

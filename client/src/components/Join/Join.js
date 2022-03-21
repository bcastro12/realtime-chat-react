import React, { useState } from "react";
import "./Join.css";
import { Input, Button } from "@material-ui/core";

export default function Join({ socket, setVisibility }) {
	const [name, setName] = useState("");

	const handleSubmit = () => {
		if (name.trim() === "") return;
		socket.name = name;
		setVisibility(true);
		socket.emit("userConnected", name);
	};

	return (
		<div className="join-container">
			<div className="join-header">
				<h1>Join</h1>
			</div>
			<div className="join-body">
				<Input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name..." />
				<Button className="btn-join" variant="contained" color="primary" onClick={() => handleSubmit()}>
					Enter
				</Button>
			</div>
		</div>
	);
}

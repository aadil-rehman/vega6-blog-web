import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
	const [emailId, setEmailId] = useState("aadil@gmail.com");
	const [password, setPassword] = useState("Aadil@123");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/login",
				{ emailId, password },
				{ withCredentials: true }
			);
			dispatch(addUser(res?.data?.data));
			navigate("/feed");
			window.location.reload();
		} catch (err) {
			console.error("Error" + err);
		}
	};
	return (
		<div className="flex justify-center my-20">
			<div className="card card-border bg-base-300 w-96 ">
				<div className="card-body">
					<h2 className="card-title flex justify-center">Login</h2>
					<input
						type="text"
						value={emailId}
						onChange={(e) => setEmailId(e.target.value)}
						placeholder="Email"
						className="input"
					/>
					<input
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="input"
					/>

					<div className="card-actions justify-center">
						<button className="btn btn-primary" onClick={handleLogin}>
							Login
						</button>
					</div>
					<p className="text-xs text-center mt-2">
						Don't have an account?{" "}
						<a href="/signup" className="text-blue-500">
							Sign up
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;

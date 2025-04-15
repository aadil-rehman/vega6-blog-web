import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const DeleteUserAccount = () => {
	const [inputPassword, setInputPassword] = useState("");
	const [showToast, setShowToast] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleDeleteAccount = async () => {
		if (!inputPassword) return;
		try {
			await axios.delete(BASE_URL + "/account/delete", {
				data: { password: inputPassword },
				withCredentials: true,
			});
			setInputPassword("");
			dispatch(removeUser());
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
			navigate("/app");
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<div className="flex justify-center h-[60vh]">
				<div className="card card-border bg-base-300 w-96 ">
					<div className=" flex flex-col gap-6 justify-center items-center card-body">
						<div>
							<h2 className="card-title flex justify-center mb-2">
								Deactivate Account
							</h2>
							<p className="text-xs opacity-75">
								Once deleted, account can not be restored.
							</p>
						</div>

						<div className="flex gap-4 justify-between items-center">
							<label>Enter Password:</label>
							<input
								type="text"
								value={inputPassword}
								onChange={(e) => setInputPassword(e.target.value)}
								placeholder="Enter Password"
								className="input w-fit"
							/>
						</div>

						<div className="card-actions justify-center ">
							<button
								className="btn btn-error btn-sm"
								onClick={handleDeleteAccount}
							>
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</div>
			{showToast && (
				<div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 shadow-xl">
					<div className="alert alert-success">
						<span>Password updated successfully</span>
					</div>
				</div>
			)}
		</>
	);
};

export default DeleteUserAccount;

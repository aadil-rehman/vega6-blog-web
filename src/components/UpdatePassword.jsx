import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const UpdatePassword = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [showToast, setShowToast] = useState(false);

	const handlePasswordUpdate = async () => {
		try {
			const res = await axios.patch(
				BASE_URL + "/profile/password",
				{ currentPassword, newPassword },
				{ withCredentials: true }
			);
			console.log(res);
			setCurrentPassword("");
			setNewPassword("");
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<div className="flex justify-center h-[60vh]">
				<div className="card card-border bg-base-300 w-96 ">
					<div className="card-body mt-20">
						<h2 className="card-title flex justify-center mb-2">
							Update Your Password
						</h2>
						<input
							type="text"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							placeholder="Current Password"
							className="input"
						/>
						<input
							type="text"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder="New Password"
							className="input"
						/>

						<div className="card-actions justify-center mt-2">
							<button
								className="btn btn-primary btn-sm"
								onClick={handlePasswordUpdate}
							>
								Update
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

export default UpdatePassword;

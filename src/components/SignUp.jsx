import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import ImageUpload from "./ImageUpload";

const SignUp = () => {
	const [emailId, setEmailId] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profileImage, setProfileImage] = useState(null);

	const handleSignup = async () => {
		try {
			const res = await axios.post(BASE_URL + `/signup`, {
				firstName,
				lastName,
				emailId,
				password,
				profileImage,
			});
			if (res?.data?.status === 1) {
				window.location.href = "/login";
			} else {
				alert("Error creating account");
			}
		} catch (err) {
			console.error("Error" + err);
		}
	};

	return (
		<div className="flex justify-center my-20">
			<div className="card card-border bg-base-300 w-96 ">
				<div className="card-body">
					<h2 className="card-title flex justify-center">
						Create your account
					</h2>

					<ImageUpload
						image={profileImage}
						setImage={setProfileImage}
						cloudinary_folder="profile"
					/>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First Name"
						className="input"
					/>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last Name"
						className="input"
					/>

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
						placeholder="New Password"
						className="input"
					/>
					<input
						type="text"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm Password"
						className="input"
					/>

					<div className="card-actions justify-center">
						<button
							className="btn btn-primary btn-sm mt-2 text-sm"
							onClick={handleSignup}
						>
							Sign up
						</button>
					</div>
					<p className="text-xs text-center mt-2">
						Already have an account?{" "}
						<a href="/login" className="text-blue-500">
							Sign in
						</a>{" "}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

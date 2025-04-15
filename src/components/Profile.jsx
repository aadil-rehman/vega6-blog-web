import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

const Profile = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<div className="flex flex-col justify-center gap-2 mt-10">
			<div className="flex gap-5 mx-auto text-sm">
				<Link
					to="/profile/editProfile"
					className={`btn btn-sm ${
						currentPath === "/profile/editProfile"
							? "btn-primary"
							: "bg-base-100"
					} `}
				>
					Update Profile
				</Link>
				<Link
					to="/profile/editPassword"
					className={`btn btn-sm ${
						currentPath === "/profile/editPassword"
							? "btn-primary"
							: "bg-base-100"
					}`}
				>
					Update Password
				</Link>
				<Link
					to="/profile/deleteAccount"
					className={`btn btn-sm ${
						currentPath === "/profile/deleteAccount"
							? "btn-primary"
							: "bg-base-100"
					}`}
				>
					Delete Account
				</Link>
			</div>
			<Outlet />
		</div>
	);
};

export default Profile;

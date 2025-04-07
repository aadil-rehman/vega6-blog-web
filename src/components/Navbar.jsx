import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();

	async function handleLogout() {
		try {
			await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
			dispatch(removeUser());
			navigate("/login");
		} catch (err) {
			console.error("Error: " + err);
		}
	}
	return (
		<div className="navbar bg-base-300 shadow-sm">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost text-xl">
					📝 Bloggify
				</Link>
			</div>
			<div className="flex gap-2">
				{user && (
					<div className="dropdown dropdown-end mr-2">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img
									alt="Tailwind CSS Navbar component"
									src={user?.profileImage?.url}
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-48 p-2 shadow"
						>
							<li>
								<Link to="/myblogs">My Blogs</Link>
							</li>
							<li>
								<Link to="/profile">Profile</Link>
							</li>
							<li>
								<Link onClick={handleLogout}>
									Logout{" "}
									<ArrowRightStartOnRectangleIcon className="h-5 w-5 text-gray-200" />
								</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;

import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Home = () => {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getUser = async () => {
		if (user) return;
		try {
			const res = await axios.get(BASE_URL + "/profile", {
				withCredentials: true,
			});
			console.log(res);
			dispatch(addUser(res?.data?.data));
		} catch (err) {
			if (err.status === 401) {
				navigate("/login");
			}
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="flex-grow">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Home;

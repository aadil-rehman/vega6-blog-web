import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
	const user = useSelector((store) => store.user);

	const getUser = async () => {};
	console.log(user);
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

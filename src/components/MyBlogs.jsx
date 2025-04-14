import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMyFeed } from "../utils/myFeedSlice";
import BlogsTableRow from "./BlogsTableRow";
import Loader from "./Loader";

const MyBlogs = () => {
	const dispatch = useDispatch();
	const myfeed = useSelector((store) => store.myfeed);

	const getMyFeed = async () => {
		if (myfeed) return;
		try {
			const res = await axios.get(BASE_URL + "/blog/list", {
				withCredentials: true,
			});
			dispatch(addMyFeed(res?.data?.data));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getMyFeed();
	}, []);

	if (!myfeed) return <Loader />;
	return (
		<div className="w-[50vw] mx-auto">
			<ul className="list bg-base-100 rounded-box shadow-md mt-5">
				{myfeed.length === 0 && (
					<li className="list-none text-center p-5 text-lg font-bold">
						No Blogs Found
					</li>
				)}
				{myfeed.map((blog) => (
					<BlogsTableRow key={blog._id} blog={blog} myblog={true} />
				))}
			</ul>
		</div>
	);
};

export default MyBlogs;

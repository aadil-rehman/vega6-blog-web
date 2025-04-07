import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMyFeed } from "../utils/myFeedSlice";
import BlogsTableRow from "./BlogsTableRow";

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
	console.log(myfeed);
	useEffect(() => {
		getMyFeed();
	}, []);

	if (!myfeed) return <h1>Loading....</h1>;
	return (
		<div className="w-[50vw] mx-auto">
			<ul className="list bg-base-100 rounded-box shadow-md">
				<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
					Most played songs this week
				</li>
				{myfeed.map((blog) => (
					<BlogsTableRow key={blog._id} blog={blog} myblog={true} />
				))}
			</ul>
		</div>
	);
};

export default MyBlogs;

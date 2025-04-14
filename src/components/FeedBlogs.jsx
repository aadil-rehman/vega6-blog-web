import React, { useEffect } from "react";
import BlogsTableRow from "./BlogsTableRow";
import { BASE_URL, blogsData } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Loader from "./Loader";

const FeedBlogs = () => {
	const dispatch = useDispatch();
	const feed = useSelector((store) => store.feed);

	const getFeed = async () => {
		if (feed) return;
		try {
			const res = await axios.get(BASE_URL + "/blog/feed", {
				withCredentials: true,
			});
			dispatch(addFeed(res?.data?.data));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);

	if (!feed) return <Loader />;
	return (
		<div className="w-[50vw] mx-auto max-h-[80vh] overflow-y-auto mt-4 scrollbar-hidden">
			<ul className="list bg-base-100 rounded-box shadow-md mt-5">
				{feed.length === 0 && (
					<li className="list-none text-center p-5 text-lg font-bold">
						No Blogs Found
					</li>
				)}
				{feed.length > 0 && (
					<li className=" text-center pb-2 text-xs opacity-60 tracking-wide mb-2">
						Catch up on what everyone’s talking about
					</li>
				)}
				{feed.map((blog) => (
					<BlogsTableRow key={blog._id} blog={blog} />
				))}
			</ul>
		</div>
	);
};

export default FeedBlogs;

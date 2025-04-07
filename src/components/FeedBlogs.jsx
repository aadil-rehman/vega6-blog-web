import React, { useEffect } from "react";
import BlogsTableRow from "./BlogsTableRow";
import { BASE_URL, blogsData } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

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
	console.log(feed);
	useEffect(() => {
		getFeed();
	}, []);

	if (!feed) return <h1>Loading....</h1>;
	return (
		<div className="w-[50vw] mx-auto">
			<ul className="list bg-base-100 rounded-box shadow-md">
				<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
					Most played songs this week
				</li>
				{feed.map((blog) => (
					<BlogsTableRow key={blog._id} blog={blog} />
				))}
			</ul>
		</div>
	);
};

export default FeedBlogs;

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const Blog = () => {
	const { blogId } = useParams();
	const getBlog = async () => {
		const res = await axios.get(BASE_URL + `/blog/view/${blogId}`, {
			withCredentials: true,
		});
		console.log(res);
	};

	useEffect(() => {
		getBlog();
	}, []);
	return <div>Blog</div>;
};

export default Blog;

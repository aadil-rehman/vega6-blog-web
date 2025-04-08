import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
	const [blog, setBlog] = useState(null);
	const [blogImageUrl, setBlogImageUrl] = useState("");
	const [blogTitle, setBlogTitle] = useState("");
	const [blogDescription, setBlogDescription] = useState("");

	const { blogId } = useParams();

	const navigate = useNavigate();

	const hadleBlogSave = async () => {
		const res = await axios.patch(
			BASE_URL + `/blog/edit/${blogId}`,
			{ blogImage: { url: blogImageUrl }, blogTitle, blogDescription },
			{ withCredentials: true }
		);
		console.log(res);
		navigate(`/blog/view/${blogId}`);
	};

	const getBlog = async () => {
		const res = await axios.get(BASE_URL + `/blog/view/${blogId}`, {
			withCredentials: true,
		});
		setBlog(res?.data?.data);
	};

	useEffect(() => {
		getBlog();
	}, []);

	useEffect(() => {
		if (blog) {
			setBlogImageUrl(blog?.blogImage?.url || "");
			setBlogTitle(blog?.blogTitle || "");
			setBlogDescription(blog?.blogDescription || "");
		}
	}, [blog]);

	return (
		<div className="flex justify-center my-20">
			<div className="card card-border bg-base-300 w-96 ">
				<div className="card-body opacity-85">
					<h2 className="card-title flex justify-center">{blog?.blogTitle}</h2>
					<label className="text-xs font-bold">Blog Image</label>
					<input
						type="text"
						value={blogImageUrl}
						onChange={(e) => setBlogImageUrl(e.target.value)}
						placeholder="Enter image url"
						className="input text-xs"
					/>
					<label className="mt-2 text-xs font-bold">Blog Title</label>
					<input
						type="text"
						value={blogTitle}
						onChange={(e) => setBlogTitle(e.target.value)}
						placeholder="Enter blog title"
						className="input text-xs"
					/>
					<label className="mt-2 text-xs font-bold">Blog Description</label>
					<textarea
						type="text"
						value={blogDescription}
						onChange={(e) => setBlogDescription(e.target.value)}
						placeholder="Enter blog description"
						className="textarea text-xs"
					/>
					<div className="card-actions justify-center">
						<button
							className="btn btn-primary btn-sm text-sm mt-2"
							onClick={hadleBlogSave}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditBlog;

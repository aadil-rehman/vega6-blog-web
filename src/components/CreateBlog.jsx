import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
	const [blogImageUrl, setBlogImageUrl] = useState("");
	const [blogTitle, setBlogTitle] = useState("");
	const [blogDescription, setBlogDescription] = useState("");

	const navigate = useNavigate();

	const handleCreateBlog = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/blog/create",
				{ blogTitle, blogDescription, blogImage: { url: blogImageUrl } },
				{ withCredentials: true }
			);
			console.log(res);
			navigate("/myblogs");
		} catch (err) {
			console.error(err);
			alert(err?.response?.data?.Error);
		}
	};

	return (
		<div className="flex justify-center my-20">
			<div className="card card-border bg-base-300 w-[60vw] ">
				<div className="card-body opacity-85">
					<h2 className="card-title flex justify-center text-sm mb-4">
						Share your thoughts with the world — create a new blog post below.
					</h2>
					<label className="text-xs font-bold">Blog Image</label>
					<input
						type="text"
						value={blogImageUrl}
						onChange={(e) => setBlogImageUrl(e.target.value)}
						placeholder="Enter image url"
						className="input text-xs w-[55vw]"
					/>
					<label className="mt-2 text-xs font-bold">Blog Title</label>
					<input
						type="text"
						value={blogTitle}
						onChange={(e) => setBlogTitle(e.target.value)}
						placeholder="Enter blog title"
						className="input text-xs w-[55vw]"
					/>
					<label className="mt-2 text-xs font-bold">Blog Description</label>
					<textarea
						type="text"
						value={blogDescription}
						onChange={(e) => setBlogDescription(e.target.value)}
						placeholder="Enter blog description"
						className="textarea text-xs w-[55vw] h-40"
					/>
					<div className="card-actions justify-center">
						<button
							className="btn btn-primary btn-sm text-sm mt-2"
							onClick={handleCreateBlog}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateBlog;

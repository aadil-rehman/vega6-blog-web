import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "./ImageUpload";

const EditBlog = () => {
	const [blog, setBlog] = useState(null);
	const [blogImage, setBlogImage] = useState(null);
	const [blogTitle, setBlogTitle] = useState("");
	const [blogDescription, setBlogDescription] = useState("");

	const { blogId } = useParams();

	const navigate = useNavigate();

	const hadleBlogSave = async () => {
		try {
			const res = await axios.patch(
				BASE_URL + `/blog/edit/${blogId}`,
				{ blogImage, blogTitle, blogDescription },
				{ withCredentials: true }
			);
			console.log(res);
			navigate(`/blog/view/${blogId}`);
		} catch (err) {
			console.error(err);
		}
	};

	const getBlog = async () => {
		try {
			const res = await axios.get(BASE_URL + `/blog/view/${blogId}`, {
				withCredentials: true,
			});
			setBlog(res?.data?.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getBlog();
	}, []);

	useEffect(() => {
		if (blog) {
			setBlogImage(blog?.blogImage);
			setBlogTitle(blog?.blogTitle || "");
			setBlogDescription(blog?.blogDescription || "");
		}
	}, [blog]);

	return (
		<div className="flex justify-center my-20">
			<div className="card card-border bg-base-300 w-[60vw] ">
				<div className="card-body opacity-85">
					<h2 className="card-title flex justify-center">{blog?.blogTitle}</h2>
					<label className="text-xs font-bold">Blog Image</label>
					<ImageUpload
						image={blogImage}
						setImage={setBlogImage}
						cloudinary_folder="blog"
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

import {
	EyeIcon,
	HeartIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { shortenString } from "../utils/commonFunctions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogsTableRow = ({ blog, myblog }) => {
	const { blogTitle, blogDescription, blogImage } = blog;
	const navigate = useNavigate();

	const handleOpenBlog = () => {
		navigate(`/blog/view/${blog._id}`);
	};
	return (
		<li className="list-row gap-2 bg-base-200">
			<div>
				<img className="size-10 rounded-box" src={blogImage.url} />
			</div>
			<div className="flex justify-between">
				<div>
					<div>
						<div>{blogTitle}</div>
					</div>
					<p className="list-col-wrap text-xs opacity-80 mt-1">
						{shortenString(blogDescription, 75)}
					</p>
				</div>
				<div>
					{myblog ? (
						<button className="btn btn-square btn-ghost">
							<PencilSquareIcon className="h-5 w-5" />
						</button>
					) : (
						<button className="btn btn-square btn-ghost">
							<HeartIcon className="h-5 w-5" />
						</button>
					)}

					<button className="btn btn-square btn-ghost" onClick={handleOpenBlog}>
						<EyeIcon className="h-5 w-5" />
					</button>
				</div>
			</div>
		</li>
	);
};

export default BlogsTableRow;

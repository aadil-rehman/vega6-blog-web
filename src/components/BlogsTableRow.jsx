import {
	EyeIcon,
	HeartIcon,
	PencilSquareIcon,
	UserCircleIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { shortenString } from "../utils/commonFunctions";

import { useNavigate } from "react-router-dom";

const BlogsTableRow = ({ blog, myblog }) => {
	const { blogTitle, blogDescription, blogImage, authorId } = blog;
	const navigate = useNavigate();

	const handleOpenBlog = () => {
		navigate(`/blog/view/${blog._id}`);
	};

	const hadleEditBlog = () => {
		navigate(`/blog/edit/${blog._id}`);
	};
	return (
		<li className="list-row gap-2 bg-base-200">
			<div>
				<img className="size-10 rounded-box" src={blogImage.url} />
			</div>
			<div className="flex justify-between">
				<div>
					<div className="flex gap-3 items-center">
						<h1 className="border-cyan-800 border-1 px-1 py-0.5 text-xs rounded-lg flex gap-1 items-center">
							<UserCircleIcon className="w-4 h-4" />{" "}
							{authorId && authorId.firstName + " " + authorId.lastName}
						</h1>
						<h1 className="text-xs font-bold">{blogTitle}</h1>
					</div>
					<p className="list-col-wrap text-xs opacity-80 mt-1">
						{shortenString(blogDescription, 90)}
					</p>
				</div>
				<div className="min-w-20">
					{myblog ? (
						<button
							className="btn btn-square btn-ghost"
							onClick={hadleEditBlog}
						>
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

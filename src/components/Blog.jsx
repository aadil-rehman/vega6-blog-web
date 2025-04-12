import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import {
	ChatBubbleOvalLeftIcon,
	HeartIcon,
	PaperAirplaneIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

import Loader from "./Loader";
import { useSelector } from "react-redux";

const Blog = () => {
	const [blog, setBlog] = useState(null);
	const [allComments, setAllComments] = useState(null);
	const [dropComment, setDropComment] = useState("");
	const [refreshComments, setRefreshComments] = useState(false);
	const [refreshLikes, setRefreshLikes] = useState(false);
	const [numOfLikes, setNumOfLikes] = useState(null);
	const [currLikeObj, setCurrLikeObj] = useState(null);

	const { blogId } = useParams();
	const navigate = useNavigate();

	const user = useSelector((store) => store.user);
	const IsMyBlog =
		blog?.authorId?._id?.toString?.() === user?._id?.toString?.();

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

	const fetchComments = async () => {
		try {
			const res = await axios.get(BASE_URL + `/comments/view/${blogId}`, {
				withCredentials: true,
			});
			setAllComments(res?.data?.data);
			setRefreshComments(false);
		} catch (err) {
			console.error(err);
			setRefreshComments(false);
		}
	};

	const fetchLikes = async () => {
		try {
			const res = await axios.get(BASE_URL + `/likes/view/${blogId}`, {
				withCredentials: true,
			});
			setNumOfLikes(res?.data?.numberOfLikes);
			setCurrLikeObj(res?.data?.like);
			setRefreshLikes(false);
		} catch (err) {
			console.error(err);
			setRefreshLikes(false);
		}
	};

	useEffect(() => {
		getBlog();
	}, []);

	useEffect(() => {
		fetchComments();
	}, [refreshComments]);

	useEffect(() => {
		fetchLikes();
	}, [refreshLikes]);

	const hadleEditBlog = () => {
		navigate(`/blog/edit/${blog._id}`);
	};

	const handleAddComment = async () => {
		if (!dropComment) return;
		try {
			const res = await axios.post(
				BASE_URL + `/comments/create/${blogId}`,
				{
					message: dropComment,
				},
				{ withCredentials: true }
			);
			allComments.push(res?.data?.comment);
			setDropComment("");
			setRefreshComments(true);
		} catch (err) {
			console.error(err);
		}
	};

	const handleLike = async () => {
		try {
			const res = await axios.post(
				BASE_URL + `/likes/create/${blogId}`,
				{},
				{ withCredentials: true }
			);
			console.log(res);
			setCurrLikeObj(res?.data?.data);
			setRefreshLikes(true);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="grid grid-cols-3 w-[60vw] mx-auto mt-6 h-[80vh] gap-4">
			{!blog || Object.keys(blog).length === 0 ? (
				<div className="col-span-2 grid grid-rows-2 row-span-1">
					<Loader />
				</div>
			) : (
				<div className="col-span-2 grid grid-rows-2 row-span-1 gap-4">
					<div className="row-span-1 border-1 border-slate-700">
						<img
							className="w-fit h-full max-w-[40vw] object-cover"
							src={blog?.blogImage?.url}
						/>
					</div>
					<div className="row-span-1 flex flex-col gap-1">
						<div className="flex justify-between items-center mr-2">
							<h1 className="text-xs">
								{blog &&
									"Author : " +
										blog.authorId.firstName +
										" " +
										blog.authorId.lastName}
							</h1>
							<div className="flex gap-4 items-center text-sm">
								<span className="flex gap-1 items-center">
									<p className="text-xs">{numOfLikes}</p>
									<button onClick={handleLike}>
										{currLikeObj && currLikeObj.likeStatus === "like" ? (
											<HeartIconSolid className="w-5 h-5 cursor-pointer text-red-500" />
										) : (
											<HeartIcon className="w-5 h-5 cursor-pointer" />
										)}
									</button>
								</span>
								<span className="flex gap-1 items-center">
									<p className="text-xs">{allComments && allComments.length}</p>
									<ChatBubbleOvalLeftIcon className="w-5 h-5" />
								</span>
							</div>
						</div>
						<div className="flex gap-4 items-center">
							<h1 className="text-lg font-bold">{blog.blogTitle}</h1>
							{IsMyBlog && (
								<button
									className="btn btn-square btn-ghost"
									onClick={hadleEditBlog}
								>
									<PencilSquareIcon className="h-5 w-5" />
								</button>
							)}
						</div>
						<p className="text-sm opacity-85">{blog.blogDescription}</p>
					</div>
				</div>
			)}

			<div className="col-span-1 border-1 flex flex-col justify-between border-slate-700 p-2 overflow-auto">
				<div>
					<p className="text-xs">#Blog - {blog && blog.blogTitle}</p>
					<div className="divider my-0"></div>
					{!allComments ? (
						<Loader />
					) : allComments.length === 0 ? (
						<p className="text-xs text-center">No comments yet.</p>
					) : (
						<div>
							{allComments.map((comment) => (
								<div className="chat chat-start" key={comment._id}>
									<div className="chat-image avatar">
										<div className="w-6 rounded-full">
											<img
												alt="User photo"
												src={comment?.fromUserId?.profileImage?.url}
											/>
										</div>
									</div>
									<div className="chat-bubble text-xs">{comment.message}</div>
								</div>
							))}
						</div>
					)}
				</div>
				<div className="relative w-full">
					<input
						type="text"
						placeholder="Add a comment..."
						className="text-xs px-2 pr-7 py-1.5 bg-base-200 w-full border-1 border-slate-700 rounded-lg"
						value={dropComment}
						onChange={(e) => setDropComment(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault(); // prevent newline if using textarea
								handleAddComment();
							}
						}}
					/>
					<PaperAirplaneIcon
						className="w-5 h-5 absolute top-1 right-1 cursor-pointer opacity-90 hover:opacity-100"
						onClick={handleAddComment}
					/>
				</div>
			</div>
		</div>
	);
};

export default Blog;

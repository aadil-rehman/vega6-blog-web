import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import {
	ChatBubbleOvalLeftIcon,
	HeartIcon,
	PaperAirplaneIcon,
	PencilSquareIcon,
	TrashIcon,
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
	const [allLikes, setAllLikes] = useState(null);

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
			setCurrLikeObj(res?.data?.currlikeObj);
			setAllLikes(res?.data?.likes);
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

	const handleDeleteBlog = async () => {
		try {
			const res = await axios.delete(BASE_URL + `/blog/delete/${blogId}`, {
				withCredentials: true,
			});
			if (res?.data?.status === 1) {
				window.location.href = "/myblogs";
			}
		} catch (err) {
			console.error(err);
		}
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
			setCurrLikeObj(res?.data?.data);
			setRefreshLikes(true);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="fixed top-15 mx-auto w-full h-[80vh]">
			<div className="grid grid-cols-3 w-[60vw] mx-auto mt-6 h-[80vh] gap-4 ">
				{!blog || Object.keys(blog).length === 0 ? (
					<div className="col-span-2 grid grid-rows-2 row-span-1">
						<Loader />
					</div>
				) : (
					<div className="col-span-2 grid grid-rows-2 row-span-1 gap-4">
						<div className="row-span-1 border-1 border-cyan-900">
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
										<div className="text-xs">
											<LikeDropdown
												allLikes={allLikes}
												numOfLikes={numOfLikes}
											/>
										</div>
										<button onClick={handleLike}>
											{currLikeObj && currLikeObj.likeStatus === "like" ? (
												<HeartIconSolid className="w-5 h-5 cursor-pointer text-red-500" />
											) : (
												<HeartIcon className="w-5 h-5 cursor-pointer" />
											)}
										</button>
									</span>
									<span className="flex gap-1 items-center">
										<p className="text-xs">
											{allComments && allComments.length}
										</p>
										<ChatBubbleOvalLeftIcon className="w-5 h-5" />
									</span>
								</div>
							</div>
							<div className="flex gap-4 items-center">
								<h1 className="text-lg font-bold">{blog.blogTitle}</h1>
								{IsMyBlog && (
									<div className="flex gap-1 ml-auto">
										<button
											className="btn btn-square btn-ghost"
											onClick={hadleEditBlog}
										>
											<PencilSquareIcon className="h-5 w-5" />
										</button>
										<button
											className="btn btn-square btn-ghost"
											onClick={handleDeleteBlog}
										>
											<TrashIcon className="h-5 w-5" />
										</button>
									</div>
								)}
							</div>
							<p className="text-sm opacity-85">{blog.blogDescription}</p>
						</div>
					</div>
				)}

				<div className="col-span-1 border-1 flex flex-col justify-between border-cyan-900 p-2 h-[80vh]">
					<div>
						<p className="text-xs border-1 border-t-0 border-l-0 border-r-0 border-b-cyan-900 pb-1 mb-1">
							#Blog - {blog && blog.blogTitle}
						</p>
						{/* <div className="divider my-0 divider-[#0E7490]"></div> */}
						{!allComments ? (
							<Loader />
						) : allComments.length === 0 ? (
							<p className="text-xs text-center">No comments yet.</p>
						) : (
							<div className="flex-1 overflow-y-auto h-[70vh]">
								{allComments.map((comment) => (
									<div key={comment._id}>
										{comment?.fromUserId && (
											<div className="chat chat-start" key={comment._id}>
												<div className="chat-image avatar">
													<div className="w-7 rounded-full">
														<img
															alt="User photo"
															src={comment?.fromUserId?.profileImage?.url}
														/>
													</div>
												</div>
												<div className="flex flex-col">
													<div className="text-[10px] font-semibold text-cyan-500 mb-0.5">
														{"@" +
															comment?.fromUserId?.firstName +
															"" +
															comment?.fromUserId?.lastName}
													</div>
													<div className="chat-bubble text-xs py-1 w-full">
														{comment.message}
													</div>
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
					<div className="relative w-full mt-1">
						<input
							type="text"
							placeholder="Add a comment..."
							className="text-xs px-2 pr-7 py-1.5 bg-base-200 w-full border-1 border-cyan-900 rounded-lg"
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
		</div>
	);
};

const LikeDropdown = ({ allLikes, numOfLikes }) => {
	if (allLikes?.length === 0) return;
	return (
		<div className="dropdown dropdown-hover">
			<div tabIndex={0} role="button" className="m-1">
				{numOfLikes}
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content menu bg-base-200 rounded-box z-1 w-28 shadow-sm border-cyan-900 border-1"
			>
				{allLikes?.map((like, index) => (
					<div key={like._id}>
						{like?.fromUserId && (
							<li
								key={like._id}
								className={`border-cyan-900 ${
									index === 0 ? "" : "border-t-1"
								}  px-1 py-0.5 text-xs flex gap-1 items-center`}
							>
								{like.fromUserId.firstName + " " + like.fromUserId.lastName}
							</li>
						)}
					</div>
				))}
			</ul>
		</div>
	);
};

export default Blog;

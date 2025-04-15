import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const ImageUpload = ({ image, setImage, isProfileEdit, cloudinary_folder }) => {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFileChange = (e) => {
		const selected = e.target.files[0];
		if (selected) {
			setFile(selected);
		}
	};
	const handleUpload = async () => {
		if (!file) return;
		const formData = new FormData();
		formData.append("image", file);

		setLoading(true);
		try {
			const res = await axios.post(
				BASE_URL + `/image/upload/${cloudinary_folder}`,
				formData,
				{
					withCredentials: true,
				}
			);
			const profileDataObj = {
				public_id: res?.data?.public_id,
				url: res?.data?.url,
			};
			console.log(profileDataObj);
			setImage(profileDataObj);
		} catch (err) {
			alert("Upload failed");
			console.error(err?.response?.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center gap-2 mr-4 mb-2 border-1 border-slate-500/70 p-2 bg-base-100 rounded-sm">
			<div className="flex items-center gap-2">
				{!isProfileEdit && (
					<p className="text-xs opacity-70">Upload profile image: </p>
				)}

				<label className="cursor-pointer inline-block border border-gray-400 rounded px-3 py-1 text-xs">
					Choose Image
					<input type="file" onChange={handleFileChange} className="hidden" />
				</label>

				<button
					onClick={handleUpload}
					disabled={!file || loading}
					className={`text-xs px-3 py-1 rounded ${
						loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
					} text-white`}
				>
					{loading ? "Uploading..." : "Upload"}
				</button>
			</div>
			{image && (
				<img
					src={image.url}
					alt="Preview"
					className="w-24 max-w-72 h-fit object-cover border"
				/>
			)}
		</div>
	);
};

export default ImageUpload;

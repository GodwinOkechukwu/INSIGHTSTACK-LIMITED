"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Image from "next/image";
import Picture from "../picture/Picture";
import Link from "next/link";

const Uploader = ({ setUploadImage, imageUrl }) => {
	const [files, setFiles] = useState([]);
	const uploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
	const upload_Preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		multiple: false,
		maxSize: 5000000, //the size of image,
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					}),
				),
			);
		},
	});

	const thumbs = files?.map((file) => (
		<div key={file.name}>
			<h4 className='text-xs'>Upload</h4>
			<Picture
				src={file.preview}
				alt={file.name}
				loading='eager'
				className='inline-flex border-2 border-gray-100 w-24 max-h-24'
			/>
		</div>
	));

	useEffect(() => {
		const uploadURL = uploadUrl;
		const uploadPreset = upload_Preset;
		if (files) {
			files.forEach((file) => {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("upload_preset", uploadPreset);
				axios({
					url: uploadURL,
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					data: formData,
				})
					.then((res) => {
						setUploadImage(res.data.secure_url);
					})
					.catch((err) => console.log(err));
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files, setUploadImage, upload_Preset, uploadUrl]);

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files],
	);

	return (
		<div className='w-full text-center'>
			<div
				className='px-6 pt-5 pb-6 border-[1px] border-primary-100 border-dashed rounded-md cursor-pointer'
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				<span className='mx-auto flex justify-center'>
					<FiUploadCloud className='text-3xl text-primary-300' />
				</span>
				<p className='text-sm mt-2'>Drag your image here</p>
				<em className='text-xs text-gray-400'>
					(Only *.jpeg and *.png 5MB max images will be accepted)
				</em>
			</div>
			<aside className='flex justify-between items-center flex-row flex-wrap mt-4 lg:px-8'>
				<div className="w-24 h-24'">{thumbs}</div>

				{imageUrl && (
					<div className='bg-primaryColor-300 text-white p-1 rounded-md'>
						<h4 className='text-xs'>Current Upload</h4>
						<Link target='_blank' href={imageUrl}>
							<Picture
								src={imageUrl}
								alt={"user-image"}
								loading='eager'
								className='inline-flex border-2 border-gray-100 w-24 max-h-24'
							/>
						</Link>
					</div>
				)}
			</aside>
		</div>
	);
};

export default Uploader;

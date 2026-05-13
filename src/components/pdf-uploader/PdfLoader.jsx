"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Link from "next/link";

const PdfLoader = ({ setPdfUrl, pdfUrl }) => {
	const [file, setFile] = useState(null);
	const uploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
	const upload_Preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

	const { getRootProps, getInputProps } = useDropzone({
		accept: "application/pdf", // Accept only PDF files
		multiple: false,
		maxSize: 5000000, // Set the maximum file size in bytes (adjust as needed)
		onDrop: (acceptedFiles) => {
			if (acceptedFiles.length > 0) {
				setFile(acceptedFiles[0]);
			}
		},
	});

	useEffect(() => {
		const uploadURL = uploadUrl;
		const uploadPreset = upload_Preset;
		if (file) {
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
					setPdfUrl(res.data.secure_url);
				})
				.catch((err) => console.log(err));
		}
	}, [file, uploadUrl, upload_Preset, setPdfUrl]);

	const thumbs = file && (
		<div key={file}>
			<h4 className='text-xs'>Upload</h4>
			<h3 className='text-xs'>Pdf doc: {file.path}</h3>
		</div>
	);

	return (
		<div className='w-full text-center'>
			<div
				className='px-6 pt-5 pb-6 border-[1px] border-primary-100 border-dashed rounded-md cursor-pointer'
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				<span className='mx-auto flex justify-center'>
					<FiUploadCloud className='text-3xl text-emerald-500' />
				</span>
				<p className='text-sm mt-2'>Drag your file here - PDF only</p>
				<em className='text-xs text-gray-400'>
					(All files are accepted 5MB max)
				</em>
			</div>
			<aside className='flex justify-between items-center flex-row flex-wrap mt-4'>
				<div className="w-32'">{thumbs}</div>
				{pdfUrl && (
					<div className='text-xs'>
						<b>Uploaded PDF </b>
						<Link
							href={pdfUrl}
							className='bg-primaryColor-300 text-white p-1 rounded-2xl line-clamp-1 w-[35rem]'
							target='_blank'
							rel='noopener noreferrer'
						>
							{pdfUrl}
						</Link>
					</div>
				)}
			</aside>
		</div>
	);
};

export default PdfLoader;

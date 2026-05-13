"use client";
import { socialMediaPlatforms } from "@constants/shareConstant";
import React from "react";
import { FacebookShareCount } from "react-share";

interface SocialMediaShareProps {
	title: string;
	picture_url: string;
	mediaDescription: string;
	shareUrl: string;
	APP_ID: string;
}

const SocialMediaShare = ({
	APP_ID,
	mediaDescription,
	picture_url,
	shareUrl,
	title,
}: SocialMediaShareProps) => {
	return (
		<>
			{socialMediaPlatforms.map((platform, index) => {
				const { Button, Icon } = platform;
				return (
					<div key={index} className='flex items-center justify-center'>
						<Button
							title={title}
							url={shareUrl}
							// image={picture_url}
							// description={mediaDescription}
							appId={APP_ID}
							className='w-full h-full'
							// media={""}
						>
							<Icon className='transition-[.4] hover:scale-110 w-6 h-6 lg:w-7 lg:h-7' />
						</Button>
						<FacebookShareCount url={shareUrl}>
							{(count) => <div className='share-count'>{count}</div>}
						</FacebookShareCount>
					</div>
				);
			})}
		</>
	);
};

export default SocialMediaShare;

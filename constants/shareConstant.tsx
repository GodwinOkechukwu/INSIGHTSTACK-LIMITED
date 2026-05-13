"use client";
import {
	EmailShareButton,
	FacebookMessengerShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";

import {
	EmailIcon,
	FacebookIcon as FacebookIcon2,
	FacebookMessengerIcon,
	LinkedinIcon,
	TwitterIcon as TwitterIcon2,
	WhatsappIcon,
} from "react-share";

export const socialMediaPlatforms = [
	{ Button: EmailShareButton, Icon: EmailIcon, color: "#D44638" },
	{ Button: FacebookShareButton, Icon: FacebookIcon2, color: "#1877f2" },
	{ Button: TwitterShareButton, Icon: TwitterIcon2, color: "#1DA1F2" },
	{ Button: LinkedinShareButton, Icon: LinkedinIcon, color: "#0077B5" },
	{ Button: WhatsappShareButton, Icon: WhatsappIcon, color: "#25D366" },
	{
		Button: FacebookMessengerShareButton,
		Icon: FacebookMessengerIcon,
		color: "#25D366",
	},
];

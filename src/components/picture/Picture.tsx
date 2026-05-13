import Image, { StaticImageData } from "next/image";

interface PictureProps {
	alt: string;
	src: string | StaticImageData;
	width?: number;
	height?: number;
	loading?: "lazy" | "eager" | undefined;
	sizes?: string;
	className?: string;
	priority?: boolean;
}

const Picture = ({
	src,
	alt,
	width,
	height,
	loading = "lazy",
	sizes,
	priority,
	className,
}: PictureProps) => {
	return (
		<Image
			src={src}
			alt={alt || "image"}
			width={width || 1800}
			height={height || 1800}
			sizes={sizes || "100vw"}
			loading={loading}
			quality={100}
			priority={false}
			className={className || ""}
		/>
	);
};

export default Picture;

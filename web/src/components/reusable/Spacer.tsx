type SpacerProps = {
	className?: string;
};

export const Spacer = ({ className }: SpacerProps) => {
	return <div className={`${className}`}></div>;
};

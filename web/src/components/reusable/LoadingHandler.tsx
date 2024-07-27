import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";

type LoadingHandlerProps = {
	children: React.ReactNode;
};

const Loading = () => {
	return (
		<div>
			<FontAwesomeIcon className="animate-spin" icon={faSpinner} />
		</div>
	);
};

export const LoadingHandler = ({ children }: LoadingHandlerProps) => {
	return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

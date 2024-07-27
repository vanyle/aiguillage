import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

type ErrorHandlerProps = {
	children: React.ReactNode;
};

export const ErrorHandler = ({ children }: ErrorHandlerProps) => {
	const fallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);

	return (
		<QueryErrorResetBoundary>
			<ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
		</QueryErrorResetBoundary>
	);
};

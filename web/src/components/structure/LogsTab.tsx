import { useDefaultServiceGetLogs } from "../../../openapi/queries";
import { ServiceLog } from "../../../openapi/requests";
import { isDataError } from "../../lib/isDataError";

type LogsProps = {
	serviceId: number;
};

const formatLogs = (logs: ServiceLog[]) => {
	return logs
		.map((log) => `[${log.Kind}] ${log.Timestamp} ${log.Message}`)
		.join("\n");
};

export const LogsTab = ({ serviceId }: LogsProps) => {
	const {
		data: logs,
		isLoading,
		isError,
		error,
	} = useDefaultServiceGetLogs({
		serviceId: serviceId,
	});

	if (isError) {
		return <p>An error occured while fetching logs: {String(error)}</p>;
	}
	if (isLoading || !logs) {
		return <p>Loading...</p>;
	}
	if (isDataError(logs)) {
		return <p>An error occured while fetching logs: {String(logs)}</p>;
	}

	return (
		<div className="w-[900px]">
			<h1>Logs</h1>
			<textarea
				className="p-2 bg-slate-200 resize-none outline-none font-mono w-full h-[400px] overflow-y-auto"
				readOnly
				value={formatLogs(logs.logs)}
			></textarea>
		</div>
	);
};

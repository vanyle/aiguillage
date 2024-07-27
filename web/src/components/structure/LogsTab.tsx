type LogsProps = {
	serviceId: string;
};

export const LogsTab = ({ serviceId }: LogsProps) => {
	const logs = "[INFO] Log\n[WARNING] This is bad.";
	return (
		<div className="w-[900px]">
			<h1>Logs</h1>
			<textarea
				className="p-2 bg-slate-200 resize-none outline-none font-mono w-full h-[400px] overflow-y-auto"
				readOnly
				value={logs}
			></textarea>
		</div>
	);
};

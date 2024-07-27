import { useServiceConfig } from "../hooks/use-service";

type ViewConfigProps = {
	serviceId: string;
};

export const ViewConfigTab = ({ serviceId }: ViewConfigProps) => {
	const config = useServiceConfig(serviceId);
	return (
		<pre className="p-2 inline-block bg-stone-200">
			{JSON.stringify(config, null, 2)}
		</pre>
	);
};

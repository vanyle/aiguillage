import { createLazyFileRoute } from "@tanstack/react-router";
import { ServiceCrud } from "../components/structure/ServiceCrud";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="p-2">
			<ServiceCrud />
		</div>
	);
}

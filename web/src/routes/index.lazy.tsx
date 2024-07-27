import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ServiceCrud } from "../components/structure/ServiceCrud";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	console.log(faTrainSubway.icon[1]);

	return (
		<div className="p-2">
			<ServiceCrud />
		</div>
	);
}

import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/reusable/Header";

export const Route = createRootRoute({
	component: () => (
		<>
			<Header title="Aiguillage" icon={faTrainSubway} />
			<Outlet />
		</>
	),
});

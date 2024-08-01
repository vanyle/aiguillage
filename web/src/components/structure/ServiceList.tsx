import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import {
	ErrorModel,
	Service,
	ServiceListBody,
} from "../../../openapi/requests";
import { isDataError } from "../../lib/isDataError";
import { useDeleteService, useServiceDisplayUrl } from "../hooks/use-service";
import { Spacer } from "../reusable/Spacer";

type ServiceListProps = {
	services: ErrorModel | ServiceListBody | undefined;
};

type ServiceRendererProps = {
	service: Service;
};

const ServiceRenderer = ({ service }: ServiceRendererProps) => {
	const displayUrl = useServiceDisplayUrl(service.ID);

	return (
		<div className="flex items-center">
			<div className="flex flex-col p-2">
				<div className="text-lg font-semibold">{service.Name}</div>
				<div className="text-sm opacity-70">{service.Version}</div>
			</div>
			<Spacer className="w-4" />
			<div>{displayUrl}</div>
		</div>
	);
};

export const ServiceList = ({ services }: ServiceListProps) => {
	const deleteService = useDeleteService();
	if (!services) return;
	if (isDataError(services)) throw services.detail;

	return (
		<>
			{services.services.map((service) => (
				<div key={service.ID}>
					<Spacer className="h-2" />
					<div
						className={`flex bg-white rounded-md cursor-pointer shadow transition-all items-center`}
					>
						<Link
							to={`/service/${service.ID.toString()}`}
							className={"flex-1 p-2 cursor-pointer"}
						>
							<ServiceRenderer service={service} />
						</Link>
						<>
							<div
								onClick={() => {
									deleteService(service.ID);
								}}
								className="p-2 rounded-full hover:bg-stone-300 pointer active:scale-90 transition-all w-8 h-8 flex items-center justify-center"
							>
								<FontAwesomeIcon icon={faTrash} />
							</div>
							<div className="p-1" />
						</>
					</div>
				</div>
			))}
		</>
	);
};

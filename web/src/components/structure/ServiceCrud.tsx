import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton, InputBase, Modal } from "@mui/material";
import { useCallback, useState } from "react";
import { useDefaultServiceSearchServices } from "../../../openapi/queries";
import { useDefaultServiceGetServicesSuspense } from "../../../openapi/queries/suspense";
import { Spacer } from "../reusable/Spacer";
import { CreateServiceForm } from "./CreateServiceForm";
import { ServiceList } from "./ServiceList";

export const ServiceCrud = () => {
	const { data } = useDefaultServiceGetServicesSuspense([], {});
	const [isCreateServiceOpened, setIsCreateServiceOpened] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const { data: searchedData } = useDefaultServiceSearchServices({
		name: searchQuery,
	});

	const performSearch = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const serviceList = searchQuery === "" ? data : searchedData;

	return (
		<>
			<Modal
				open={isCreateServiceOpened}
				onClose={() => setIsCreateServiceOpened(false)}
				className="flex items-center justify-center"
			>
				<div>
					<CreateServiceForm onClose={() => setIsCreateServiceOpened(false)} />
				</div>
			</Modal>
			<div className={`p-2 flex flex-col overflow-hidden`}>
				<div className="p-2 flex-1 flex items-center">
					<div className="py-1 px-3 w-3/4 flex bg-white rounded-md shadow">
						<IconButton type="button" aria-label="search">
							<FontAwesomeIcon icon={faSearch} />
						</IconButton>
						<InputBase
							className="w-full flex-1 text-2xl"
							size="medium"
							autoComplete="off"
							placeholder={`Search`}
							value={searchQuery}
							onChange={(e) => performSearch(e.target.value)}
						/>
					</div>
					<Spacer className="w-4" />
					<Button
						variant="contained"
						className="flex items-center py-1 text-2xl leading-none"
						onClick={() => {
							setIsCreateServiceOpened(true);
						}}
					>
						<FontAwesomeIcon icon={faPlus} />
						<div className="inline-block w-2" />
						<div className="leading-loose">New service</div>
					</Button>
				</div>
				<div className="flex-auto flex flex-col p-2 py-4 overflow-y-auto overflow-x-hidden">
					<ServiceList services={serviceList} />
				</div>
			</div>
		</>
	);
};

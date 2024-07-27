import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
	UseDefaultServiceGetServiceKeyFn,
	useDefaultServiceSetVersion,
} from "../../../openapi/queries";
import {
	useDeleteService,
	useServiceDescription,
	useServiceVersions,
} from "../hooks/use-service";
import { Spacer } from "../reusable/Spacer";

type VersionTabProps = {
	serviceId: string;
};

export const VersionTab = ({ serviceId }: VersionTabProps) => {
	const service = useServiceDescription(serviceId);
	const versions = useServiceVersions(service.Name);
	const { mutateAsync: setServiceVersion } = useDefaultServiceSetVersion();
	const deleteService = useDeleteService();

	const qc = useQueryClient();
	const [newVersion, setNewVersion] = useState(service.Version);

	const onSetClicked = useCallback(async () => {
		await setServiceVersion({
			id: Number(serviceId),
			version: newVersion,
		});
		qc.invalidateQueries({
			queryKey: UseDefaultServiceGetServiceKeyFn({
				id: Number(serviceId),
			}),
		});
	}, [newVersion, qc, serviceId, setServiceVersion]);

	const onDeleteThisService = useCallback(async () => {
		deleteService(serviceId);
	}, [deleteService, serviceId]);

	return (
		<>
			<div className="flex items-center">
				<span className="text-xl">Version</span>
				<Spacer className="w-4" />
				<TextField
					size="small"
					onChange={(e) => setNewVersion(e.target.value)}
					value={newVersion}
					variant="outlined"
					label="Key"
				/>
				{newVersion !== service.Version && (
					<>
						<Spacer className="w-4" />
						<Button variant="contained" onClick={onSetClicked}>
							Set
						</Button>
					</>
				)}
			</div>
			<Spacer className="h-4" />
			<Button onClick={onDeleteThisService} color="error" variant="contained">
				<FontAwesomeIcon icon={faTrash} />
				<Spacer className="w-2" />
				Delete this service
			</Button>
			<Spacer className="h-6" />
			<h2 className="text-2xl">Alternative versions</h2>
			<div className="flex flex-col gap-y-4">
				{versions.length === 1 && <p>No alternative versions</p>}
				{versions
					.filter((v) => v.ID !== Number(serviceId))
					.map((version) => (
						<div key={version.ID} className="shadow rounded-md p-2">
							<h2 className="text-xl font-semibold">{version.Version}</h2>
							<p>{version.Hostname}</p>
						</div>
					))}
			</div>
		</>
	);
};

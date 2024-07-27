import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
	useDefaultServiceCreateService,
	UseDefaultServiceGetServicesKeyFn,
} from "../../../openapi/queries";
import { Spacer } from "../reusable/Spacer";

type CreateServiceFormProps = {
	onClose: () => void;
};

export const CreateServiceForm = ({ onClose }: CreateServiceFormProps) => {
	const { mutateAsync: createService } = useDefaultServiceCreateService();

	const [name, setName] = useState("");
	const [version, setVersion] = useState("");
	const [hostname, setHostname] = useState("");

	const qc = useQueryClient();

	const onCreateClicked = useCallback(async () => {
		await createService({
			name,
			version,
			hostname,
		});
		await qc.invalidateQueries({
			queryKey: UseDefaultServiceGetServicesKeyFn(),
		});
		onClose();
	}, [createService, hostname, name, onClose, qc, version]);

	return (
		<div className="bg-white p-4">
			<h2 className="text-2xl">Create a new service</h2>
			<Spacer className="h-4" />
			<div className="flex items-center">
				<TextField
					size="small"
					variant="outlined"
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Spacer className="w-4" />
				<TextField
					size="small"
					variant="outlined"
					label="Version"
					value={version}
					onChange={(e) => setVersion(e.target.value)}
				/>
				<Spacer className="w-4" />
				<TextField
					size="small"
					variant="outlined"
					label="Hostname"
					value={hostname}
					onChange={(e) => setHostname(e.target.value)}
				/>
				<Spacer className="w-4" />
				<Button variant="contained" onClick={onCreateClicked}>
					Create
				</Button>
			</div>
		</div>
	);
};

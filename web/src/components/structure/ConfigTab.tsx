import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
	useDefaultServiceDeleteConfig,
	UseDefaultServiceGetConfigKeyFn,
	useDefaultServiceSetConfig,
} from "../../../openapi/queries";
import { useServiceConfig } from "../hooks/use-service";
import { Spacer } from "../reusable/Spacer";
import { TextWithIcon } from "../reusable/TextWithIcon";
import { ConfigItemEditor } from "./ConfigItemEditor";

type ConfigTabProps = {
	serviceId: number;
};

export const ConfigTab = ({ serviceId }: ConfigTabProps) => {
	const config = useServiceConfig(serviceId);
	const { mutateAsync: setConfig } = useDefaultServiceSetConfig();
	const { mutateAsync: clearAllConfig } = useDefaultServiceDeleteConfig();
	const qc = useQueryClient();

	const [newKey, setNewKey] = useState("");
	const [newValue, setNewValue] = useState("");

	const addConfig = useCallback(async () => {
		await setConfig({
			key: newKey,
			serviceId: serviceId,
			value: newValue,
		});
		setNewKey("");
		setNewValue("");
		qc.invalidateQueries({
			queryKey: UseDefaultServiceGetConfigKeyFn({ id: serviceId }),
		});
	}, [newKey, newValue, qc, serviceId, setConfig]);

	const clearAll = useCallback(async () => {
		await clearAllConfig({ id: serviceId });
		qc.invalidateQueries({
			queryKey: UseDefaultServiceGetConfigKeyFn({ id: serviceId }),
		});
	}, [clearAllConfig, qc, serviceId]);

	return (
		<div>
			{Object.keys(config).map((key) => (
				<ConfigItemEditor key={key} serviceId={serviceId} configKey={key} />
			))}
			<div className="flex">
				<TextField
					size="small"
					onChange={(e) => setNewKey(e.target.value)}
					value={newKey}
					variant="outlined"
					label="Key"
				/>
				<Spacer className="w-4" />
				<TextField
					size="small"
					value={newValue}
					onChange={(e) => setNewValue(e.target.value)}
					variant="outlined"
					label="Value"
				/>
				<Spacer className="w-4" />
				<Button onClick={addConfig} variant="contained">
					Add
				</Button>
			</div>
			<Spacer className="h-4" />
			<Button onClick={clearAll} variant="contained" color="error">
				<TextWithIcon icon={faTrash}>Clear all fields</TextWithIcon>
			</Button>
		</div>
	);
};

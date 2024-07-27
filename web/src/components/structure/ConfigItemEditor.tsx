import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
	UseDefaultServiceGetConfigItemKeyFn,
	UseDefaultServiceGetConfigKeyFn,
	useDefaultServiceSetConfig,
} from "../../../openapi/queries";
import { useDefaultServiceGetConfigItemSuspense } from "../../../openapi/queries/suspense";
import { isDataError } from "../../lib/isDataError";
import { Spacer } from "../reusable/Spacer";

type ConfigItemEditorProps = {
	serviceId: string;
	configKey: string;
};

const useServiceConfigValue = (serviceId: string, configKey: string) => {
	const { data } = useDefaultServiceGetConfigItemSuspense({
		key: configKey,
		serviceId: Number(serviceId),
	});

	if (isDataError(data)) throw data.detail;
	return data?.config;
};

export const ConfigItemEditor = ({
	serviceId,
	configKey,
}: ConfigItemEditorProps) => {
	const defaultValue = useServiceConfigValue(serviceId, configKey);

	const [value, setValue] = useState(defaultValue);
	const { mutateAsync: setConfig } = useDefaultServiceSetConfig();
	const qc = useQueryClient();

	const setConfigItem = useCallback(async () => {
		await setConfig({
			key: configKey,
			serviceId: Number(serviceId),
			value: value,
		});
		qc.invalidateQueries({
			queryKey: UseDefaultServiceGetConfigItemKeyFn({
				key: configKey,
				serviceId: Number(serviceId),
			}),
		});
		qc.invalidateQueries({
			queryKey: UseDefaultServiceGetConfigKeyFn({
				id: Number(serviceId),
			}),
		});
	}, [configKey, qc, serviceId, setConfig, value]);

	return (
		<>
			<div key={configKey} className="flex">
				<TextField
					size="small"
					variant="outlined"
					label="Key"
					disabled
					defaultValue={configKey}
				/>
				<Spacer className="w-4" />
				<TextField
					size="small"
					variant="outlined"
					label="Value"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Spacer className="w-4" />
				{value !== defaultValue && (
					<Button variant="contained" onClick={setConfigItem}>
						Set
					</Button>
				)}
			</div>
			<Spacer className="h-4" />
		</>
	);
};

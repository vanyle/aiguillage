import {
	faCodeCompare,
	faEye,
	faFileText,
	faGlobe,
	faHashtag,
	faPen,
	faServer,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Tab, Tabs } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { useState } from "react";
import {
	useServiceConfig,
	useServiceDescription,
} from "../components/hooks/use-service";
import { Spacer } from "../components/reusable/Spacer";
import { TextWithIcon } from "../components/reusable/TextWithIcon";
import { ConfigTab } from "../components/structure/ConfigTab";
import { LogsTab } from "../components/structure/LogsTab";
import { VersionTab } from "../components/structure/VersionTab";
import { ViewConfigTab } from "../components/structure/ViewConfigTab";

export const Route = createFileRoute("/service/$serviceId")({
	component: Service,
});

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}
function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

function Service() {
	const { serviceId: serviceStrId } = Route.useParams();
	const serviceId = parseInt(serviceStrId);
	const service = useServiceDescription(serviceId);
	const config = useServiceConfig(serviceId);

	const displayUrl =
		"display-url" in config ? config["display-url"] : service.Hostname;

	const [currentTab, setCurrentTab] = useState<number>(0);

	return (
		<div className="p-2">
			<div className="p-2 flex flex-col items-start">
				<h1 className="text-3xl font-semibold flex items-center">
					<TextWithIcon icon={faServer}>{service.Name}</TextWithIcon>
				</h1>
				<div className="flex p-4">
					<div className="p-4">
						<h2 className="opacity-90 text-xl flex items-center">
							<TextWithIcon icon={faHashtag}>{service.Version}</TextWithIcon>
						</h2>
						<h2 className="opacity-90 text-xl flex items-center">
							<TextWithIcon icon={faGlobe}>
								<a href={`http://${displayUrl}`}>{displayUrl}</a>
							</TextWithIcon>
						</h2>
					</div>
					<div className="p-4">
						<span className="opacity-90">Creation Time </span>
						<span className="font-semibold">
							{format(service.CreatedAt, "dd-MM-yyyy (H:mm)")}
						</span>
					</div>
				</div>
				<Spacer className="h-4" />
				<Spacer className="h-4" />

				<Tabs value={currentTab} onChange={(_, v) => setCurrentTab(v)}>
					<Tab
						label={<TextWithIcon icon={faEye}>View configuration</TextWithIcon>}
					/>
					<Tab label={<TextWithIcon icon={faPen}>Configure</TextWithIcon>} />
					<Tab
						label={
							<TextWithIcon icon={faCodeCompare}>
								Hosts and versions
							</TextWithIcon>
						}
					/>
					<Tab label={<TextWithIcon icon={faFileText}>Logs</TextWithIcon>} />
				</Tabs>
				<CustomTabPanel value={currentTab} index={0}>
					<ViewConfigTab serviceId={serviceId} />
				</CustomTabPanel>
				<CustomTabPanel value={currentTab} index={1}>
					<ConfigTab serviceId={serviceId} />
				</CustomTabPanel>
				<CustomTabPanel value={currentTab} index={2}>
					<VersionTab serviceId={serviceId} />
				</CustomTabPanel>
				<CustomTabPanel value={currentTab} index={3}>
					<LogsTab serviceId={serviceId} />
				</CustomTabPanel>
			</div>
		</div>
	);
}

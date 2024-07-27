import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import {
	useDefaultServiceDeleteService,
	UseDefaultServiceGetServicesKeyFn,
} from "../../../openapi/queries";
import {
	useDefaultServiceGetConfigSuspense,
	useDefaultServiceGetSelfServicesSuspense,
	useDefaultServiceGetServiceSuspense,
} from "../../../openapi/queries/suspense";
import { isDataError } from "../../lib/isDataError";

export const useServiceConfig = (serviceId: string) => {
	const { data } = useDefaultServiceGetConfigSuspense({
		id: Number(serviceId),
	});

	if (isDataError(data)) throw data.detail;
	return data.config;
};

export const useServiceDescription = (serviceId: string) => {
	const { data } = useDefaultServiceGetServiceSuspense({
		id: Number(serviceId),
	});

	if (isDataError(data)) throw data.detail;
	return data.service;
};

export const useServiceVersions = (serviceName: string) => {
	const { data } = useDefaultServiceGetSelfServicesSuspense({
		name: serviceName,
	});
	if (isDataError(data)) throw data.detail;
	return data.services;
};

export const useDeleteService = () => {
	const { mutateAsync: deleteService } = useDefaultServiceDeleteService();
	const qc = useQueryClient();
	const navigate = useNavigate();

	return useCallback(
		async (serviceId: string | number) => {
			await deleteService({ id: Number(serviceId) });
			qc.invalidateQueries({
				queryKey: UseDefaultServiceGetServicesKeyFn(),
			});
			navigate({ to: "/" });
		},
		[deleteService, navigate, qc]
	);
};

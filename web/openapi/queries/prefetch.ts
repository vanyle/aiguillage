// generated with @7nohe/openapi-react-query-codegen@1.4.0 

import { type QueryClient } from "@tanstack/react-query";
import { DefaultService } from "../requests/services.gen";
import * as Common from "./common";
/**
* Get the complete config
* @param data The data for the request.
* @param data.id The ID of the service
* @returns AllConfigObjBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceGetConfig = (queryClient: QueryClient, { id }: {
  id?: number;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceGetConfigKey, [{ id }]], queryFn: () => DefaultService.getConfig({ id }) });
/**
* Get a config option
* @param data The data for the request.
* @param data.serviceId The ID of the service
* @param data.key The configuration key
* @returns ConfigObjBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceGetConfigItem = (queryClient: QueryClient, { key, serviceId }: {
  key?: string;
  serviceId?: number;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceGetConfigItemKey, [{ key, serviceId }]], queryFn: () => DefaultService.getConfigItem({ key, serviceId }) });
/**
* Get service logs with filters
* @param data The data for the request.
* @param data.serviceId The ID of the service
* @param data.severity The severity of the log message
* @param data.limit The number of messages to return
* @param data.startTime The start time of the log messages
* @param data.endTime The end time of the log messages
* @returns LogListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceFilterLogs = (queryClient: QueryClient, { endTime, limit, serviceId, severity, startTime }: {
  endTime?: string;
  limit?: number;
  serviceId?: number;
  severity?: string;
  startTime?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceFilterLogsKey, [{ endTime, limit, serviceId, severity, startTime }]], queryFn: () => DefaultService.filterLogs({ endTime, limit, serviceId, severity, startTime }) });
/**
* Get service logs
* severity, start and end time are ignored
* @param data The data for the request.
* @param data.serviceId The ID of the service
* @param data.severity The severity of the log message
* @param data.limit The number of messages to return
* @param data.startTime The start time of the log messages
* @param data.endTime The end time of the log messages
* @returns LogListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceGetLogs = (queryClient: QueryClient, { endTime, limit, serviceId, severity, startTime }: {
  endTime?: string;
  limit?: number;
  serviceId?: number;
  severity?: string;
  startTime?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceGetLogsKey, [{ endTime, limit, serviceId, severity, startTime }]], queryFn: () => DefaultService.getLogs({ endTime, limit, serviceId, severity, startTime }) });
/**
* Search for services by name
* @param data The data for the request.
* @param data.name The name of the service to search for
* @returns ServiceListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceSearchServices = (queryClient: QueryClient, { name }: {
  name?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceSearchServicesKey, [{ name }]], queryFn: () => DefaultService.searchServices({ name }) });
/**
* Get yourself
* @param data The data for the request.
* @param data.name Your service name
* @returns ServiceDescBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceGetSelf = (queryClient: QueryClient, { name }: {
  name?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceGetSelfKey, [{ name }]], queryFn: () => DefaultService.getSelf({ name }) });
/**
* Get your config
* @param data The data for the request.
* @param data.name Your service name
* @returns AllConfigObjBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceGetSelfConfig = (queryClient: QueryClient, { name }: {
  name?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceGetSelfConfigKey, [{ name }]], queryFn: () => DefaultService.getSelfConfig({ name }) });
/**
* Get services with your name
* @param data The data for the request.
* @param data.name Your service name
* @returns ServiceListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceGetSelfServices = (queryClient: QueryClient, { name }: {
  name?: string;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceGetSelfServicesKey, [{ name }]], queryFn: () => DefaultService.getSelfServices({ name }) });
/**
* Get a service by ID
* @param data The data for the request.
* @param data.id The ID of the service
* @returns ServiceDescBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceGetService = (queryClient: QueryClient, { id }: {
  id?: number;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceGetServiceKey, [{ id }]], queryFn: () => DefaultService.getService({ id }) });
/**
* Get services
* @returns ServiceListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const prefetchUseDefaultServiceGetServices = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useDefaultServiceGetServicesKey, []], queryFn: () => DefaultService.getServices() });

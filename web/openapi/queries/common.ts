// generated with @7nohe/openapi-react-query-codegen@1.4.0 

import { UseQueryResult } from "@tanstack/react-query";
import { DefaultService } from "../requests/services.gen";
export type DefaultServiceGetConfigDefaultResponse = Awaited<ReturnType<typeof DefaultService.getConfig>>;
export type DefaultServiceGetConfigQueryResult<TData = DefaultServiceGetConfigDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetConfigKey = "DefaultServiceGetConfig";
export const UseDefaultServiceGetConfigKeyFn = ({ id }: {
  id?: number;
} = {}, queryKey?: Array<unknown>) => [useDefaultServiceGetConfigKey, ...(queryKey ?? [{ id }])];
export type DefaultServiceGetConfigItemDefaultResponse = Awaited<ReturnType<typeof DefaultService.getConfigItem>>;
export type DefaultServiceGetConfigItemQueryResult<TData = DefaultServiceGetConfigItemDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetConfigItemKey = "DefaultServiceGetConfigItem";
export const UseDefaultServiceGetConfigItemKeyFn = ({ key, serviceId }: {
  key?: string;
  serviceId?: number;
} = {}, queryKey?: Array<unknown>) => [useDefaultServiceGetConfigItemKey, ...(queryKey ?? [{ key, serviceId }])];
export type DefaultServiceFilterLogsDefaultResponse = Awaited<ReturnType<typeof DefaultService.filterLogs>>;
export type DefaultServiceFilterLogsQueryResult<TData = DefaultServiceFilterLogsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceFilterLogsKey = "DefaultServiceFilterLogs";
export const UseDefaultServiceFilterLogsKeyFn = ({ endTime, limit, serviceId, severity, startTime }: {
  endTime?: string;
  limit?: number;
  serviceId?: number;
  severity?: string;
  startTime?: string;
} = {}, queryKey?: Array<unknown>) => [useDefaultServiceFilterLogsKey, ...(queryKey ?? [{ endTime, limit, serviceId, severity, startTime }])];
export type DefaultServiceGetLogsDefaultResponse = Awaited<ReturnType<typeof DefaultService.getLogs>>;
export type DefaultServiceGetLogsQueryResult<TData = DefaultServiceGetLogsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetLogsKey = "DefaultServiceGetLogs";
export const UseDefaultServiceGetLogsKeyFn = ({ endTime, limit, serviceId, severity, startTime }: {
  endTime?: string;
  limit?: number;
  serviceId?: number;
  severity?: string;
  startTime?: string;
} = {}, queryKey?: Array<unknown>) => [useDefaultServiceGetLogsKey, ...(queryKey ?? [{ endTime, limit, serviceId, severity, startTime }])];
export type DefaultServiceSearchServicesDefaultResponse = Awaited<ReturnType<typeof DefaultService.searchServices>>;
export type DefaultServiceSearchServicesQueryResult<TData = DefaultServiceSearchServicesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceSearchServicesKey = "DefaultServiceSearchServices";
export const UseDefaultServiceSearchServicesKeyFn = ({ name }: {
  name?: string;
} = {}, queryKey?: Array<unknown>) => [useDefaultServiceSearchServicesKey, ...(queryKey ?? [{ name }])];
export type DefaultServiceGetSelfDefaultResponse = Awaited<ReturnType<typeof DefaultService.getSelf>>;
export type DefaultServiceGetSelfQueryResult<TData = DefaultServiceGetSelfDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetSelfKey = "DefaultServiceGetSelf";
export const UseDefaultServiceGetSelfKeyFn = ({ name }: {
  name?: string;
} = {}, queryKey?: Array<unknown>) => [useDefaultServiceGetSelfKey, ...(queryKey ?? [{ name }])];
export type DefaultServiceGetSelfConfigDefaultResponse = Awaited<ReturnType<typeof DefaultService.getSelfConfig>>;
export type DefaultServiceGetSelfConfigQueryResult<TData = DefaultServiceGetSelfConfigDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetSelfConfigKey = "DefaultServiceGetSelfConfig";
export const UseDefaultServiceGetSelfConfigKeyFn = ({ name }: {
  name?: string;
} = {}, queryKey?: Array<unknown>) => [useDefaultServiceGetSelfConfigKey, ...(queryKey ?? [{ name }])];
export type DefaultServiceGetSelfServicesDefaultResponse = Awaited<ReturnType<typeof DefaultService.getSelfServices>>;
export type DefaultServiceGetSelfServicesQueryResult<TData = DefaultServiceGetSelfServicesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetSelfServicesKey = "DefaultServiceGetSelfServices";
export const UseDefaultServiceGetSelfServicesKeyFn = ({ name }: {
  name?: string;
} = {}, queryKey?: Array<unknown>) => [useDefaultServiceGetSelfServicesKey, ...(queryKey ?? [{ name }])];
export type DefaultServiceGetServiceDefaultResponse = Awaited<ReturnType<typeof DefaultService.getService>>;
export type DefaultServiceGetServiceQueryResult<TData = DefaultServiceGetServiceDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetServiceKey = "DefaultServiceGetService";
export const UseDefaultServiceGetServiceKeyFn = ({ id }: {
  id?: number;
} = {}, queryKey?: Array<unknown>) => [useDefaultServiceGetServiceKey, ...(queryKey ?? [{ id }])];
export type DefaultServiceGetServicesDefaultResponse = Awaited<ReturnType<typeof DefaultService.getServices>>;
export type DefaultServiceGetServicesQueryResult<TData = DefaultServiceGetServicesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetServicesKey = "DefaultServiceGetServices";
export const UseDefaultServiceGetServicesKeyFn = (queryKey?: Array<unknown>) => [useDefaultServiceGetServicesKey, ...(queryKey ?? [])];
export type DefaultServiceSetConfigMutationResult = Awaited<ReturnType<typeof DefaultService.setConfig>>;
export type DefaultServiceLogMutationResult = Awaited<ReturnType<typeof DefaultService.log>>;
export type DefaultServiceSetSelfConfigMutationResult = Awaited<ReturnType<typeof DefaultService.setSelfConfig>>;
export type DefaultServiceSetHostnameMutationResult = Awaited<ReturnType<typeof DefaultService.setHostname>>;
export type DefaultServiceSetVersionMutationResult = Awaited<ReturnType<typeof DefaultService.setVersion>>;
export type DefaultServiceRegisterMutationResult = Awaited<ReturnType<typeof DefaultService.register>>;
export type DefaultServiceCreateServiceMutationResult = Awaited<ReturnType<typeof DefaultService.createService>>;
export type DefaultServiceDeleteConfigMutationResult = Awaited<ReturnType<typeof DefaultService.deleteConfig>>;
export type DefaultServiceDeleteServiceMutationResult = Awaited<ReturnType<typeof DefaultService.deleteService>>;

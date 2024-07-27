// generated with @7nohe/openapi-react-query-codegen@1.4.0 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
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
export const useDefaultServiceGetConfig = <TData = Common.DefaultServiceGetConfigDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetConfigKeyFn({ id }, queryKey), queryFn: () => DefaultService.getConfig({ id }) as TData, ...options });
/**
* Get a config option
* @param data The data for the request.
* @param data.serviceId The ID of the service
* @param data.key The configuration key
* @returns ConfigObjBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetConfigItem = <TData = Common.DefaultServiceGetConfigItemDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ key, serviceId }: {
  key?: string;
  serviceId?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetConfigItemKeyFn({ key, serviceId }, queryKey), queryFn: () => DefaultService.getConfigItem({ key, serviceId }) as TData, ...options });
/**
* Search for services by name
* @param data The data for the request.
* @param data.name The name of the service to search for
* @returns ServiceListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceSearchServices = <TData = Common.DefaultServiceSearchServicesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ name }: {
  name?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceSearchServicesKeyFn({ name }, queryKey), queryFn: () => DefaultService.searchServices({ name }) as TData, ...options });
/**
* Get yourself
* @param data The data for the request.
* @param data.name Your service name
* @returns ServiceDescBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetSelf = <TData = Common.DefaultServiceGetSelfDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ name }: {
  name?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetSelfKeyFn({ name }, queryKey), queryFn: () => DefaultService.getSelf({ name }) as TData, ...options });
/**
* Get your config
* @param data The data for the request.
* @param data.name Your service name
* @returns AllConfigObjBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetSelfConfig = <TData = Common.DefaultServiceGetSelfConfigDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ name }: {
  name?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetSelfConfigKeyFn({ name }, queryKey), queryFn: () => DefaultService.getSelfConfig({ name }) as TData, ...options });
/**
* Get services with your name
* @param data The data for the request.
* @param data.name Your service name
* @returns ServiceListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetSelfServices = <TData = Common.DefaultServiceGetSelfServicesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ name }: {
  name?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetSelfServicesKeyFn({ name }, queryKey), queryFn: () => DefaultService.getSelfServices({ name }) as TData, ...options });
/**
* Get a service by ID
* @param data The data for the request.
* @param data.id The ID of the service
* @returns ServiceDescBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetService = <TData = Common.DefaultServiceGetServiceDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetServiceKeyFn({ id }, queryKey), queryFn: () => DefaultService.getService({ id }) as TData, ...options });
/**
* Get services
* @returns ServiceListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetServices = <TData = Common.DefaultServiceGetServicesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetServicesKeyFn(queryKey), queryFn: () => DefaultService.getServices() as TData, ...options });
/**
* Set a config operation for a service
* @param data The data for the request.
* @param data.serviceId The ID of the service
* @param data.key The config key to set
* @param data.value The config value to set
* @returns GenericOutputBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceSetConfig = <TData = Common.DefaultServiceSetConfigMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  key?: string;
  serviceId?: number;
  value?: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  key?: string;
  serviceId?: number;
  value?: string;
}, TContext>({ mutationFn: ({ key, serviceId, value }) => DefaultService.setConfig({ key, serviceId, value }) as unknown as Promise<TData>, ...options });
/**
* Set your config
* @param data The data for the request.
* @param data.name Your service name
* @param data.key The config key to set
* @param data.value The config value to set
* @returns GenericOutputBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceSetSelfConfig = <TData = Common.DefaultServiceSetSelfConfigMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  key?: string;
  name?: string;
  value?: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  key?: string;
  name?: string;
  value?: string;
}, TContext>({ mutationFn: ({ key, name, value }) => DefaultService.setSelfConfig({ key, name, value }) as unknown as Promise<TData>, ...options });
/**
* Change the hostname of a service
* @param data The data for the request.
* @param data.id The ID of the service
* @param data.hostname The machine hosting the service
* @returns GenericOutputBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceSetHostname = <TData = Common.DefaultServiceSetHostnameMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  hostname?: string;
  id?: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  hostname?: string;
  id?: number;
}, TContext>({ mutationFn: ({ hostname, id }) => DefaultService.setHostname({ hostname, id }) as unknown as Promise<TData>, ...options });
/**
* Change the version of a service
* @param data The data for the request.
* @param data.id The ID of the service
* @param data.version The version of the service
* @returns GenericOutputBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceSetVersion = <TData = Common.DefaultServiceSetVersionMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id?: number;
  version?: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id?: number;
  version?: string;
}, TContext>({ mutationFn: ({ id, version }) => DefaultService.setVersion({ id, version }) as unknown as Promise<TData>, ...options });
/**
* Register yourself
* Register yourself as a service. A version will be automatically assigned to you.
* @param data The data for the request.
* @param data.name Name of the service registrating itself
* @returns OutputWithIdBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceRegister = <TData = Common.DefaultServiceRegisterMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  name?: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  name?: string;
}, TContext>({ mutationFn: ({ name }) => DefaultService.register({ name }) as unknown as Promise<TData>, ...options });
/**
* Create a new service
* Create a new service. Every version of a service must have a distinct hostname.
* @param data The data for the request.
* @param data.name Name of the service registrating itself
* @param data.version Version of the service
* @param data.hostname A Hostname or IP pointing to the service
* @returns OutputWithIdBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceCreateService = <TData = Common.DefaultServiceCreateServiceMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  hostname?: string;
  name?: string;
  version?: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  hostname?: string;
  name?: string;
  version?: string;
}, TContext>({ mutationFn: ({ hostname, name, version }) => DefaultService.createService({ hostname, name, version }) as unknown as Promise<TData>, ...options });
/**
* Clear all config entries of a service
* @param data The data for the request.
* @param data.id The ID of the service
* @returns GenericOutputBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceDeleteConfig = <TData = Common.DefaultServiceDeleteConfigMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id?: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id?: number;
}, TContext>({ mutationFn: ({ id }) => DefaultService.deleteConfig({ id }) as unknown as Promise<TData>, ...options });
/**
* Delete a service
* @param data The data for the request.
* @param data.id The ID of the service
* @returns GenericOutputBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceDeleteService = <TData = Common.DefaultServiceDeleteServiceMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id?: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id?: number;
}, TContext>({ mutationFn: ({ id }) => DefaultService.deleteService({ id }) as unknown as Promise<TData>, ...options });

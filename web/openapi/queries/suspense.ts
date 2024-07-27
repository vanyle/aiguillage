// generated with @7nohe/openapi-react-query-codegen@1.4.0 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
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
export const useDefaultServiceGetConfigSuspense = <TData = Common.DefaultServiceGetConfigDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetConfigKeyFn({ id }, queryKey), queryFn: () => DefaultService.getConfig({ id }) as TData, ...options });
/**
* Get a config option
* @param data The data for the request.
* @param data.serviceId The ID of the service
* @param data.key The configuration key
* @returns ConfigObjBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetConfigItemSuspense = <TData = Common.DefaultServiceGetConfigItemDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ key, serviceId }: {
  key?: string;
  serviceId?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetConfigItemKeyFn({ key, serviceId }, queryKey), queryFn: () => DefaultService.getConfigItem({ key, serviceId }) as TData, ...options });
/**
* Search for services by name
* @param data The data for the request.
* @param data.name The name of the service to search for
* @returns ServiceListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceSearchServicesSuspense = <TData = Common.DefaultServiceSearchServicesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ name }: {
  name?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceSearchServicesKeyFn({ name }, queryKey), queryFn: () => DefaultService.searchServices({ name }) as TData, ...options });
/**
* Get yourself
* @param data The data for the request.
* @param data.name Your service name
* @returns ServiceDescBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetSelfSuspense = <TData = Common.DefaultServiceGetSelfDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ name }: {
  name?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetSelfKeyFn({ name }, queryKey), queryFn: () => DefaultService.getSelf({ name }) as TData, ...options });
/**
* Get your config
* @param data The data for the request.
* @param data.name Your service name
* @returns AllConfigObjBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetSelfConfigSuspense = <TData = Common.DefaultServiceGetSelfConfigDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ name }: {
  name?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetSelfConfigKeyFn({ name }, queryKey), queryFn: () => DefaultService.getSelfConfig({ name }) as TData, ...options });
/**
* Get services with your name
* @param data The data for the request.
* @param data.name Your service name
* @returns ServiceListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetSelfServicesSuspense = <TData = Common.DefaultServiceGetSelfServicesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ name }: {
  name?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetSelfServicesKeyFn({ name }, queryKey), queryFn: () => DefaultService.getSelfServices({ name }) as TData, ...options });
/**
* Get a service by ID
* @param data The data for the request.
* @param data.id The ID of the service
* @returns ServiceDescBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetServiceSuspense = <TData = Common.DefaultServiceGetServiceDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetServiceKeyFn({ id }, queryKey), queryFn: () => DefaultService.getService({ id }) as TData, ...options });
/**
* Get services
* @returns ServiceListBody OK
* @returns ErrorModel Error
* @throws ApiError
*/
export const useDefaultServiceGetServicesSuspense = <TData = Common.DefaultServiceGetServicesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetServicesKeyFn(queryKey), queryFn: () => DefaultService.getServices() as TData, ...options });

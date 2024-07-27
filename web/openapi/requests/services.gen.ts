// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { DeleteConfigData, DeleteConfigResponse, GetConfigData, GetConfigResponse, SetConfigData, SetConfigResponse, GetConfigItemData, GetConfigItemResponse, RegisterData, RegisterResponse, SearchServicesData, SearchServicesResponse, GetSelfData, GetSelfResponse, GetSelfConfigData, GetSelfConfigResponse, SetSelfConfigData, SetSelfConfigResponse, GetSelfServicesData, GetSelfServicesResponse, DeleteServiceData, DeleteServiceResponse, GetServiceData, GetServiceResponse, CreateServiceData, CreateServiceResponse, GetServicesResponse, SetHostnameData, SetHostnameResponse, SetVersionData, SetVersionResponse } from './types.gen';

export class DefaultService {
    /**
     * Clear all config entries of a service
     * @param data The data for the request.
     * @param data.id The ID of the service
     * @returns GenericOutputBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static deleteConfig(data: DeleteConfigData = {}): CancelablePromise<DeleteConfigResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/config',
            query: {
                id: data.id
            }
        });
    }
    
    /**
     * Get the complete config
     * @param data The data for the request.
     * @param data.id The ID of the service
     * @returns AllConfigObjBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static getConfig(data: GetConfigData = {}): CancelablePromise<GetConfigResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/config',
            query: {
                id: data.id
            }
        });
    }
    
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
    public static setConfig(data: SetConfigData = {}): CancelablePromise<SetConfigResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/config',
            query: {
                serviceId: data.serviceId,
                key: data.key,
                value: data.value
            }
        });
    }
    
    /**
     * Get a config option
     * @param data The data for the request.
     * @param data.serviceId The ID of the service
     * @param data.key The configuration key
     * @returns ConfigObjBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static getConfigItem(data: GetConfigItemData = {}): CancelablePromise<GetConfigItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/configitem',
            query: {
                serviceId: data.serviceId,
                key: data.key
            }
        });
    }
    
    /**
     * Register yourself
     * Register yourself as a service. A version will be automatically assigned to you.
     * @param data The data for the request.
     * @param data.name Name of the service registrating itself
     * @returns OutputWithIdBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static register(data: RegisterData = {}): CancelablePromise<RegisterResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/register',
            query: {
                name: data.name
            }
        });
    }
    
    /**
     * Search for services by name
     * @param data The data for the request.
     * @param data.name The name of the service to search for
     * @returns ServiceListBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static searchServices(data: SearchServicesData = {}): CancelablePromise<SearchServicesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/searchservices',
            query: {
                name: data.name
            }
        });
    }
    
    /**
     * Get yourself
     * @param data The data for the request.
     * @param data.name Your service name
     * @returns ServiceDescBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static getSelf(data: GetSelfData = {}): CancelablePromise<GetSelfResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/self',
            query: {
                name: data.name
            }
        });
    }
    
    /**
     * Get your config
     * @param data The data for the request.
     * @param data.name Your service name
     * @returns AllConfigObjBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static getSelfConfig(data: GetSelfConfigData = {}): CancelablePromise<GetSelfConfigResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/selfconfig',
            query: {
                name: data.name
            }
        });
    }
    
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
    public static setSelfConfig(data: SetSelfConfigData = {}): CancelablePromise<SetSelfConfigResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/selfconfig',
            query: {
                name: data.name,
                key: data.key,
                value: data.value
            }
        });
    }
    
    /**
     * Get services with your name
     * @param data The data for the request.
     * @param data.name Your service name
     * @returns ServiceListBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static getSelfServices(data: GetSelfServicesData = {}): CancelablePromise<GetSelfServicesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/selfservices',
            query: {
                name: data.name
            }
        });
    }
    
    /**
     * Delete a service
     * @param data The data for the request.
     * @param data.id The ID of the service
     * @returns GenericOutputBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static deleteService(data: DeleteServiceData = {}): CancelablePromise<DeleteServiceResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/service',
            query: {
                id: data.id
            }
        });
    }
    
    /**
     * Get a service by ID
     * @param data The data for the request.
     * @param data.id The ID of the service
     * @returns ServiceDescBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static getService(data: GetServiceData = {}): CancelablePromise<GetServiceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/service',
            query: {
                id: data.id
            }
        });
    }
    
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
    public static createService(data: CreateServiceData = {}): CancelablePromise<CreateServiceResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/service',
            query: {
                name: data.name,
                version: data.version,
                hostname: data.hostname
            }
        });
    }
    
    /**
     * Get services
     * @returns ServiceListBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static getServices(): CancelablePromise<GetServicesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/services'
        });
    }
    
    /**
     * Change the hostname of a service
     * @param data The data for the request.
     * @param data.id The ID of the service
     * @param data.hostname The machine hosting the service
     * @returns GenericOutputBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static setHostname(data: SetHostnameData = {}): CancelablePromise<SetHostnameResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/seturl',
            query: {
                id: data.id,
                hostname: data.hostname
            }
        });
    }
    
    /**
     * Change the version of a service
     * @param data The data for the request.
     * @param data.id The ID of the service
     * @param data.version The version of the service
     * @returns GenericOutputBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public static setVersion(data: SetVersionData = {}): CancelablePromise<SetVersionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/setversion',
            query: {
                id: data.id,
                version: data.version
            }
        });
    }
    
}
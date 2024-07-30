package internal

import (
	"context"
	"errors"
	"strconv"
	"strings"
	"time"

	"github.com/danielgtaylor/huma/v2"
	"gorm.io/gorm"
)

// Response types

type GenericOutput struct {
	Body struct{}
}

type OutputWithId struct {
	Body struct {
		ID string `json:"id" example:"0" doc:"The id of the object created"`
	}
}

type ServiceList struct {
	Body struct {
		Services []Service `json:"services" example:"[]" doc:"A list of available services"`
	}
}

type ServiceDesc struct {
	Body struct {
		Service Service `json:"service" doc:"A description of the service"`
	}
}

type ConfigObj struct {
	Body struct {
		Config string `json:"config" example:"[]" doc:"A JSON-encoded string containing the configured value"`
	}
}
type AllConfigObj struct {
	Body struct {
		Config map[string]string `json:"config" doc:"A JSON-encoded object describing the configuration of the service"`
	}
}

type LogList struct {
	Body struct {
		Logs []ServiceLog `json:"logs" example:"[]" doc:"A list of logs"`
	}
}

// Input objects

type ServiceDefinition struct {
	Name     string `query:"name" maxLength:"300" example:"blocky" doc:"Name of the service registrating itself"`
	Version  string `query:"version" maxLength:"60" example:"prod" doc:"Version of the service"`
	Hostname string `query:"hostname" maxLength:"1000" example:"192.168.1.14" doc:"A Hostname or IP pointing to the service"`
}

type ServiceId struct {
	ID uint64 `query:"id" example:"0" doc:"The ID of the service"`
}

type ServiceSetUrl struct {
	ID       uint64 `query:"id" example:"0" doc:"The ID of the service"`
	Hostname string `query:"hostname" maxLength:"1000" example:"prod" doc:"The machine hosting the service "`
}

type ServiceSetVersion struct {
	ID      uint64 `query:"id" example:"0" doc:"The ID of the service"`
	Version string `query:"version" maxLength:"60" example:"prod" doc:"The version of the service"`
}

type ConfigDef struct {
	ServiceID uint64 `query:"serviceId" example:"0" doc:"The ID of the service"`
	ConfigKey string `query:"key" maxLength:"300" example:"databaseUrl" doc:"The configuration key"`
}

type ConfigChange struct {
	ServiceID   uint64 `query:"serviceId" example:"0" doc:"The ID of the service"`
	ConfigKey   string `query:"key" maxLength:"300" example:"databaseUrl" doc:"The config key to set"`
	ConfigValue string `query:"value" maxLength:"10000" example:"127.0.0.1" doc:"The config value to set"`
}

type LogMessage struct {
	Name     string `query:"name" maxLength:"300" example:"blocky" doc:"Your service name"`
	Severity string `query:"severity" maxLength:"20" example:"INFO" doc:"The severity of the log message"`
	Message  string `query:"message" maxLength:"10000" example:"127.0.0.1" doc:"The message to log"`
}

type LogFilter struct {
	ServiceID uint64    `query:"serviceId" example:"0" doc:"The ID of the service"`
	Severity  string    `query:"severity" maxLength:"20" example:"INFO" doc:"The severity of the log message"`
	Limit     int       `query:"limit" example:"10" doc:"The number of messages to return"`
	StartTime time.Time `query:"startTime" example:"2022-01-01T00:00:00Z" doc:"The start time of the log messages"`
	EndTime   time.Time `query:"endTime" example:"2022-01-02T00:00:00Z" doc:"The end time of the log messages"`
}

type RequestInfo struct {
	Body struct {
		IpAddress string            `example:"127.0.0.1" doc:"The IP you used to connect"`
		Headers   map[string]string `doc:"The HTTP headers received"`
		InferedIp string            `example:"127.0.0.1" doc:"The IP that was inferred from the headers and IP"`
	}
}

func SetupEndpoints(api huma.API, db *gorm.DB) {

	api.UseMiddleware(func(ctx huma.Context, next func(ctx huma.Context)) {
		addr := ctx.RemoteAddr()
		// Strip port from addr
		addr = addr[:strings.LastIndex(addr, ":")]
		ctx = huma.WithValue(ctx, "remoteAddr", addr)

		var headers map[string]string = make(map[string]string)
		ctx.EachHeader(func(key, value string) {
			headers[key] = value
		})

		ctx = huma.WithValue(ctx, "headers", headers)
		next(ctx)
	})

	// API-endpoints for services
	huma.Register(api, huma.Operation{
		OperationID: "register",
		Method:      "PUT",
		Path:        "/register",
		Summary:     "Register yourself",
		Description: "Register yourself as a service. A version will be automatically assigned to you.",
	}, func(ctx context.Context, input *struct {
		ServiceName string `query:"name" maxLength:"300" example:"blocky" doc:"Name of the service registrating itself"`
	}) (*OutputWithId, error) {
		hostname := ctx.Value("remoteAddr").(string)
		version := GetUniqueVersion(db, input.ServiceName)
		id, err := CreateService(db, input.ServiceName, version, hostname)
		if err != nil {
			return nil, err
		}
		resp := &OutputWithId{}
		resp.Body.ID = strconv.FormatUint(id, 10)
		return resp, nil
	})

	huma.Register(api, huma.Operation{
		OperationID: "get-self-config",
		Method:      "GET",
		Path:        "/selfconfig",
		Summary:     "Get your config",
	}, func(ctx context.Context, input *struct {
		Name string `query:"name" maxLength:"300" example:"blocky" doc:"Your service name"`
	}) (*AllConfigObj, error) {
		hostname := ctx.Value("remoteAddr").(string)
		id, err := GetCurrentServiceID(db, input.Name, hostname)
		if err != nil {
			return nil, err
		}
		var configItems []ConfigItem
		result := db.Where("service_id = ?", id).Find(&configItems)
		if result.Error != nil {
			return nil, result.Error
		}
		var jsonResult map[string]string = make(map[string]string)
		for _, item := range configItems {
			jsonResult[item.Key] = item.Value
		}

		resp := &AllConfigObj{}
		resp.Body.Config = jsonResult
		return resp, nil
	})

	huma.Register(api, huma.Operation{
		OperationID: "get-self",
		Method:      "GET",
		Path:        "/self",
		Summary:     "Get yourself",
	}, func(ctx context.Context, input *struct {
		Name string `query:"name" maxLength:"300" example:"blocky" doc:"Your service name"`
	}) (*ServiceDesc, error) {
		hostname := ctx.Value("remoteAddr").(string)
		id, err := GetCurrentServiceID(db, input.Name, hostname)
		if err != nil {
			return nil, err
		}
		var service Service
		result := db.First(&service, id)
		if result.Error != nil {
			return nil, result.Error
		}
		resp := ServiceDesc{}
		resp.Body.Service = service
		return &resp, nil
	})

	huma.Register(api, huma.Operation{
		OperationID: "set-self-config",
		Method:      "POST",
		Path:        "/selfconfig",
		Summary:     "Set your config",
	}, func(ctx context.Context, input *struct {
		Name  string `query:"name" maxLength:"300" example:"blocky" doc:"Your service name"`
		Key   string `query:"key" maxLength:"300" example:"databaseUrl" doc:"The config key to set"`
		Value string `query:"value" maxLength:"10000" example:"localhost" doc:"The config value to set"`
	}) (*GenericOutput, error) {
		hostname := ctx.Value("remoteAddr").(string)
		id, err := GetCurrentServiceID(db, input.Name, hostname)
		if err != nil {
			return nil, err
		}
		return &GenericOutput{}, SetConfig(db, input.Key, input.Value, id)
	})

	huma.Register(api, huma.Operation{
		OperationID: "get-self-services",
		Method:      "GET",
		Path:        "/selfservices",
		Summary:     "Get services with your name",
	}, func(ctx context.Context, input *struct {
		Name string `query:"name" maxLength:"300" example:"blocky" doc:"Your service name"`
	}) (*ServiceList, error) {
		var services []Service
		result := db.Where("name = ?", input.Name).Find(&services)
		var resp = &ServiceList{}
		resp.Body.Services = services
		return resp, result.Error
	})

	// Diagnostic tool
	huma.Register(api, huma.Operation{
		OperationID: "get-request-info",
		Method:      "GET",
		Path:        "/requestinfo",
		Summary:     "Get information about your HTTP request",
	}, func(ctx context.Context, input *struct{}) (*RequestInfo, error) {

		var resp = &RequestInfo{}
		resp.Body.IpAddress = ctx.Value("remoteAddr").(string)
		resp.Body.Headers = ctx.Value("headers").(map[string]string)
		resp.Body.InferedIp = resp.Body.IpAddress

		return resp, nil
	})

	// API-endpoints for the GUI

	huma.Get(api, "/services", func(ctx context.Context, input *struct{}) (*ServiceList, error) {
		var services []Service
		result := db.Limit(1000).Find(&services)
		resp := &ServiceList{}
		resp.Body.Services = services
		return resp, result.Error
	})

	huma.Register(api, huma.Operation{
		OperationID: "search-services",
		Method:      "GET",
		Path:        "/searchservices",
		Summary:     "Search for services by name",
	}, func(ctx context.Context, input *struct {
		Name string `query:"name" maxLength:"300" example:"blocky" doc:"The name of the service to search for"`
	}) (*ServiceList, error) {
		var services []Service
		// Where("name IN ? or ? in name", input.Name, input.Name)
		search_pattern := "%" + input.Name + "%"
		result := db.Table("services").Distinct().Joins("LEFT JOIN config_items ON config_items.service_id = services.id").
			Where("services.name LIKE ?", search_pattern).
			Or(db.Where("config_items.key = ? AND config_items.value LIKE ?", "display-description", search_pattern)).
			Limit(1000).
			Find(&services)

		resp := &ServiceList{}
		resp.Body.Services = services
		return resp, result.Error
	})

	huma.Register(api, huma.Operation{
		OperationID: "get-service",
		Method:      "GET",
		Path:        "/service",
		Summary:     "Get a service by ID",
	}, func(ctx context.Context, input *ServiceId) (*ServiceDesc, error) {
		var service Service
		service.ID = input.ID
		result := db.First(&service)
		resp := &ServiceDesc{}
		resp.Body.Service = service
		return resp, result.Error
	})

	huma.Register(api, huma.Operation{
		OperationID: "create-service",
		Method:      "PUT",
		Path:        "/service",
		Summary:     "Create a new service",
		Description: "Create a new service. Every version of a service must have a distinct hostname.",
	}, func(ctx context.Context, input *ServiceDefinition) (*OutputWithId, error) {
		id, err := CreateService(db, input.Name, input.Version, input.Hostname)
		resp := &OutputWithId{}
		resp.Body.ID = strconv.FormatUint(id, 10)
		return resp, err
	})

	huma.Register(api, huma.Operation{
		OperationID: "set-hostname",
		Method:      "POST",
		Path:        "/seturl",
		Summary:     "Change the hostname of a service",
	}, func(ctx context.Context, input *ServiceSetUrl) (*GenericOutput, error) {
		result := db.Model(&Service{}).Where("id = ?", input.ID).Update("hostname", input.Hostname)
		return &GenericOutput{}, result.Error
	})

	huma.Register(api, huma.Operation{
		OperationID: "set-version",
		Method:      "POST",
		Path:        "/setversion",
		Summary:     "Change the version of a service",
	}, func(ctx context.Context, input *ServiceSetVersion) (*GenericOutput, error) {
		result := db.Model(&Service{}).Where("id = ?", input.ID).Update("version", input.Version)
		return &GenericOutput{}, result.Error
	})

	huma.Register(api, huma.Operation{
		OperationID: "get-config-item",
		Method:      "GET",
		Path:        "/configitem",
		Summary:     "Get a config option",
	}, func(ctx context.Context, input *ConfigDef) (*ConfigObj, error) {
		var configItem ConfigItem
		result := db.Where("key = ? AND service_id = ?", input.ConfigKey, input.ServiceID).Take(&configItem)
		resp := &ConfigObj{}
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			configItem.Value = "undefined"
		}
		resp.Body.Config = configItem.Value
		return resp, result.Error
	})

	huma.Register(api, huma.Operation{
		OperationID: "get-config",
		Method:      "GET",
		Path:        "/config",
		Summary:     "Get the complete config",
	}, func(ctx context.Context, input *ServiceId) (*AllConfigObj, error) {
		var configItems []ConfigItem
		result := db.Where("service_id = ?", input.ID).Find(&configItems)
		if result.Error != nil {
			return nil, result.Error
		}
		var jsonResult map[string]string = make(map[string]string)
		for _, item := range configItems {
			jsonResult[item.Key] = item.Value
		}

		resp := &AllConfigObj{}
		resp.Body.Config = jsonResult
		return resp, nil
	})

	huma.Register(api, huma.Operation{
		OperationID: "delete-service",
		Method:      "DELETE",
		Path:        "/service",
		Summary:     "Delete a service",
	}, func(ctx context.Context, input *ServiceId) (*GenericOutput, error) {
		// Not a hard delete, you can find your config inside the DB in case of panic-delete.
		result := db.Delete(&Service{}, input.ID)
		return &GenericOutput{}, result.Error
	})

	huma.Register(api, huma.Operation{
		OperationID: "delete-config",
		Method:      "DELETE",
		Path:        "/config",
		Summary:     "Clear all config entries of a service",
	}, func(ctx context.Context, input *ServiceId) (*GenericOutput, error) {
		// Not a hard delete, you can find your config inside the DB in case of panic-delete.
		result := db.Where("service_id = ?", input.ID).Delete(&ConfigItem{})
		return &GenericOutput{}, result.Error
	})

	huma.Register(api, huma.Operation{
		OperationID: "set-config",
		Method:      "POST",
		Path:        "/config",
		Summary:     "Set a config operation for a service",
	}, func(ctx context.Context, input *ConfigChange) (*GenericOutput, error) {
		err := SetConfig(db, input.ConfigKey, input.ConfigValue, input.ServiceID)
		return &GenericOutput{}, err
	})

	huma.Register(api, huma.Operation{
		OperationID: "log",
		Method:      "POST",
		Path:        "/log",
		Summary:     "Log a service message",
	}, func(ctx context.Context, input *LogMessage) (*GenericOutput, error) {
		hostname := ctx.Value("remoteAddr").(string)
		id, err := GetCurrentServiceID(db, input.Name, hostname)
		if err != nil {
			return nil, err
		}
		err = AddLog(db, input.Severity, input.Message, id)
		return &GenericOutput{}, err
	})

	huma.Register(api, huma.Operation{
		OperationID: "get-logs",
		Method:      "GET",
		Path:        "/logs",
		Summary:     "Get service logs",
		Description: "severity, start and end time are ignored",
	}, func(ctx context.Context, input *LogFilter) (*LogList, error) {
		logs, err := RetreiveLogs(db, input.ServiceID, input.Limit)
		if err != nil {
			return nil, err
		}
		result := &LogList{}
		result.Body.Logs = logs
		return result, err
	})

	huma.Register(api, huma.Operation{
		OperationID: "filter-logs",
		Method:      "GET",
		Path:        "/filter-logs",
		Summary:     "Get service logs with filters",
	}, func(ctx context.Context, input *LogFilter) (*LogList, error) {
		logs, err := FilterLogs(db, input.ServiceID, input.Severity, input.Limit, input.StartTime, input.EndTime)
		if err != nil {
			return nil, err
		}
		result := &LogList{}
		result.Body.Logs = logs
		return result, err
	})

}

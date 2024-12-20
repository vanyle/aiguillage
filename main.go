package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humagin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"vanyle/Aiguillage/internal"
)

const DB_FILENAME = "db/aiguillage.db"
const PORT = "8080"

func main() {

	isProd := os.Getenv("PROD")
	host := GetEnvOrDefault("HOST", "localhost")
	port := GetEnvOrDefault("PORT", PORT)

	gormConfig := &gorm.Config{}
	if isProd != "" {
		gormConfig = &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent),
		}
	}

	db, err := gorm.Open(sqlite.Open(DB_FILENAME), gormConfig)
	if err != nil {
		panic(fmt.Sprintf("Failed to access sqlite database at %s", DB_FILENAME))
	}

	internal.PerformDbMigrations(db)

	r := gin.New()
	err = r.SetTrustedProxies(nil)
	if err != nil {
		panic(err)
	}

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"}, // http://localhost:5173
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "PATCH"},
	}))

	config := huma.DefaultConfig("Aiguillage API", "1.0.0")
	config.Servers = []*huma.Server{
		{URL: "http://" + host + ":" + port},
	}
	api := humagin.New(r, config)
	internal.SetupEndpoints(api, db)

	r.StaticFile("/", "/serve/index.html")
	r.Static("/assets", "/serve/assets")
	r.GET("/service/:id", func(ctx *gin.Context) {
		ctx.File("/serve/index.html")
	})

	err = http.ListenAndServe("0.0.0.0:"+PORT, r)
	if err != nil {
		panic(err)
	}
}

func GetEnvOrDefault(key string, defaultValue string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return defaultValue
}

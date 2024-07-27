package main

import (
	"fmt"
	"net/http"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humagin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"vanyle/Aiguillage/internal"
)

const DB_FILENAME = "aiguillage.db"
const PORT = "8080"

func main() {
	db, err := gorm.Open(sqlite.Open(DB_FILENAME), &gorm.Config{})
	if err != nil {
		panic(fmt.Sprintf("Failed to access sqlite database at %s", DB_FILENAME))
	}

	internal.PerformDbMigrations(db)

	r := gin.New()
	r.SetTrustedProxies(nil)

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"}, // http://localhost:5173
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "PATCH"},
	}))

	config := huma.DefaultConfig("Aiguillage API", "1.0.0")
	config.Servers = []*huma.Server{
		{URL: "http://localhost:" + PORT},
	}
	api := humagin.New(r, config)
	internal.SetupEndpoints(api, db)

	r.StaticFile("/", "/serve/index.html")
	r.Static("/assets", "/serve/assets")
	r.Static("/service/*", "/serve/index.html")

	http.ListenAndServe("0.0.0.0:"+PORT, r)
}

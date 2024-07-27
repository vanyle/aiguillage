package internal

import (
	"math/rand"
	"time"

	"gorm.io/gorm"
)

// Gorm types

type Service struct {
	gorm.Model
	ID       uint64
	Name     string
	Version  string
	Hostname string
}

type ConfigItem struct {
	gorm.Model
	Key       string
	Value     string
	ServiceID uint64 `gorm:"index"`
	Service   Service
}

type ServiceLog struct {
	gorm.Model
	ID        uint64
	Kind      string
	Message   string
	Timestamp time.Time // Could probably add an index here.

	ServiceID uint64 `gorm:"index"`
	Service   Service
}

func AddLog(db *gorm.DB, severity string, message string, serviceId uint64) error {
	log := ServiceLog{
		Kind:      severity,
		Message:   message,
		Timestamp: time.Now(),
		ServiceID: serviceId,
	}
	result := db.Create(&log)
	return result.Error
}

func RetreiveLogs(db *gorm.DB, serviceId uint64, limit int) ([]ServiceLog, error) {
	var logs []ServiceLog
	result := db.Where("service_id = ?", serviceId).Find(&logs).Limit(limit)
	return logs, result.Error
}

func FilterLogs(db *gorm.DB, serviceId uint64, severity string, limit int, startTime time.Time, endTime time.Time) ([]ServiceLog, error) {
	var logs []ServiceLog
	result := db.Where("service_id = ?", serviceId).Where("timestamp BETWEEN ? AND ?", startTime, endTime).Where("kind = ?", severity).Find(&logs).Limit(limit)
	return logs, result.Error
}

// Create a new service, return its id on success.
func CreateService(db *gorm.DB, name string, version string, hostname string) (uint64, error) {
	var exists int64
	db.Table("services").Where("name = ? AND version = ?", name, version).Count(&exists)
	if exists != 0 {
		// a (name, version) identities a service
		return 0, gorm.ErrDuplicatedKey
	}
	db.Table("services").Where("name = ? AND hostname = ?", name, hostname).Find(&exists)
	if exists != 0 {
		// two version of a service cannot exist at the same url.
		return 0, gorm.ErrDuplicatedKey
	}
	service := Service{
		Name:     name,
		Version:  version,
		Hostname: hostname,
	}

	result := db.Create(&service)
	if result.Error != nil {
		return 0, result.Error
	}
	return service.ID, nil
}

func GetUniqueVersion(db *gorm.DB, name string) string {

	versionNameItemsPart1 := []string{"strawberry", "vanilla", "chocolate", "caramel", "pistachio", "mint",
		"banana", "kiwi", "blueberry", "raspberry", "blackberry", "peach", "pear", "apple", "orange", "lemon", "lime",
		"grapefruit", "grape", "plum", "cherry", "apricot", "pomegranate", "watermelon", "melon", "pineapple", "coconut",
		"coffee", "honey", "cinnamon", "ginger", "nutmeg", "almond", "walnut", "macadamia", "coconut", "pumpkin"}
	versionNameItemsPart2 := []string{"ice cream", "cake", "sandwich", "cookie", "muffin", "pie", "tart", "pudding", "toast", "salad", "juice", "smoothie", "sorbet", "sundae", "parfait", "milkshake", "soda", "candy", "syrup", "jam", "jelly", "compote"}

	var c int64 = 0
	var versionTest = ""
	for {
		p1 := versionNameItemsPart1[rand.Intn(len(versionNameItemsPart1))]
		p2 := versionNameItemsPart2[rand.Intn(len(versionNameItemsPart2))]
		versionTest = p1 + " " + p2
		db.Table("services").Where("name = ? AND version = ?", name, versionTest).Count(&c)
		if c == 0 {
			break
		}
	}

	return versionTest
}

func GetCurrentServiceID(db *gorm.DB, name string, hostname string) (uint64, error) {
	var service Service
	result := db.Where("name = ? AND hostname = ?", name, hostname).Take(&service)
	if result.Error != nil {
		return 0, result.Error
	}
	return service.ID, nil
}

func SetConfig(db *gorm.DB, key string, value string, serviceId uint64) error {
	var exists int64
	db.Model(&ConfigItem{}).Where("key = ? AND service_id = ?", key, serviceId).Count(&exists)
	if exists != 0 {
		if exists > 1 || value == "" {
			db.Where("key = ? AND service_id = ?", key, serviceId).Delete(&ConfigItem{})
		} else {
			result := db.Model(&ConfigItem{}).Where("key = ? AND service_id = ?", key, serviceId).Update("value", value)
			return result.Error
		}
	}
	if value != "" {
		return db.Create(&ConfigItem{Key: key, Value: value, ServiceID: serviceId}).Error
	}
	return nil
}

func PerformDbMigrations(db *gorm.DB) {
	db.AutoMigrate(&Service{})
	db.AutoMigrate(&ServiceLog{})
	db.AutoMigrate(&ConfigItem{})
}

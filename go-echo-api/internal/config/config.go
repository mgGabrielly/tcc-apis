package config

import (
	"go-books-api/internal/models"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Erro ao carregar .env file")
	}

	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")

	dsn := "host=localhost user=" + user + " password=" + password + " dbname=" + dbName + " port=5432 sslmode=disable"

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Falha ao conectar ao banco de dados:", err)
	}

	err = DB.AutoMigrate(&models.Book{}, &models.Genre{})
	if err != nil {
		log.Fatal("Falha ao migrar tabelas:", err)
	}

	log.Println("Conectado ao banco de dados e tabelas migradas com sucesso!")
}

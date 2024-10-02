package repositories

import (
	"go-books-api/internal/models"

	"gorm.io/gorm"
)

type GenreRepository struct {
	DB *gorm.DB
}

func (r *GenreRepository) Create(genre models.Genre) error {
	return r.DB.Create(&genre).Error
}

func (r *GenreRepository) FindAll() ([]models.Genre, error) {
	var genres []models.Genre
	err := r.DB.Find(&genres).Error
	return genres, err
}

func (r *GenreRepository) FindByID(id uint) (models.Genre, error) {
	var genre models.Genre
	err := r.DB.First(&genre, id).Error
	return genre, err
}

func (r *GenreRepository) Update(genre models.Genre) error {
	return r.DB.Save(&genre).Error
}

func (r *GenreRepository) Delete(id uint) error {
	return r.DB.Delete(&models.Genre{}, id).Error
}

package repositories

import (
	"go-books-api/internal/models"

	"gorm.io/gorm"
)

type BookRepository struct {
	DB *gorm.DB
}

func (r *BookRepository) Create(book models.Book) error {
	return r.DB.Create(&book).Error
}

func (r *BookRepository) FindAll() ([]models.Book, error) {
	var books []models.Book
	err := r.DB.Preload("Genre").Find(&books).Error
	return books, err
}

func (r *BookRepository) FindByID(id uint) (models.Book, error) {
	var book models.Book
	err := r.DB.Preload("Genre").First(&book, id).Error
	return book, err
}

func (r *BookRepository) Update(book models.Book) error {
	return r.DB.Save(&book).Error
}

func (r *BookRepository) Delete(id uint) error {
	return r.DB.Delete(&models.Book{}, id).Error
}
